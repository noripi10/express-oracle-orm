import supertest from 'supertest';
// import oracledb from 'oracledb';

import app from '../src/index';

describe('Express Server Test', () => {
  it('Get Users', async () => {
    const res = await supertest(app).get('/users');
    expect(res.status).toBe(200);
  });

  // it('DB Connection', async () => {
  //   const connection = await oracledb.getConnection({
  //     user: process.env.ORACLE_USER,
  //     password: process.env.ORACLE_PASSWORD,
  //     connectionString: process.env.ORACLE_CONNECTION_STRING,
  //   });
  // });
});
