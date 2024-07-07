import nodemailer from "nodemailer";
import jsondata from "../../config.json" assert {type: "json"};

const config = JSON.parse(JSON.stringify(jsondata));

const utils = {

    //função que valida campos obrigatorios.. ELE FUNCIONA COM VALORES RESPECTIVAMENTE.
    validate(data, requiredFields) {
        const missingFields = [];

        //veifica se existe campo..
        requiredFields.forEach(field => {

            if (!data.hasOwnProperty(field)) {

                missingFields.push(field);

            }

        });

        //verifica se campo esta vazio..
        Object.values(data).forEach((element, index) => {
            
            if (element.length <= 0) {

                missingFields.push(requiredFields[index]);

            }

        });

        if (missingFields.length > 0) {
            return missingFields;
        }
    
        return true;
    },

    generate_random_number(length) {
        let random = '';
    
        for (let i = 0; i < length; i++) {
            random += Math.floor(Math.random() * 10);
        }
    
        return random;
    },

    //envia email por nodemailer..
    async send_email(email, children, sub) {
        try {

            const transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: config.mail.name,
                    pass: config.mail.password,
                },
            });

            const info = await transport.sendMail({
                from: '"Metablog" <no-reply@metablog.com>',
                to: email,
                subject: sub,
                html: children
            });

            console.log('Email sended! Message ID: ', info.messageId);
            return true;

        } catch (error) {
            console.error('Error during sending: ', error);
            return false;
        }
    }
}

export {utils}