import mongoose from "mongoose";

const deliverySchema =  mongoose.Schema({
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
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;