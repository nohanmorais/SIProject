import { Router } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";


const confirmRegister = Router();

confirmRegister.post('/', async(request, response) => {
    
    try { 

        const {codeNumber} = request.body;

        const user = getRepository(User);
        const findUser = await user.findOne({ where: {confirmCode: codeNumber}});

    
        if(!findUser) {
            throw new Error('Codigo nao encontrado')
        }

        findUser.confirmCode = "";

        user.save(findUser);

        const userData = {
            id: findUser.id, 
            oldPassword: findUser.password,
            lastPassword: findUser.lastPassword
        }

        
        
        return response.status(201).json({ message: 'Codigo encontrado!', userData});
    
    } catch(err) {

        return response.status(400).json({ error: err.message})
    }

});

export default confirmRegister;