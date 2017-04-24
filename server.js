import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Routes from './server/routes';
import config from './server/config/config';
import db from './server/config/db';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/')));

app.get('*', (req, res) => {
  /**
   * Loading a single file...
   * Meanwhile Angular handles the different pages.
   */
  res.sendFile(path.resolve('client/index.html'));
});

require('./server/routes')(app);

const port = config.server.port;

app.listen(process.env.PORT || port);

/* eslint-disable no-console */
console.log(`Look me up on http://localhost:${port}`);
