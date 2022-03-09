import OracleDb from 'oracledb';
import { Connection, createConnection } from 'typeorm';

import ormSettings from './ormSettings';
import { Shain } from 'src/types/Shain';

// OracleDB接続設定
// https://www.oracle.com/database/technologies/appdev/quickstartnodeonprem.html
// ※事前にOracleClientをインスール

export const connectionDbAsyncORM = async (): Promise<Connection | undefined> => {
  try {
    const connection = await createConnection(ormSettings);
    console.info('Connected to Oracle DB', connection.isConnected);

    return connection;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};

/*
 * Alternatively, if you already have a database but it is on a remote computer,
 * then install the Oracle Instant Client "Basic" and "SQL*Plus" packages from here.
 * Remember to install the VS Redistributable and add the directory to your PATH environment variable, as instructed.
 * You will need to know the connect string for the database, and substitute it in the instructions below.
 */
export const connectionDbAync = async (): Promise<OracleDb.Connection | undefined> => {
  try {
    const connection = await OracleDb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectionString: process.env.ORACLE_CONNECTION_STRING,
    });
    console.info('Connected to Oracle DB', connection.oracleServerVersionString);

    const data = await connection.execute<Shain[]>(
      'select * from m_shain where shain_code = :SHAIN_CODE',
      { SHAIN_CODE: process.env.TEST_USER },
      { outFormat: OracleDb.OUT_FORMAT_OBJECT }
    );
    if (!!data.rows?.length) {
      console.info(data.rows[0]);
    }

    return connection;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};
