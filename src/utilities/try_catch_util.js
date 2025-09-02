const tryCatchUtil = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        } catch (error) {
            return next(error);
        }
    }
}

export default tryCatchUtil