import { string, object } from "yup";

export const registerSchema = object({
  name: string().required("Required!"),
  email: string().email("Invalid email format!").required("Required"),
  password: string()
    .required("Required!")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Must be at least 8 characters with 1 uppercase letter, and 1 number"
    ),
});
