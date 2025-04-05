import mongoose from "mongoose";

const vehicleShema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    milage: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleShema);

export default Vehicle;