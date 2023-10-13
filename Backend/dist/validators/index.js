"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, "Name must be contain at least 2 character.")
        .max(255),
    surname: zod_1.default
        .string()
        .min(2, "Surname must contain be at least 2 characters.")
        .max(255),
    email: zod_1.default.string().email("Invalid email address."),
    password: zod_1.default
        .string()
        .min(6, "Password must be contain at least 6 characters.")
        .max(255),
});
