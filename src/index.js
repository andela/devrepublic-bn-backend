import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import welcome from './routes/api/welcome';
import swagger from './swagger/index';


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/', welcome);
app.use('/api-doc', swagger);

app.listen(port, () => `Server is running on PORT ${port}`);

export default app;
