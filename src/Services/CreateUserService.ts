import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {

    public async execute({name, email, password}: Request): Promise<User> {

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: {email},
        });

        if(checkUserExists) {
            throw new Error('email already exists');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
            forgotPassword: "S"
        });
        
        await usersRepository.save(user)

        return user;
    }
}

export default CreateUserService;