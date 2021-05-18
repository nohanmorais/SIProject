import { Router } from "express";
import UpdatePasswordService from "../Services/UpdatePasswordService";


const registerPasswordRouter = Router();

registerPasswordRouter.post('/', async(request, response) => {
    
    try { 

        
        const {id, lastPassword, password} = request.body;

        const updatePassword = new UpdatePasswordService();
        await updatePassword.execute({id, lastPassword, password});

        return response.status(201).json({ message: 'Senha alterada com sucesso!'});
    
    } catch(err) {

        return response.status(400).json({ error: err.message})
    }

});

export default registerPasswordRouter;