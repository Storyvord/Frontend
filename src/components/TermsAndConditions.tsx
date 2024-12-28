"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import remarkGfm from "remark-gfm";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { termsAndConditions } from "@/constant/markdown/termsAndConditions";
import Tabs from "./Tabs";
import { privacyAndPolicy } from "@/constant/markdown/privacyAndPolicy";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};
const tabs = ["T&C", "Privacy & Policy"];
const TermsAndConditions = ({ openDialog, setOpenDialog }: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className="min-h-[85%] w-[90%] max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <DialogDescription className=" text-gray-800">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            {activeTab === "T&C" && (
              <Markdown remarkPlugins={[remarkGfm]}>{termsAndConditions}</Markdown>
            )}
            {activeTab === "Privacy & Policy" && (
              <Markdown remarkPlugins={[remarkGfm]}>{privacyAndPolicy}</Markdown>
            )}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
