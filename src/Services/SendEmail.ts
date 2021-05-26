import { getRepository } from "typeorm";
import User from "../models/User";
import nodemailer from "nodemailer";

interface Request {
    email: string;
    forgotPassword: string;
}


class SendEmail {
    public async execute(email: any, forgotPassword?: any): Promise<void> {

        const getUser = getRepository(User);
        const checkEmail = await getUser.findOne({ where: { email } });

        if (!checkEmail) {
            throw new Error("Email nao encontrado!");
        }

        const confirmCode = (Math.floor(Math.random() * 10000) + 99999).toString();
        checkEmail.confirmCode = confirmCode;
        checkEmail.forgotPassword = forgotPassword;

        await getUser.save(checkEmail);

        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account' + err.message);
                return process.exit(1);
            }

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'admsistemadesi@gmail.com',
                    pass: 'Senha0021*',
                }
            });

            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Server is ready to take our messages");
                }
            });

            transporter.sendMail({
                from: 'admin@luizricardosantos.com.br',
                to: checkEmail.email,
                subject: 'Clique no link para cadastrar sua nova senha!',
                text: `Ola bem vindo, clique no link para cadastrar sua senha:
                    http://localhost:3000/confirmRegister 
                    O seu codigo de confirmacao e: ${confirmCode}`,
            }).then(info => {
                const tempo = 1000;
                let valor = 0;
                const time = setInterval((email) => {
                    if (valor >= 30) {
                        const getUser = getRepository(User);
                        getUser.findOne({ where: { email } }).then((usuario: any) => {
                            if (usuario.lastPassword === null) {
                                console.log(`Usuário: ${usuario.name}, email: ${usuario.email} excluído do sistema por código expirado`);
                                getUser.delete(usuario.id)
                            }
                        }).catch(error => { error.message });
                        clearInterval(time)
                    } else {
                        console.log(valor);
                        valor++;
                    }
                }, tempo, email)
                return info
            }).catch(error => { error.message });
        })
    }
}

export default SendEmail;