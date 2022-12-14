import mongoose, { model, models, Schema } from "mongoose";
const str = {
    type: String,
    required: true,
};
const OrderSchema = new Schema({
    area: str,
    deadline: {
        type: Date,
        required: true,
    },
    from: str,
    to: str,
    title: str,
    type: str,
    likes: {
        type: Array,
        default: [],
    },
    ward: str,
    dislikes: {
        type: Array,
        default: [],
    },
    image: {
        type: String,
        default: "",
    },
    dislikes: {
        type: Array,
        default: [],
    },
    desc: {
        type: String,
        default: "",
    },
    specs: {
        type: String,
        default: "",
    },

    userId: str,
}, { timestamps: true });

export default models.Order || model("Order", OrderSchema);