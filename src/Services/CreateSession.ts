import { getRepository } from "typeorm";
import User from "../models/User";
import bcryptjs from 'bcryptjs';

interface Request {
    email: string;
    password: string;
}

interface Response {
    findUser: User;
}

class CreateSession {

    public async execute({ email, password }: Request): Promise<Response> {


        const userRepository = getRepository(User);

        const findUser = await userRepository.findOne({
            where: {email},
        });


        if(!findUser) {
            throw new Error('Email ou Senha incorreto!')
        }

        const validPassword = await bcryptjs.compare(password, findUser.password);


        if(!validPassword) {
            throw new Error('Email ou Senha incorreto!')
        }

        return { 
            findUser, 
        }
    }
}

export default CreateSession;