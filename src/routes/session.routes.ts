import { Router } from "express";


import CreateSession from '../Services/CreateSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    try{ 

        const { email, password } = request.body;

        const session  = new CreateSession();

        const { findUser } = await session.execute({
            email,
            password,
        });


        //@ts-ignore
        delete findUser.password;

        return response.json({message: 'Usuario autorizado!', findUser})

    } catch(err) {
        return response.status(401).json({ error: err.message} )
    }
})

export default sessionsRouter;

