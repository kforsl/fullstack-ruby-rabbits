import Joi from 'joi';

const authSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'any.required': 'Du måste skriva i din mailadress.',
            'email.base': 'Skriv i en korrekt mailadress (namn@adress.se)',
        }),
    password: Joi.string().required().messages({
        'string.empty': 'Du måste skriva i ett lösenord',
    }),
});

export default authSchema;
