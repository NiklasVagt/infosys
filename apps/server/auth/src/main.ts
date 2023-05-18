import express, { json, urlencoded } from 'express';
import * as path from 'path';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';
import morgan from 'morgan';
import { SwaggerService } from '@infosys/node-common';
import { swaggerConfig } from './constants/swagger.config';

const app = express();
new SwaggerService(app, swaggerConfig).setupRedirect();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(json());
app.use(urlencoded());
app.use(morgan('dev'));

app.use('/api', authRouter());
app.use('/api/users', userRouter());

const port = process.env.PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
