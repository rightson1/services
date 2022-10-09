import db from "../../../models/db";
import Order from "../../../models/Order";

const hundler = async function(req, res) {
    db();
    const { method, query } = req;

    if (method === "GET") {
        try {
            const data = await Order.findById(query.id);

            return res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    if (method === "PUT") {
        try {
            const data = await Order.findByIdAndUpdate(query.id, req.body, {
                new: true,
                runValidators: true,
            });

            res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    if (method === "PATCH") {
        try {
            const data = await Order.find({ type: query.id });
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    if (method === "DELETE") {
        try {
            const data = await Order.find({ userId: query.id });
            res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
};

export default hundler;