import express from 'express';
import request from 'request';
import nodeFetch from 'node-fetch';
import dotenv from 'dotenv';
import oracledb from 'oracledb';
// import bodyParser from "body-parser";

import { users } from './libs/data';
import { Shain } from './types';

dotenv.config();
// console.info(process.env);

// OracleDB接続設定
// https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html
// ※事前にOracleClientをインスール
/*
 * Alternatively, if you already have a database but it is on a remote computer,
 * then install the Oracle Instant Client "Basic" and "SQL*Plus" packages from here.
 * Remember to install the VS Redistributable and add the directory to your PATH environment variable, as instructed.
 * You will need to know the connect string for the database, and substitute it in the instructions below.
 */
(async function () {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_CONNECTION_STRING,
    });
    console.info('Connected to Oracle DB', connection.oracleServerVersionString);

    const data = await connection.execute<Shain[]>(
      'select * from m_shain where shain_code = :SHAIN_CODE',
      { SHAIN_CODE: process.env.TEST_USER },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (!!data.rows?.length) {
      console.info(data.rows[0]);
    }

    await connection.close();
    console.info('Closed Oracle DB');
  } catch (error) {
    console.warn(error);
  }
})();

// Express初期設定
const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ENV = app.get('env');
console.info({ ENV });
if (ENV === 'development') {
  // CORS無効化
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });
}

//一覧取得1
app.get('/users', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send(JSON.stringify(users));
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).send(error.message);
    }
    res.status(403).send();
  }
});

//一覧取得2
app.get('/book', async (req: express.Request, res: express.Response) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + req.query.bookno,
      json: true,
    };
    request(options, function (error, response, body) {
      console.info(body.items[0].volumeInfo.title);
      res.send(body);
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).send(error.message);
    }
    res.status(403).send();
  }
});

//一覧取得3
app.get('/sample', async (req: express.Request, res: express.Response) => {
  try {
    const result = await nodeFetch('https://www.googleapis.com/books/v1/volumes?q=isbn:4309025447');
    const json = await result.json();
    res.send(JSON.stringify(json));
  } catch (error) {
    if (error instanceof Error) {
      res.status(403).send(error.message);
    }
    res.status(403).send();
  }
});

// START
app.listen(3001, () => {
  console.info('start on port 3001.');
});

export default app;
