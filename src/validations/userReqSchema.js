import Joi from "joi";

const userCreateSchema = Joi.object({
  full_name: Joi.string().min(2).max(255).trim().default(""),
  email: Joi.string().email().required(),
  dob: Joi.date().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
})
  .required()
  .with("password", "repeat_password");

const userCreateValidation = (req, res, next) => {
    const result = userCreateSchema.validate(req.body);
    if (result.error) {
        return res.status(400).json({
            error: "Us"
        });
    }
};

export default userCreateValidation;
