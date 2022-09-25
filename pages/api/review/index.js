import { compareSync } from "bcryptjs";
import db from "../../../models/db";
import Review from "../../../models/Review";

const hundler = async function(req, res) {
    await db();
    const { method, query } = req;
    if (method === "POST") {
        try {
            const data = await Review.create(req.body);

            return res.status(200).json(data);
        } catch (e) {
            return res.status(500).json(e);
        }
    } else if (method === "GET") {
        console.log(query);
        const key = Object.keys(query)[0];

        const data = await Review.find({
            [key]: query[key],
        });

        return res.status(200).json(data);
    }
};
export default hundler;