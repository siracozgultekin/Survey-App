import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSurveyWithInvitation } from "@/components/data-table/data/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyWithInvitationColumn } from "@/components/data-table/columns";
import axios from "axios";
import Cookies from "js-cookie";

const Inbox = () => {
  const token = Cookies.get("token");
  const [surveysExtended, setSurveyExtended] = useState<
    DataTableSurveyWithInvitation[]
  >([]);
  useEffect(() => {
    const FetchSurveys = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/invitation/get-invitations-table",
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        setSurveyExtended(response.data as DataTableSurveyWithInvitation[]);
      } catch (err) {
        console.log(err);
      }
    };

    FetchSurveys();
  }, []);

  return (
    <div className="container py-10">
      <Tabs defaultValue="invitationList" className="">
        <TabsList className="mx-0 w-fit  px-0">
          <TabsTrigger value="invitationList" className="text-lg">
            Davetler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invitationList">
          <DataTable
            columns={SurveyWithInvitationColumn}
            data={surveysExtended}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inbox;
