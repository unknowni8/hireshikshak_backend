import tryCatchUtil from "../../utilities/try_catch_util.js";

export const getUser = tryCatchUtil(async (req, res) => {
    const { id } = req.params;
    return res.send({ data: 'users' });
});

