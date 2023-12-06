
const os = require('os');
const log4js = require("log4js");

export class logger {

  static debug (message) {
    handler("debug", message);
  }

  static info (message) {
    handler("info", message);
  }

  static error (message) {
    handler("error", message);
  }

  static warn (message) {
    handler("warn", message);
  }

  static log (message) {
    handler("log", message);
  }

  static fatal (message) {
    handler("fatal", message);
  }
}

function handler (type, message) {
  let fileName = getCallerFile().split(getSplitter())[0];
  const loggerUtil = log4js.getLogger(`${fileName}`);
  loggerUtil.level = type;
  loggerUtil[type](message);
}


function getCallerFile () {
  let originalFunc = Error.prepareStackTrace;
  let callerfile;
  try {
    let err = new Error();
    let currentfile;

    Error.prepareStackTrace = function (err, stack) {
      return stack;
    };

    currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();

      if (currentfile !== callerfile) {
        break;
      }
    }
  } catch (e) {
  }

  Error.prepareStackTrace = originalFunc;

  return callerfile;
}

function getSplitter () {
  let platform = os.platform().toLowerCase();
  return platform === 'linux' ? "/" : "\\";
}

