import { body } from 'express-validator';

export const registrValidation = [
    body('phoneNumb', 'Invalid Phone Number').isMobilePhone('uk-UA'),
    body('firstName', 'Invalid First Name. It must be longer then 2 ch.').isLength({ min: 2 }),
    body('secondName', 'Invalid Second Name. It must be longer then 2 ch.').isLength({ min: 2 }),
    body('password', 'Invalid Password. It must be longer then 8 ch.').isLength({ min: 8 })
];