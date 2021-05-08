import { Router } from "express";
import CreateUserService from "../Services/CreateUserService";
import SendEmail from "../Services/SendEmail";
import bcryptjs from 'bcryptjs';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {


    try { 
        const { name, email } = request.body;

        const saltRounds = 10;
        const pass = '12344';
        
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hash = bcryptjs.hashSync(pass, salt);

        console.log(hash);


        // encontrar uma forma melhor de fazer isso!
        const password = hash;

        const createUser = new CreateUserService();
    
        const user = await createUser.execute({
            name,
            email,
            password,
        });

        //@ts-ignore
        delete user.password;

        return response.json({ message: 'Cadastro efetuado com sucesso! ', user})

  

    } catch (err) {
        return response.status(401).json({ error: err.message });
    }


});

export default usersRouter;