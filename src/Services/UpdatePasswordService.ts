import { getRepository } from "typeorm";
import User from "../models/User";


interface Request {
    password: string;
    newPassword: string;
}

class UpdatePasswordService {

    public async execute({password, newPassword}: Request ): Promise<void> {

        const usersRepository = getRepository(User);
        
        const findUser = await usersRepository.findOne({
            where: {password},
        });

        if(!findUser) {
            throw new Error('This Token is incorrect!');
        }

        findUser.password = newPassword;

        await usersRepository.save(findUser);

    }

}

export default UpdatePasswordService;