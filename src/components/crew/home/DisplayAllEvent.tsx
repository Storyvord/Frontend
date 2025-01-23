"use client";
import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Loader from "@/components/Loader";
import { CalendarEvent } from "./CrewHomeCalendar";

type Props = {
  events: CalendarEvent[];
  isPending: boolean;
  isError: boolean;
};

const DisplayAllEvent = ({ events, isPending, isError }: Props) => {
  const sortedEvents = useMemo(() => {
    const now = new Date().getTime(); // Current date in milliseconds
    return events.sort(
      (a, b) =>
        Math.abs(new Date(a.start).getTime() - now) - Math.abs(new Date(b.start).getTime() - now)
    );
  }, [events]);
  return (
    <div className="border bg-white rounded-3xl h-full p-4 w-full">
      <div className="sticky top-0 bg-white z-10 px-4 rounded-t-3xl">
        <h3 className="font-poppins-semibold text-lg">Up next</h3>
      </div>
      {/* Scrollable section */}
      <section className="overflow-y-auto max-h-96 p-2 space-y-4">
        {isPending && (
          <div className="grid place-content-center">
            <Loader />
          </div>
        )}
        {isError && <p className="text-center my-1 text-red-500">Error loading data.</p>}
        {sortedEvents?.map((event) => {
          const colors = ["red", "green", "yellow", "gray"];
          const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
          return (
            <div key={event.id} className={`border-l-4 border-${getRandomColor()}-500 pl-3`}>
              <h4 className="font-poppins-medium">{event.title}</h4>
              <p className="text-sm text-gray-600">
                {" "}
                {format(new Date(event.start), "dd MMM yyyy, hh:mm a")}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DisplayAllEvent;
