import { Survey } from "@/interfaces";
import z from "zod";

export const mySurveySchema = z.object({
  id: z.string(),
  creation_date: z.string(),
  title: z.string(),
  deadline: z.string(),
  status: z.enum(["active", "closed"]),
  numberOfParticipants: z.number(),
});

export const mySurveySchemaX = z.object({
  id: z.string(),
  creation_date: z.string(),
  title: z.string(),
  deadline: z.string(),
  status: z.enum(["active", "closed"]),
  numberOfParticipants: z.number(),
});

export const participatedSurveySchema = z.object({
  id: z.string(),
  title: z.string(),
  owner_name: z.string(),
  creation_date: z.string(),
  deadline: z.string(),
  status: z.enum(["active", "closed"]),
});

export const invitationSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  survey_id: z.string(),
  state: z.boolean(),
});

export const surveyWithInvitationSchema = z.object({
  survey: mySurveySchema,
  nameSurname: z.string(),

  invitation_id: z.string(),
  state: z.boolean(),
});

export type DataTableInvitation = z.infer<typeof invitationSchema>;
export type DataTableSurvey = z.infer<typeof mySurveySchema>;
export type DataTableParticipatedSurvey = z.infer<
  typeof participatedSurveySchema
>;
export type DataTableSurveyWithInvitation = z.infer<
  typeof surveyWithInvitationSchema
>;
