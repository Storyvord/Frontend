"use client";
import { Button } from "@/components/ui/button";
import CompanyCalender from "@/components/user-dashboard/dashboard/calendar/CompanyCalendar";
import { useGetOnBoardedEmployeeList } from "@/lib/react-query/queriesAndMutations/company/employee";
import { useGetCompanySettings } from "@/lib/react-query/queriesAndMutations/company/settings";
import React, { useState } from "react";

const CompanyCalendarPage = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const { data: companyProfile } = useGetCompanySettings();
  const { data: employeeListData } = useGetOnBoardedEmployeeList(companyProfile?.data?.id);

  const employeeList = employeeListData?.data.map((crew: { id: string; user_email: string }) => ({
    value: crew.id,
    label: crew.user_email,
  }));

  return (
    <div className=" pt-4 bg-white px-1 md:px-4">
      <Button
        onClick={() => setOpenFormDialog(true)}
        className=" uppercase bg-green-500 hover:bg-green-700 font-bold mb-4"
      >
        Add New Event
      </Button>
      <CompanyCalender
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        calendarType="month"
        employeeList={employeeList}
      />
    </div>
  );
};

export default CompanyCalendarPage;
