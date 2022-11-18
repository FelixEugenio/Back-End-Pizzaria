import { Request, Response } from "express";
import {AuthUserService} from '../../services/users/AuthUserService'

class AuthUserController {
async handle(req:Request,res:Response){
    //pegando email e password
    const {email,password} = req.body;

    const authUserService = new AuthUserService();

    // passando os dados pra o nosso servico fazer o execute
    const auth = await authUserService.execute({
        email,
        password
    })

    return res.json(auth)

}
}

export {AuthUserController}