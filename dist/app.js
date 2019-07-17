"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable no-console */
var _koa = require('koa'); var _koa2 = _interopRequireDefault(_koa);
var _koarouter = require('koa-router'); var _koarouter2 = _interopRequireDefault(_koarouter);
var _koagraphql = require('koa-graphql'); var _koagraphql2 = _interopRequireDefault(_koagraphql);
var _koacors = require('koa-cors'); var _koacors2 = _interopRequireDefault(_koacors);
var _koaconvert = require('koa-convert'); var _koaconvert2 = _interopRequireDefault(_koaconvert);
var _language = require('graphql/language');
var _graphqlplaygroundmiddleware = require('graphql-playground-middleware');


var _schema = require('./schema'); var _schema2 = _interopRequireDefault(_schema);
var _loader = require('./graphql/loader'); var loaders = _interopRequireWildcard(_loader);
var _helper = require('./helper');

const app = new (0, _koa2.default)();
const router = new (0, _koarouter2.default)();

const graphqlSettingsPerReq = async (req) => {
  const dataloaders = await _helper.getDataloaders.call(void 0, loaders);
  const { user } = await _helper.getUser.call(void 0, dataloaders, req.header.authorization);

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema: _schema2.default,
    pretty: true,
    context: {
      user,
      req,
      dataloaders,
    },
    extensions: ({
      document, variables, operationName, result,
    }) => {
      console.log(_language.print.call(void 0, document));
      console.log(variables);
      console.log(operationName, result);
    },
    formatError: (error) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = _koaconvert2.default.call(void 0, _koagraphql2.default.call(void 0, graphqlSettingsPerReq));

app.use(_koacors2.default.call(void 0, ));

router.all('/graphql', graphqlServer);
router.all(
  '/playground',
  _graphqlplaygroundmiddleware.koaPlayground.call(void 0, {
    endpoint: '/graphql',
  }),
);

app.use(router.routes()).use(router.allowedMethods());

exports. default = app;
