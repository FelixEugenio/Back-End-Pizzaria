import { Request, response, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUsersService";

// criando classe CreateUserController
class CreateUserController{
    async handle(req:Request,res:Response){
      // pegando os dados do body

      const { name,email,password} = req.body;

// instanciando classe pra passar os dados
const createUserService = new CreateUserService();

const user = await createUserService.execute({
  name,
  email,
  password
})
      return res.json(user)
    }
}

export { CreateUserController}