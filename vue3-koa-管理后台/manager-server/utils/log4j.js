/**
 * 日志存储
 * @author lqj
 */
const log4js = require('log4js')
const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL
}
log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log' // info错误输出到常规的文件
    },
    error: {
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log', // 错误按天输出到文件
      alwaysIncludePattern: true // 设置文件名称为 filename + pattern
    }
  },
  categories: {
    default: {
      appenders: ['console'], // 上线的时候需要把console删除，不让输出到控制台
      level: 'debug'
    },
    info: {
      appenders: ['info', 'console'],
      level: 'info'
    },
    error: {
      appenders: ['error', 'console'], // error错误追加到这两种错误级别
      level: 'error'
    }
  }
})
/**
 * 日志输出，level为debug
 * @param {string} content
 */
exports.debug = content => {
  let logger = log4js.getLogger()
  logger.level = levels.debug
  logger.debug(content)
}
exports.info = content => {
  let logger = log4js.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}
exports.error = content => {
  let logger = log4js.getLogger('error') // 传入的是 categories 中的名称
  logger.level = levels.error
  logger.error(content)
}
