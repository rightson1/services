import db from "../../../models/db";
import Worker from "../../../models/Woker";

const hundler = async function (req, res) {
    await db();
    const { method, query } = req;

    if (method === "GET") {
        try {

            const data = await Worker.findById(query.id);

            const { password, ...others } = data._doc;

            return res.status(201).json(others);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    if (method === "PUT") {
        const data = await Worker.findByIdAndUpdate(query.id, req.body, {
            new: true,
            runValidators: true,
        });
        const { password, ...others } = data._doc;

        res.status(201).json(others);
    }
};
export default hundler;