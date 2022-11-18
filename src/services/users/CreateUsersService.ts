import prismaClient from '../../prisma'
import bcrypt, { hash } from 'bcrypt';


interface UserRequest{
    name: string
    email:string
    password:string
}

class CreateUserService{
    async execute({name,email,password}:UserRequest){
     
        // verificando se o usuario colocou um email
        if(!email){
            throw new Error('email incorrect')
        }

        // verificar se esse email ja existe cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        const passwordHash = await hash(password,8)

        if(userAlreadyExists){
            throw new Error('User already Exists')
        }

        // salavando dados na base de dados 
        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return user;
   
    }
}

export { CreateUserService}