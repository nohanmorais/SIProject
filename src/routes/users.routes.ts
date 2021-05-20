import { Router } from "express";
import CreateUserService from "../Services/CreateUserService";
import bcryptjs from 'bcryptjs';
import SendEmail from "../Services/SendEmail";

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {


    try { 
        const { name, email } = request.body;

        // First Password!
        const saltRounds = 10;
        const pass = (Math.floor(Math.random() * 10000) + 100000).toString();
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hash = bcryptjs.hashSync(pass, salt);
        const password = hash;

        console.log(pass);

        //Create User object
        const createUser = new CreateUserService();
        
        //Call method
        const user = await createUser.execute({
            name,
            email,
            password
        });


        //@ts-ignore
        delete user.password;

        return response.json({ message: 'Cadastro efetuado com sucesso! ', user})

  

    } catch (err) {
        return response.status(401).json({ error: err.message });
    }


});

export default usersRouter;