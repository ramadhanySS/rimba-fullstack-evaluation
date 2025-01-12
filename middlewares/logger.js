const morgan = require('morgan');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'request.log' })],
});

module.exports = morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } });
