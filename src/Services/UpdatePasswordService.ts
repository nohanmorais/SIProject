import { getRepository } from "typeorm";
import User from "../models/User";
import bcryptjs from 'bcryptjs';


interface Request {
    email: string;
    password: string;
    newPassword: string;
}

class UpdatePasswordService {

    public async execute({email, password, newPassword}: Request ): Promise<void> {

        const usersRepository = getRepository(User);
        
        const findUser = await usersRepository.findOne({
            where: {email},
        });

        if(!findUser) {
            throw new Error('This Token is incorrect!');
        }

        const validPassword = await bcryptjs.compare(password, findUser.password);
        
        console.log(password);
        console.log(findUser.password);
        console.log(validPassword);
        
        if(!validPassword) {
            throw new Error('Compare Wrong!!');
        }

        findUser.password = newPassword;

        await usersRepository.save(findUser);

    }

}

export default UpdatePasswordService;