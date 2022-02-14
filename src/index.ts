import express from 'express';
import request from 'request';
import nodeFetch from 'node-fetch';
import dotenv from 'dotenv';
import { connectionDbAsyncORM } from './db';
import { M_SHAIN } from './db/entity/Shain';
dotenv.config();

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
app.get('/shain', async (req: express.Request, res: express.Response) => {
  try {
    console.info(req.query);
    const _connection = await connectionDbAsyncORM();

    const shain = await _connection?.query(`select * from m_shain where shain_code = '${process.env.TEST_USER}'`);
    // const shain = _connection?.getRepository(M_SHAIN).findOne({ SHAIN_CODE: '11925' });
    console.info({ shain });

    res.status(200).send(JSON.stringify(shain));
    _connection?.close();
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
app.get('/book-detail', async (req: express.Request, res: express.Response) => {
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
