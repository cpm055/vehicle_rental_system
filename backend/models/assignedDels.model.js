import mongoose from "mongoose";

const assignedDels =  mongoose.Schema({
    carId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    owner_email: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    delPersonEmail: {
        type: String,
        required: true
    },
    delPersonName: {
        type: String,
        required: true
    },
    delStatus: {
        type: String,
        required: true,
        default: "Pending"
    }
});

const AssignedDels = mongoose.model('AssignedDels', assignedDels);

export default AssignedDels;