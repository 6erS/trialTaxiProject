import express from "express";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { body, validationResult } from 'express-validator';
import { registrValidation } from "./additions/validotions/auth.js";
import passengersSchema from "./additions/modulse/Passengers.js";

mongoose
    .connect('mongodb+srv://admin:iGaF8VrhyRZfUk2t@taxoapp.g647ovk.mongodb.net/TaxoApp?retryWrites=true&w=majority')
    .then(() => console.log('\n\tDB connection success...\n'))
    .catch((error) => console.log('\n\tDB error...', error));

const socket = { PORT: 3003, HOST: '127.0.0.1' };
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Some text on the page...')
    res.end();
});

app.post('/auth/registration/', registrValidation, async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json(validationErrors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    const userDOC = passengersSchema({
        phoneNumb: req.body.phoneNumb,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password:passwordHash,
    });

    const user = await userDOC.save();

    console.log(userDOC._id);

    res.json(user);
});

app.listen(socket.PORT, socket.HOST, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('\n\t...everything 200...\n');
});