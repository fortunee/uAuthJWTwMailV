import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Routes from './server/routes';
import config from './server/config/config';

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

Routes(app);

const port = process.env.PORT || 8090;

app.listen(port);

/* eslint-disable no-console */
console.log(`Look me up on http://localhost:${port}`);
