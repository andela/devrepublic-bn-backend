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

// console.log(index);
// console.log(welcome);
app.use('/api/v1', welcome);
// console.log(swagger);
app.use('/', swagger);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));

export default app;
