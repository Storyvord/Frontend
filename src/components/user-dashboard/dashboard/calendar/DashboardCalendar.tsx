import React, { useState } from "react";
import Image from "next/image";
import { addDays } from "date-fns";

import CompanyCalendar from "./CompanyCalendar";
import DatePickerWithRange from "./DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Props = {
  employeeList: { value: number; label: string }[];
  height: string;
};

const DashboardCalendar = ({ employeeList, height }: Props) => {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const t = useTranslations("Dashboard");

  const [selectedRange, setSelectedRange] = useState<any | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Keep track of the current date

  const handleSelectRange = (range: any | undefined) => {
    setSelectedRange(range);
    if (range?.from) {
      setCurrentDate(range.from as Date); // Navigate to the start of the selected week
    }
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date); // Update the current date
  };

  return (
    <div className="rounded-3xl md:col-span-4 md:col-start-3">
      <header className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <Image width={27} height={27} src="/icons/calendar.svg" alt="Calendar Icon" />
          <h1 className="text-lg md:text-xl"> {t("my-schedule")}</h1>
        </span>
        <Button
          onClick={() => setOpenFormDialog(true)}
          className="flex gap-2 bg-transparent border-gray-500 rounded-sm h-10"
          variant="outline"
          size="sm"
        >
          <Image width={20} height={20} src="/icons/plus.svg" alt="Add Icon" /> {t("button.event")}
        </Button>
      </header>
      <main className="flex xl:flex-row flex-col md:items-start gap-3 mt-4">
        <div className="md:px-4 py-2 rounded-3xl flex-1 border bg-white w-full">
          <CompanyCalendar
            openFormDialog={openFormDialog}
            setOpenFormDialog={setOpenFormDialog}
            handleNavigate={handleNavigate}
            currentDate={currentDate}
            calendarType="week"
            employeeList={employeeList}
            height={height}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardCalendar;
