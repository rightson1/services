import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const str = {
    type: String,
    required: true,
};
const UserSchema = new Schema({
    username: str,
    password: str,
    email: str,
    name: str,
    pic: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    worker: {
        type: Boolean,
        default: false,
    },
    area: str,
    likes: {
        type: Array,
        default: [],
    },
    dislikes: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
UserSchema.methods.verify = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};
export default models.User || model("User", UserSchema);