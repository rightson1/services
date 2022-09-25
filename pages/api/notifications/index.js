import db from "../../../models/db";
import Notification from "../../../models/Notification";
import Worker from "../../../models/Woker";
import User from "../../../models/User";

const hundler = async function(req, res) {
    db();
    const { method, query } = req;
    if (method === "POST") {
        let data = await Notification.find({ to: req.body.id });
        data = data.filter(({ sender }) => sender !== req.body.id);

        const users = await Promise.all(
            data.map(({ sender }) => {
                return Worker.findById(sender);
            })
        );

        res.status(200).json({ data, users });
    } else if (method === "PATCH") {
        let data = await Notification.find({ to: req.body.id });
        data = data.filter(({ sender }) => sender !== req.body.id);

        const users = await Promise.all(
            data.map(({ sender }) => {
                return User.findById(sender);
            })
        );

        res.status(200).json({ data, users });
    } else if (method === "PUT") {} else if (method === "PATCH") {}
};
export default hundler;