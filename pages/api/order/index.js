import db from "../../../models/db";
import Order from "../../../models/Order";
import Notification from "../../../models/Notification";

const hundler = async function(req, res) {
    db();
    const { method, query } = req;
    if (method === "POST") {
        try {
            const data = await Order.create(req.body);

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    } else if (method === "GET") {
        const data = await Order.find();
        return res.status(200).json(data);
    } else if (method === "PUT") {
        const key = Object.keys(query)[0];

        const data = await Order.find({
            [key]: query[key],
        });

        return res.status(200).json(data);
    } else if (method === "PATCH") {
        const key = Object.keys(query)[0];

        try {
            // const data = await Order.findOneAndUpdate({
            //     userId: query[key],
            // }, { $push: { applicants: req.body } }, {
            //     new: true,
            //     runValidators: true,
            // });
            const data = await Notification.create(req.body);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
};
export default hundler;