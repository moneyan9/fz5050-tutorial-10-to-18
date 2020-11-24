import { NextApiRequest, NextApiResponse } from 'next';

export default function getAllGroups(req: NextApiRequest, res: NextApiResponse) {

    //GETメソッド以外はstatus500を返す
    if (req.method !== 'GET') {
        res.status(500).json(
            { message: ' GET requests only !!' }
        );
    }

    res.json(
        {
            groupname: 'VOMS',
            method: req.method
        }
    );

}