
import * as dotenv from 'dotenv'
dotenv.config()
// @ts-ignore: Unreachable code error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

import express from 'express';
import router from './routes/router';
import path from 'path';
import { connect } from './db';

const { PORT = 3001 } = process.env;

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Serve API requests from the router
app.use('/api', router);

// Serve app production bundle
app.use(express.static('dist/frontend'));

// Handle client routing, return all requests to the app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

app.listen(PORT, () => {
  connect();
  console.log(`Server listening at http://localhost:${PORT}`);
});
