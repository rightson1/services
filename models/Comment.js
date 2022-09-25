import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const CommentSchema = new Schema({
        worker: str,
        client: str,
        review: str,
        username: str,
        name: str,
        avatar: String,
    },

    { timestamps: true }
);

export default models.Comment || model("Comment", CommentSchema);