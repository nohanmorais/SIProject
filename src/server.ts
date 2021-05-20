import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3399, () => {
    console.log('Server Sarted on port 3399')
})