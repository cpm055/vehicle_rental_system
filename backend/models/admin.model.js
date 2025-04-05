import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
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

const Admins = mongoose.model('admin', adminSchema);

export default Admins;