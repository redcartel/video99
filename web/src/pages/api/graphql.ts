/* istanbul ignore file */
import { NextApiRequest, NextApiResponse } from "next";
import Cors from 'micro-cors';
import { makeServer } from "@/graphql";

const cors = Cors();
const apolloServer = makeServer();

export default cors(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }

    try {
        await apolloServer.start();
    }
    catch (e) {
        if (typeof e === 'object' && (e as any).message === 'called start() with surprising state started') {
            // .. pass
        }
        else {
            console.error('error starting apollo server');
            throw e;
        }
    }

    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
});


export const config = {
    api: {
        bodyParser: false,
    },
};