import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {connectDB} from './config/db';

// routes
import foods from './routes/api/foods';
import customers from './routes/api/customers';

const app = express();


// Connect Database
try {
    connectDB().then(res => {
        console.log(res);
    });
} catch(err) {
    throw new Error("Failed to connect to DB");
}

// cors
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use('/api/foods', foods);
app.use('/api/customers', customers);

export default app;