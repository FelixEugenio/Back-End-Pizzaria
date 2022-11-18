import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub:string
}

 export function isAuthtenticaded (
    req:Request,
    res:Response,
    next: NextFunction
 ){

    //receber o token
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).end();

    }

    const [, token] = authToken.split(" ")

    try{
        const { sub }= verify(
            token,process.env.JWT_SECRET
        ) as Payload

        // recuperar o id do token e colocar dentro de uma variavel 
        req.user_id = sub;

        return next()

    }catch(err){
        return res.status(401).end();
    }

 }