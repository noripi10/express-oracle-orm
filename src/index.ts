import express from 'express';
import request from 'request';
import nodeFetch from 'node-fetch';
import dotenv from 'dotenv';
import { connectionDbAsyncORM } from './db';
import { toCamelCase } from './libs/common';

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
    const shainId = req.query.id ?? '';
    const _connection = await connectionDbAsyncORM();

    const shains = await _connection?.query(`select * from m_shain where shain_code = '${shainId}'`);
    // const shain = _connection?.getRepository(M_SHAIN).findOne({ SHAIN_CODE: '' });

    if (!shains) {
      res.status(404).send('no data');
    }
    const resData = Object.keys(shains[0]).reduce((obj, key) => {
      // camelCase変換
      return { ...obj, [toCamelCase(key)]: shains[0][key] };
    }, {});

    res.status(200).send(JSON.stringify(resData));
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

// const server = http.createServer(app);
// server.listen(process.env.PORT || 3001, () => console.info(`start server ${process.env.PORT || 3001}`));

export default app;
