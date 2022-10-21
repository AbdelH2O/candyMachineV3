import { NextApiRequest, NextApiResponse } from "next";
import { getMerkleProof } from "@metaplex-foundation/js";
import { allowed } from "../../enums/allowedList";
import { PublicKey } from "@solana/web3.js";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST"){
        res.status(400).send("Invalid request methode.");
        return;
    }
    console.log(req.body);
    
    // const body = JSON.parse(req.body);
    // console.log(body);
    
    if(!("address" in req.body)) {
        res.status(401).send("Invalid request body.");
        return;
    }
    try {
        const address = new PublicKey(req.body.address);
        const proof = getMerkleProof(allowed, address.toBase58());
        console.log(proof);
        if(PublicKey.isOnCurve(address.toBuffer())){
            res.status(200).send(JSON.stringify(getMerkleProof(allowed, address.toBase58()).map((x) => x.toString())));
            return;
        } else {
            throw new Error("Invalid address.");
        }
    } 
    catch (err) {
        console.log(err);
        res.status(402).send("Invalid address.");
        return;
    }
};

export default handler;