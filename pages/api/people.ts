import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

//personテーブルからデータを取得する
export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {

    //db接続
    const db = await open(
        {
            filename: './mydb.sqlite',
            driver: sqlite3.Database
        }
    );

    const people = await db.all('select * from person');


    res.json(people);
}