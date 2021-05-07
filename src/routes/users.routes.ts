import { Router } from "express";
import CreateUserService from "../Services/CreateUserService";
import SendEmail from "../Services/SendEmail";

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {


    try { 
        const { name, email } = request.body;

        // encontrar uma forma melhor de fazer isso!
        const password = "12344";

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