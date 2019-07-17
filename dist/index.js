"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable no-console */
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _database = require('./database'); var _database2 = _interopRequireDefault(_database);
var _config = require('./config');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
  try {
    const info = await _database2.default.call(void 0, );
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  await _app2.default.listen(_config.graphqlPort);
  console.log(`Server started on port ${_config.graphqlPort}`);
})();
