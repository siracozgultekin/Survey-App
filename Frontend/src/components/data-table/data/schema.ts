import z from "zod";

export const mySurveySchema = z.object({
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
  deadline: z.string(),
  status: z.enum(["active", "closed"]),
});

export type DataTableSurvey = z.infer<typeof mySurveySchema>;
export type DataTableParticipatedSurvey = z.infer<
  typeof participatedSurveySchema
>;
