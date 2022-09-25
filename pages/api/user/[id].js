import db from "../../../models/db";
import User from "../../../models/User";

const hundler = async function(req, res) {
    db();
    const { method, query } = req;
    if (method === "GET") {
        try {
            const data = await User.findById(query.id);
            const { password, ...others } = data._doc;

            return res.status(201).json(others);
        } catch (e) {
            res.status(500).json(e);
        }
    } else if (method === "PUT") {
        const data = await User.findByIdAndUpdate(query.id, req.body, {
            new: true,
            runValidators: true,
        });
        const { password, ...others } = data._doc;

        return res.status(201).json(others);
    } else if (method === "PATCH") {
        const userId = query.id;
        const reviewId = req.body.id;
        const user = await User.findById(query.id);

        if (req.body.type == "dislike") {
            if (user.likes.includes(reviewId)) {
                const data = await User.findByIdAndUpdate(
                    query.id, { $pull: { likes: req.body.id } }, {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            if (user.dislikes.includes(reviewId)) {
                const data = await User.findByIdAndUpdate(
                    query.id, { $pull: { dislikes: req.body.id } }, {
                        new: true,
                        runValidators: true,
                    }
                );
                return res.status(200).json(data);
            } else {
                const data = await User.findByIdAndUpdate(
                    query.id, { $push: { dislikes: req.body.id } }, {
                        new: true,
                        runValidators: true,
                    }
                );

                return res.status(200).json(data);
            }
        } else {
            if (user.dislikes.includes(reviewId)) {
                const data = await User.findByIdAndUpdate(
                    query.id, { $pull: { dislikes: req.body.id } }, {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            if (user.likes.includes(reviewId)) {
                const data = await User.findByIdAndUpdate(
                    query.id, { $pull: { likes: req.body.id } }, {
                        new: true,
                        runValidators: true,
                    }
                );
                return res.status(200).json(data);
            } else {
                const data = await User.findByIdAndUpdate(
                    query.id, { $push: { likes: req.body.id } }, {
                        new: true,
                        runValidators: true,
                    }
                );

                return res.status(200).json(data);
            }
        }
    }
};
export default hundler;