import express from 'express';
import * as path from 'path';
import { router as authRouter } from './routes/auth.router';
import { json } from 'body-parser';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(json());

app.use('/api', authRouter);

const port = process.env.PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
