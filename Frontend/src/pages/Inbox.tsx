import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import {
  DataTableInvitation,
  DataTableSurveyWithInvitation,
} from "@/components/data-table/data/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SurveyWithInvitationColumn } from "@/components/data-table/columns";
import axios from "axios";

import Cookies from "js-cookie";

const Inbox = () => {
  const token = Cookies.get("token");
  const [invitations, setInvitations] = useState<DataTableInvitation[]>([]);
  const [surveysExtended, setSurveyExtended] = useState<
    DataTableSurveyWithInvitation[]
  >([]);
  useEffect(() => {
    const FetchInvitations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/invitations", {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log("res.data=> ", res.data);
        setInvitations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    FetchInvitations();
  }, []); // Bu useEffect sadece bir kez çalışacak, bağımlılık olmadığı için sadece ilk renderda çalışır.

  useEffect(() => {
    const FetchSurveys = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/surveysbyinvitation/",
          {
            invitations: invitations,
          },
        );
        console.log("surveyExtended=> ", response.data);
        setSurveyExtended(response.data as DataTableSurveyWithInvitation[]);
      } catch (err) {
        console.log(err);
      }
    };

    if (invitations.length > 0) {
      // invitations değiştiğinde FetchSurveys çalışacak
      FetchSurveys();
    }
  }, [invitations]);

  return (
    <div className="container py-10">
      <Tabs defaultValue="invitationList" className="">
        <TabsList>
          <TabsTrigger value="invitationList" className="text-lg">
            Katıldığım Anketler
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
