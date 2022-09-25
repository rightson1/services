import db from "../../../models/db";
import Worker from "../../../models/Woker";
import cookie from "cookie";
const hundler = async function(req, res) {
    await db();

    const { method, query } = req;
    if (method === "POST") {
        const email = await Worker.findOne({ email: req.body.email });

        if (email) {
            return res.status(200).json("Email alredy exists");
        }
        const list = await Worker.find();
        const name = `user-00${list.length}`;
        req.body.name = name;
        let user = await Worker.create(req.body);
        const { password, ...others } = user._doc;
        return res.status(201).json(others);
    } else if (method === "GET") {
        const data = await Worker.find();

        return res.status(200).json(data);
    } else if (method === "PATCH") {
        const user = await Worker.findOne({ username: req.body.username });
        if (!user) {
            return res.status(200).json("User does not exist");
        }
        const verify = await user.verify(req.body.password);

        if (!verify) {
            return res.status(200).json("Wrong password");
        }
        const { password, ...others } = user._doc;
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.cookie, {
                maxAge: 3600,
                sameSite: "strict",
                path: "/",
            })
        );
        return res.status(201).json(others);
    }
};
export default hundler;