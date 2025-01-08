"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalendarIcon from "@/assets/calendar.svg";
import Image from "next/image";

interface DatePickerProps {
  onChange: (date: string | undefined) => void; // Change type to string for backend compatibility
  value?: string; // Accept date in string format from backend
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined // Convert string to Date object for internal handling
  );
  const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDate(value ? new Date(value) : undefined);
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onChange(format(selectedDate, "yyyy-MM-dd")); // Format date for backend
    } else {
      onChange(undefined);
    }

    // Close the popover once a date is selected
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full mt-1 h-14 rounded-xl justify-between font-poppins font-normal text-[#333333] text-base border-[#66666659] hover:bg-[transparent]",
            !date && "text-muted-foreground"
          )}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)} // Toggle popover visibility
        >
          {date ? (
            format(date, "dd/MM/yyyy")
          ) : (
            <span className="font-poppins font-normal text-[#666666] text-base">DD/MM/YYYY</span>
          )}
          <Image src={CalendarIcon} alt="calendar-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
