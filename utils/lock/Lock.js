const prifixed_w  = "w";
const prifixed_r  = "r";

const reTryTimes = 5;

export class Lock {
  constructor(_key, requestId) {
    this._key = _key;
    this.lockClient = redis;
    this.requestId = requestId || "test";
    this.key = null;
  }

  async writeLock(seconds = 30) {
    if (!this._key) {
      return;
    }
    let times = reTryTimes;
    this.key = `${prifixed_w}_${this._key}`;
    let lockScript = `
      if redis.call('EXISTS', KEYS[1]) == 1 and redis.call('HEXISTS', KEYS[1], ARGV[1]) == 0
        then return 1
      else
        redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
        redis.call('EXPIRE', KEYS[1], ARGV[2])
        return 0
      end
    `;
    while (
      await this.lockClient.eval(lockScript, {
        keys:  [this.key],
        arguments: [this.requestId, seconds+""],
      })
    ) {
      if (times == 0) {
        throw new Error("write Lock failed");
      }
      await sleep(2000);
      --times;
    }
  }

  async unLock() {
    if (!this.key) {
      return;
    }
    let unLockScript = `
    if redis.call('HEXISTS', KEYS[1], ARGV[1]) == 1 and redis.call('HGET', KEYS[1], ARGV[1]) > '1'
      then
      redis.call('HINCRBY', KEYS[1], ARGV[1], -1)
      return 1
    end
    if redis.call('HGET', KEYS[1], ARGV[1]) == '1'
      then
      redis.call('DEL', KEYS[1])
      return 1
    end
    `;
    await this.lockClient.eval(unLockScript, {
      keys: [this.key],
      arguments: [this.requestId],
    });
  }

}


function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}
