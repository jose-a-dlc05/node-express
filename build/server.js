"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _Reflection = _interopRequireDefault(require("./src/usingJSObject/controllers/Reflection"));

var _Reflection2 = _interopRequireDefault(require("./src/usingDB/controllers/Reflection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Installed babel-polyfill npm package and imported it - We need this here so that node runtime will recognise async/await and Promise
// we need to load/get TYPE to/from system enviroment, we make use of dotenv to do just that and process.env.TYPE is used to retrieve its value
_dotenv["default"].config();

var Reflection = process.env.TYPE === 'db' ? _Reflection2["default"] : ReflectionWithJsObject; // set up a new express instance

var app = (0, _express["default"])(); // middleware - this is needed to get access to request body

app.use(_express["default"].json());
app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app["delete"]('/api/v1/reflections/:id', Reflection["delete"]);
app.listen(3000);
console.log('app running on port', 3000);