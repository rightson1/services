import { compareSync } from "bcryptjs";
import db from "../../../models/db";
import Comment from "../../../models/Comment";

const hundler = async function(req, res) {
    await db();
    const { method, query } = req;
    if (method === "POST") {
        try {
            const data = await Comment.create(req.body);

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json(e);
        }
    } else if (method === "GET") {
        const key = Object.keys(query)[0];

        const data = await Comment.find({
            [key]: query[key],
        });

        return res.status(200).json(data);
    }
};
export default hundler;