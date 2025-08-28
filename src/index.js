import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './utilities/swaggerOptions.js';
import ip from 'ip';
import { rateLimit }  from 'express-rate-limit';
import cors from "cors";


const PORT= 3000;
const app=express();
app.use(cors());


const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5 // limit each IP to 5 requests per windowMs
});

app.use(limiter); // apply rate limiter to all requests

app.use(express.json());
app.use(express.text());

// app.post('/api/v1/users/signup', (req, res) => {
//   res.json({ message: 'Signup route hit!' });
// });  //Test route

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', apiRouter);// If the url starts with /api then the request is forwarded to the apiRouter


app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    const ipaddr = ip.address();
    return res.json({ message: 'pong' + ipaddr });
});
// app.get('/ping', isAuthenticated, (req, res) => {
//     console.log(req.query);
//     console.log(req.body);
//     console.log(req.user);
//     const ipaddr = ip.address();
//     return res.json({ message: 'pong' + ipaddr });
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});