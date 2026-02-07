import * as yup from "yup";
import { userFormConfig } from "../config/userFormConfig";
import type { User } from "../types/user";

export const buildUserSchema = (): yup.ObjectSchema<User> => {
  const shape: Record<string, yup.AnySchema> = {};

  userFormConfig.forEach((field) => {
    let validator: yup.AnySchema;

    switch (field.input) {
      case "text":
      case "textArea":
      case "password":
        validator = yup.string();
        break;

      case "email":
        validator = yup.string().email("Invalid email address");
        break;

      case "number":
        validator = yup
          .string()
          .matches(/^[0-9]+$/, "Must contain digits only");
        break;

      case "checkbox":
        validator = yup.boolean();
        break;

      case "radio":
        validator = yup.string();
        break;

      case "date":
        validator = yup.string();
        break;

      default:
        validator = yup.mixed();
    }

    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }

    shape[field.name] = validator;
  });

  // ✅ REQUIRED for dynamic Yup schemas (Yup v1)
  return yup.object(shape) as unknown as yup.ObjectSchema<User>;
};