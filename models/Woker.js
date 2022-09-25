import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const str = {
    type: String,
    required: true,
};
const WorkerSchema = new Schema({
    username: str,
    password: str,
    email: str,
    name: str,
    experience: { type: String, default: "" },
    avatar: {
        type: String,
        default: "",
    },

    type: str,
    area: str,
    worker: {
        type: Boolean,
        default: true,
    },
});
WorkerSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});
WorkerSchema.methods.verify = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};
export default models.Worker || model("Worker", WorkerSchema);