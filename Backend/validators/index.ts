import z from "zod";

import { Question } from "../types";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be contain at least 2 character.")
    .max(255),
  surname: z
    .string()
    .min(2, "Surname must contain be at least 2 characters.")
    .max(255),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be contain at least 6 characters.")
    .max(255),
  is_admin: z.boolean(),
  department: z.enum([
    "Frontend",
    "Backend",
    "Database",
    "Fullstack",
    "DevOps",
    "Designer",
    "Educational",
    "Other",
    "Finance",
    "Law",
    "HR",
    "Sales",
    "CustomerService",
    "Production",
    "Logistics",
    "Arge",
    "Other",
  ]),
});

export const insertSurveySchema = z.object({
  id: z.string().min(1),
  owner_id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  creation_date: z.string(),
  deadline: z.string(),
  participants: z.array(z.string()),
  is_active: z.boolean(),
  questions: z.array(
    z.object({
      id: z.string().min(1),
      survey_id: z.string().min(1),
      question: z.string().min(1),
      question_type: z.string(),
      choices: z.array(z.string()),
    })
  ),
});
export const invitationSchema = z.object({
  invitedUserArr: z.array(
    z.object({
      id: z.string().min(1),
      name: z
        .string()
        .min(2, "Name must contain at least 2 characters.")
        .max(255),
      surname: z
        .string()
        .min(2, "Surname must contain at least 2 characters.")
        .max(255),
      email: z.string().email("Invalid email address."),
      password: z
        .string()
        .min(6, "Password must contain at least 6 characters.")
        .max(255),
      department: z.enum([
        "Frontend",
        "Backend",
        "Database",
        "Fullstack",
        "DevOps",
        "Designer",
        "Educational",
        "Other",
        "Finance",
        "Law",
        "HR",
        "Sales",
        "CustomerService",
        "Production",
        "Logistics",
        "Arge",
        "Other",
      ]),
    })
  ),
  survey_id: z.string().min(1),
});
