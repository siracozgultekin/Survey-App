import { useEffect, useState } from "react";

import { Survey } from "@/interfaces";
import { DataTable } from "@/components/data-table/data-table";
import {
  DataTableSurvey,
  DataTableParticipatedSurvey,
} from "@/components/data-table/data/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  mySurveyColumns,
  participatedSurveyColumns,
} from "@/components/data-table/columns";
import axios from "axios";

import Cookies from "js-cookie";

export interface extendedSurvey extends Survey {
  owner: {
    name: string;
    surname: string;
  };
}

const Surveys = () => {
  const token = Cookies.get("token");
  const [surveys, setSurveys] = useState<{
    mySurvey: DataTableSurvey[];
    participatedSurvey: DataTableParticipatedSurvey[];
  }>({ mySurvey: [], participatedSurvey: [] });

  useEffect(() => {
    const fetchData = async () => {
      const responseMysurvey = await axios.get(
        "http://localhost:5000/tablemysurvey",
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      setSurveys(
        (prevState) =>
          ({
            ...prevState,
            mySurvey: responseMysurvey.data,
          }) as {
            mySurvey: DataTableSurvey[];
            participatedSurvey: DataTableParticipatedSurvey[];
          },
      );

      const responseParticipatedSurvey = await axios.get(
        "http://localhost:5000/tableparticipatedsurvey",
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      setSurveys(
        (prevState) =>
          ({
            ...prevState,
            participatedSurvey: responseParticipatedSurvey.data,
          }) as {
            mySurvey: DataTableSurvey[];
            participatedSurvey: DataTableParticipatedSurvey[];
          },
      );
      // Update participatedSurveys state
    };
    fetchData();
  }, []);

  return (
    <div className="container py-10">
      <Tabs defaultValue="mySurveys" className="">
        <TabsList>
          <TabsTrigger value="mySurveys" className="text-lg">
            Anketlerim
          </TabsTrigger>
          <TabsTrigger value="participatedSurveys" className="text-lg">
            Katıldığım Anketler
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mySurveys">
          <DataTable columns={mySurveyColumns} data={surveys.mySurvey} />
        </TabsContent>
        <TabsContent value="participatedSurveys">
          <DataTable
            columns={participatedSurveyColumns}
            data={surveys.participatedSurvey}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Surveys;
