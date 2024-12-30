"use client";
import React, { useState } from "react";
import { Form } from "./ui/form";
import RenderFormFields, { FormFieldConfig } from "./form-component/RenderFormFields";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import Loader from "./Loader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "./ui/use-toast";

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string(),
});

export type FormType = z.infer<typeof FormSchema>;

export const formFields: FormFieldConfig<FormType>[] = [
  { name: "name", type: "text", placeholder: "Enter your name", label: "Name" },
  { name: "email", type: "email", placeholder: "Enter your email", label: "Email" },
  {
    name: "message",
    type: "textarea",
    placeholder: "Message...",
    label: "Message",
    optional: true,
  },
];

const ContactForm = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormType) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpenDialog(false);
      toast({
        title: "Thank you for contacting us!",
        description: "We will get back to you soon.",
      });
    }, 1000); // Simulate 1-second delay
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className="lg:w-[800px] w-[95%] z-[999]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col lg:px-4"
          >
            <RenderFormFields form={form} formFields={formFields} />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
