




import mongoose from "mongoose";


const delManager = mongoose.Schema({
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

const DelManger = mongoose.model('DelManger', delManager);

export default DelManger;