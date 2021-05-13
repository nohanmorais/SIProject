import { getRepository } from "typeorm";
import User from "../models/User";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface Request {
    name: string;
    email: string;
    password: string;
}


class SendEmail {


    public async execute({email, password}: Request): Promise<void> {

        const getUser = getRepository(User);
        const checkEmail = await getUser.findOne({ where: {email} });

        if(!checkEmail) {
            throw new Error("Email nao encontrado!");
        }

        const pass = checkEmail.password;

        nodemailer.createTestAccount((err, account) =>  {
            if(err){
                console.error('Failed to create a testing account' + err.message);
                return process.exit(1);
            }
        
            let transporter = nodemailer.createTransport({ 
                host: "smtp.umbler.com",
                port: 587,
                auth: {
                    user: 'admin@luizricardosantos.com.br',
                    pass: 'Admin123@',
                } 
            });
        
            transporter.sendMail({
                from: 'admin@luizricardosantos.com.br',
                to: checkEmail.email,
                subject: 'Clique no link para cadastrar sua nova senha!',
                text: 'Ola bem vindo, clique no link para cadastrar sua senha: ' + pass,
            }).then(info => { return info}).catch(error => {error.message});
        })


    }



}

export default SendEmail;