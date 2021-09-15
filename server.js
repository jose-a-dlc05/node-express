import express from 'express';
import Reflection from './src/controllers/Reflection';

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
