import { z } from 'zod';

export const UserCreateValidationDTO = z.object({
    fullname: z.string().min(3, "Full name is required"),
    username: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email format"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/,
      "Password must contain at least one uppercase letter and one special character"
    ),
});

export type UserSendOtpRequestDTO = z.infer<typeof UserCreateValidationDTO>;


