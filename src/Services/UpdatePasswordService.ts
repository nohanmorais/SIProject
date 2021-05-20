import { getRepository } from "typeorm";
import User from "../models/User";
import bcryptjs from 'bcryptjs';


interface Request {
    id: string;
    lastPassword: string;
    password: string;
}

class UpdatePasswordService {

    public async execute({id, lastPassword, password}: Request ): Promise<void> {

        const usersRepository = getRepository(User);
        
        const findUser = await usersRepository.findOne({
            where: {id},
        });

        if(!findUser) {
            throw new Error('This User doed not exist!');
        }

        if(lastPassword !== null) {

            const validPassword = await bcryptjs.compare(lastPassword, findUser.lastPassword);

            
            if(!validPassword) {

                throw new Error('Senha atual está errada!');

            } else {

                const saltRounds = 10;
                const pass = password;
                const salt = bcryptjs.genSaltSync(saltRounds);
                const hash = bcryptjs.hashSync(pass, salt);

                const validNewPassword = await bcryptjs.compare(password, findUser.lastPassword);

                if(validNewPassword) {
                    throw new Error('The Password have to change!');
                }

                findUser.password = hash;
                await usersRepository.save(findUser);
            }
        }
        
        const saltRounds = 10;
        const pass = password;
        const salt = bcryptjs.genSaltSync(saltRounds);
        const hash = bcryptjs.hashSync(pass, salt);
        

        findUser.password = hash;
        findUser.lastPassword = hash;
        await usersRepository.save(findUser);

    }

}

export default UpdatePasswordService;