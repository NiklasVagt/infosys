import express, { json, urlencoded } from 'express';
import { join } from 'path';
import { router as personsRouter } from './routes/persons.routes';
import morgan from 'morgan';
import { swaggerConfig } from './constants/swagger.config';
import { SwaggerService } from '@infosys/node-common';

const app = express();
new SwaggerService(app, swaggerConfig).setupRedirect();

app.use('/assets', express.static(join(__dirname, 'assets')));

app.use(json());
app.use(urlencoded());
app.use(morgan('dev'));

app.use('/api/persons', personsRouter);

const port = process.env.PORT || 3336;
const server = app.listen(port, () => {
  console.info(`Listeing at http://localhost:${port}/api`);
});

server.on('error', console.error);
