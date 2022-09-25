import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const NotificationSchema = new Schema({
        // client: String,
        // worker: String,
        sender: String,
        to: String,
        text: String,
        phone: String,
        wage: String,
        read: {
            type: Boolean,
            edefault: false,
        },
        type: str,
        jobId: String,
    },

    { timestamps: true }
);

export default models.Notification || model("Notification", NotificationSchema);