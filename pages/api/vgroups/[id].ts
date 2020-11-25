import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getVtubersByVgroupId(req: NextApiRequest, res: NextApiResponse) {

    const db = await open(
        {
            filename: './mydb.sqlite',
            driver: sqlite3.Database
        }
    );

    //vgroupIdが同じものをpersonテーブルからとってくる
    const vtubers = await db.all('select * from person where vgroupId = ?', [req.query.id]);

    res.json(vtubers);
}