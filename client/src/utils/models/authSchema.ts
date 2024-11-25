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

const signUpSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'any.required': 'Du måste skriva i din mailadress.',
            'email.base': 'Skriv i en korrekt mailadress (namn@adress.se)',
        }),
    password: Joi.string().required().min(8).messages({
        'string.empty': 'Du måste skriva i ett lösenord',
    }),
    verifyPassword: Joi.ref('password'),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    socialSecurityNumber: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string(),
    city: Joi.string(),
    zipcode: Joi.string(),
});
export { authSchema, signUpSchema };
