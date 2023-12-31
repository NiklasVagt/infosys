import express, { json, urlencoded } from 'express';
import { join } from 'path';
import { router as eventsRouter } from './routes/events.routes';
import morgan from 'morgan';
import { swaggerConfig } from './constants/swagger.config';
import { SwaggerService } from '@infosys/node-common';

const app = express();
new SwaggerService(app, swaggerConfig).setupRedirect();

// Statically host everything under /assets
app.use('/assets', express.static(join(__dirname, 'assets')));

// Parse json bodies and attach to req object.
app.use(json());
app.use(urlencoded());
app.use(morgan('dev'));

// Setup /api/events
app.use('/api/events', eventsRouter);

// Start server and listen on PORT env variable or 3333 fallback.
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}/api`);
});

// Log errors
server.on('error', console.error);
