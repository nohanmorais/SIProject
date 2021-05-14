import { Router } from "express";
import UpdatePasswordService from "../Services/UpdatePasswordService";
import bcryptjs from 'bcryptjs';


const registerPasswordRouter = Router();

registerPasswordRouter.get('/', async(request, response) => {
    
    try { 

        const {email, password, newPassword} = request.body;

        const saltRounds = 10;
        const pass = newPassword;
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hash = bcryptjs.hashSync(pass, salt);
        const newPasspordHashed = hash;

        const updatePassword = new UpdatePasswordService();
        await updatePassword.execute({email, password, newPassword: newPasspordHashed});


    
        return response.status(201).json({ message: 'Senha alterada com sucesso!'});
    
    } catch(err) {

        return response.status(400).json({ error: err.message})
    }

});

export default registerPasswordRouter;