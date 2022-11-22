import mongoose from "mongoose";

const PassengersSchema = new mongoose.Schema({
    phoneNumb: {
        type: String,
        required: true,
        uniwue: true
    },
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    secondName: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,     
    }
},
{
    timestamps: true
}
);

export default mongoose.model('Passenger', PassengersSchema);