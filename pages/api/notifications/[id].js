import db from "../../../models/db";
import Notification from "../../../models/Notification";

const hundler = async function(req, res) {
    db();
    const { method, query } = req;

    if (method === "GET") {
        try {
            const data = await Notification.findById(query.id);

            return res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    if (method === "POST") {
        try {
            console.log(req.query.id);
            const data = await Notification.find({ to: req.query.id });

            data = data.filter(({ sender }) => sender !== req.query.id);

            const users = await Promise.all(
                data.map(({ sender }) => {
                    return Worker.findById(sender);
                })
            );

            res.status(200).json({ data, users });
            return res.status(201).json(data);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //   if (method === "PUT") {
    //     try {
    //       const data = await Order.findByIdAndUpdate(query.id, req.body, {
    //         new: true,
    //         runValidators: true,
    //       });

    //       res.status(201).json(data);
    //     } catch (e) {
    //       res.status(500).json(e);
    //     }
    //   }
    //   if (method === "PATCH") {
    //     try {
    //       const data = await Order.find({ type: query.id });
    //       res.status(201).json(data);
    //     } catch (e) {
    //       res.status(500).json(e);
    //     }
    //   }
};

export default hundler;