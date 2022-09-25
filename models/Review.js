import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const ReviewSchema = new Schema({
        clientId: str,
        userId: str,
        review: str,
        username: str,
        name: str,
    },

    { timestamps: true }
);

export default models.Review || model("Review", ReviewSchema);