import express from 'express';

import cors from 'cors'

import leadrouter from './routes/lead.routes.js'
import { dbConnect } from './utils/dbConnect.js';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from server.js!');
});


app.use('/api',leadrouter)

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
  dbConnect()
});
