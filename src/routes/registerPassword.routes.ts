import { Router } from "express";
import UpdatePasswordService from "../Services/UpdatePasswordService";



const registerPasswordRouter = Router();

registerPasswordRouter.get('/', async(request, response) => {

    try { 
        const {password, newPassword} = request.body;

        const updatePassword = new UpdatePasswordService();
        await updatePassword.execute({password, newPassword});
    
        return response.status(201).json({ message: 'Senha alterada com sucesso!'});
    
    } catch(err) {

        throw new Error('Verifique se seu token esta correto ou entre em contato com o adm do sistema!');
    }

});

export default registerPasswordRouter;