
class Logger {
  constructor() {
  }

  static error(string) {
    let time = getTimes();
    console.log(`${time} [Error] #### ${string}`)
  }

  static warn(string) {
    let time = getTimes();
    console.log(`${time} [Warn] #### ${string}`)
  }

  static info(string) {
    let time = getTimes();
    console.log(`${time} [Info] #### ${string}`)
  }

  static debug(string) {
    let time = getTimes();
    console.log(`${time} [Debug] #### ${string}`)
  }

}

function getTimes() {
  const date = new Date();

  const year = date.getFullYear();
  let month = date.getMonth();
  month = month/10 >= 1 ? `${month}` : `0${month}`;
  let day = date.getDay();
  day = day/10 >= 1 ? `${day}` : `0${day}`;
  let hour = date.getHours();
  hour = hour/10 >= 1 ? `${hour}` : `0${hour}`;
  let min = date.getMinutes();
  min = min/10 >= 1 ? `${min}` : `0${min}`;
  let seconds = date.getSeconds();
  seconds = seconds/10 >= 1 ? `${seconds}` : `0${seconds}`;

  let time = `[${year}-${month}-${day}]${hour}:${min}:${seconds}`;
  return time;
}


