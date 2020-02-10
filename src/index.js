import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/api/index';


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// console.log(index);
app.use(routes);

app.listen(port, () => `Server is running on PORT ${port}`);

export default app;
