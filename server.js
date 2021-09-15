import express from 'express';
import dotenv from 'dotenv';
// Installed babel-polyfill npm package and imported it - We need this here so that node runtime will recognise async/await and Promise
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ReflectionWithJSObject from './src/usingJSObject/controllers/Reflection';
import ReflectionWithDB from './src/usingDB/controllers/Reflection';

// we need to load/get TYPE to/from system enviroment, we make use of dotenv to do just that and process.env.TYPE is used to retrieve its value
dotenv.config();
const Reflection =
	process.env.TYPE === 'db' ? ReflectionWithDB : ReflectionWithJsObject;

// set up a new express instance
const app = express();

// middleware - this is needed to get access to request body
app.use(express.json());

app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

app.listen(3000);
console.log('app running on port', 3000);
