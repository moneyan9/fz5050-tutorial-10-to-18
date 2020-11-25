import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getVtuberById(req: NextApiRequest, res: NextApiResponse) {

    const db = await open(
        {
            filename: './mydb.sqlite',
            driver: sqlite3.Database
        }
    );

    if (req.method === 'PUT') {
        const statement = await db.prepare('update Person set name = ? where id = ? ');
        const result = await statement.run(req.body.name, req.query.id);

        console.log(result);

    }

    //idが一致したデータを取得
    const vtuber = await db.get('select * from person where id = ?', [req.query.id]);

    res.json(vtuber);
}