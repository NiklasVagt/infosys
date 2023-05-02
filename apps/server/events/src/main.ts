import express from 'express';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import { router as eventsRouter } from './routes/events.routes';

const app = express();

// Statically host everything under /assets
app.use('/assets', express.static(join(__dirname, 'assets')));

// Parse json bodies and attach to req object.
app.use(json());
app.use(urlencoded());

// Setup /api/events
app.use('/api/events', eventsRouter);

// Start server and listen on PORT env variable or 3333 fallback.
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}/api`);
});

// Log errors
server.on('error', console.error);
