import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatISOToCustomString } from "@/lib/stringToDate";
import { extendedSurvey } from "@/pages/Profile";

type Props = { survey: extendedSurvey };

const ParticipatedCard = ({ survey }: Props) => {
  console.log(survey.creation_date);
  const { datePart: creationDatePart } = formatISOToCustomString(
    survey.creation_date.toString(),
  );
  const { datePart: deadLineDatePart } = formatISOToCustomString(
    survey.deadline.toString(),
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{survey.title}</CardTitle>
        <CardDescription>{survey.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{`Oluşturulma tarihi: ${creationDatePart} `}</p>
        <p>{`Bitiş Tarihi: ${deadLineDatePart}`}</p>
      </CardContent>
      <CardFooter>
        <p>{`Katılımcı Sayısı: ${survey.participants.length}`}</p>
      </CardFooter>
    </Card>
  );
};

export default ParticipatedCard;
