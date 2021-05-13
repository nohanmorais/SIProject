import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";

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
            throw new Error('Email/Password incorrect!')
        }

        if(password !== findUser.password) {
            throw new Error('Email/Password incorrect!')
        }

        return { 
            findUser, 
        }
    }
}

export default CreateSession;