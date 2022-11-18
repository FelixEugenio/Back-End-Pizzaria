import prismaClient from "../../prisma";
import { compare } from "bcrypt";
import {sign} from 'jsonwebtoken'

interface AuthRequest{
    email:string
    password:string

}

class AuthUserService{
    async execute({email,password}:AuthRequest){
        // verificar se o email exist
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error('Use/Password incorrect')

        }
        // verificando a senha se sao iguais
      const passwordMacth = await compare(password,user.password)

      if(!passwordMacth){
        throw new Error('Use/Password incorrect')
      }


      // geranado token jwt
     const token = sign({
        name:user.name,
        email:user.email
     },
     process.env.JWT_SECRET,
     {
        subject:user.id,
        expiresIn:'30d'
     }
     )

     return {
        id:user.id,
        name:user.name,
        email:user.email,
        token:token
     }




    }
}

export {AuthUserService}