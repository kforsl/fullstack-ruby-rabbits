const errorMessages = {
    invalidCredentials: { message: 'Bad Request', data: 'Invalid credentials' },
    passwordNotRegexValid: {
        message: 'Bad Request',
        data: 'Lösenordet måste innehålla minst 1 stor bokstav, 1 liten bokstav, 1 siffra och 1 specialtecken!',
    },
    passwordNotLongEnough: {
        message: 'Bad Request',
        data: 'Lösenordet måste vara åtminstone 8 karaktärer långt!',
    },
    invalidToken: {
        message: 'Invalid token',
        data: '',
    },
};
module.exports = errorMessages;
