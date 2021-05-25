import { Router } from "express";
import SendEmail from "../Services/SendEmail";



const emailRouter = Router();


emailRouter.post('/', async (request, response) => {
    try { 
        const {email, forgotPassword} = request.body;

        const emailPassword = new SendEmail();

        await emailPassword.execute(email, forgotPassword);

        return response.json({ message: 'Email enviado com sucesso!'});
    } catch(err) {
        return response.status(400).json({Erro: err.message})
    }
});

export default emailRouter;