import type { InputHTMLAttributes } from "react";
import type { User } from "../types/user";

export interface UserFormField {
    input: string;
    name: keyof User;
    label: string;
    type?: string;
    required: boolean;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    options?: { label: string; value: string }[]; // for radio buttons or select dropdowns
}

export const userFormConfig: UserFormField[] = [
    {
        input: "text",
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
    },
    {
        input: "text",
        name: "lastName",
        label: "Last Name",
        type: "text",
        required: true,
    },
    {
        input: "number",
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        inputProps: {
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 10,
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                    !/[0-9]/.test(e.key) &&
                    ![
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                    ].includes(e.key)
                ) {
                    e.preventDefault();
                }
            },
        }
    },
    {
        input: "text",
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
    },
    // future fields can be added here with different input types like date, checkbox, radio, etc.
];