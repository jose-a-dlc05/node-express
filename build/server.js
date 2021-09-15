"use strict";

var _express = _interopRequireDefault(require("express"));

var _Reflection = _interopRequireDefault(require("./src/controllers/Reflection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// set up a new express instance
var app = (0, _express["default"])(); // middleware - this is needed to get access to request body

app.use(_express["default"].json());
app.post('/api/v1/reflections', _Reflection["default"].create);
app.get('/api/v1/reflections', _Reflection["default"].getAll);
app.get('/api/v1/reflections/:id', _Reflection["default"].getOne);
app.put('/api/v1/reflections/:id', _Reflection["default"].update);
app["delete"]('/api/v1/reflections/:id', _Reflection["default"]["delete"]);
app.listen(3000);
console.log('app running on port', 3000);