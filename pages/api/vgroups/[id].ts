import { NextApiRequest, NextApiResponse } from 'next';

export default function getVtuberById(req: NextApiRequest, res: NextApiResponse) {

    res.json(
        {
            //urlのクエリストリング「id」の値を取得
            byId: req.query.id,
            message: 'getVtuberById'
        }
    );
}