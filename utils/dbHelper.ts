/* eslint-disable curly */
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const openDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    const db = await SQLite.openDatabase({
      name: 'metahint.db',
      location: 'default',
    });
    console.log('Database opened');
    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
};

export const createTransferHistoryTable = async (db: SQLite.SQLiteDatabase) => {
  try {
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS crypto_transfer_history (
        transfer_hash TEXT PRIMARY KEY,
        sender_address TEXT NOT NULL,
        receiver_address TEXT NOT NULL,
        amount TEXT NOT NULL,
        blockchain TEXT NOT NULL,
        token_type TEXT,
        transfer_timestamp INTEGER NOT NULL,
        memo TEXT,
        raw_transaction_json TEXT,
        gas_price TEXT,
        block_height INTEGER
      );
    `);
    console.log('Transfer history table created');
  } catch (error) {
    console.error('Failed to create table:', error);
  }
};

export const insertTransferRecord = async (
  db: SQLite.SQLiteDatabase,
  data: {
    transfer_hash: string;
    sender_address: string;
    receiver_address: string;
    amount: string;
    blockchain: string;
    token_type: string | null;
    transfer_timestamp: number;
    memo?: string;
    raw_transaction_json: string;
    gas_price: string;
    block_height: number;
  },
) => {
  try {
    await db.executeSql(
      `INSERT INTO crypto_transfer_history (
        transfer_hash, sender_address, receiver_address, amount,
        blockchain, token_type, transfer_timestamp, memo,
        raw_transaction_json, gas_price, block_height
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.transfer_hash,
        data.sender_address,
        data.receiver_address,
        data.amount,
        data.blockchain,
        data.token_type,
        data.transfer_timestamp,
        data.memo ?? null,
        data.raw_transaction_json,
        data.gas_price,
        data.block_height,
      ],
    );
    console.log('Transfer record inserted');
  } catch (error) {
    console.error('Failed to insert transfer record:', error);
  }
};

export const getAllTransfers = async (
  db: SQLite.SQLiteDatabase,
  address: string,
) => {
  if (!db) throw new Error('Database is not initialized');
  try {
    const [results] = await db.executeSql(
      'SELECT * FROM crypto_transfer_history WHERE LOWER(sender_address) = LOWER(?) OR LOWER(receiver_address) = LOWER(?) ORDER BY transfer_timestamp DESC LIMIT 0,100',
      [address, address],
    );
    const transfers = results.rows.raw();
    console.log('Transfers:', transfers);
    return transfers;
  } catch (error) {
    console.error('Failed to fetch transfers:', error);
    return [];
  }
};
