import ErrorMsgUtil from "../utilities/errorMsgUtil.js";

const notFound = (req, res, next) => {
    res.status(404).json({
        message: ErrorMsgUtil.PAGE_NOT_FOUND,
    });
};

export default notFound;