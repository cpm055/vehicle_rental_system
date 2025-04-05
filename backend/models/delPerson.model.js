




import mongoose from "mongoose";


const delPerson = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}) 

const DelPerson = mongoose.model('DelPerson', delPerson);

export default DelPerson;