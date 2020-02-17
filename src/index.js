import i18n from 'i18n';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import welcome from './routes/welcome';
import swagger from './swagger/index';
import authRouter from './routes/authRoutes';

dotenv.config();
i18n.configure({
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  queryParameter: 'lang',
  directory: path.join(__dirname, 'services/localesServices/locales'),
});

const app = express();
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

app.use('/api', welcome);
app.use('/api-doc', swagger);
app.use('/api/v1/auth', authRouter);

app.use(express.json());

app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}/api`));

export default app;
