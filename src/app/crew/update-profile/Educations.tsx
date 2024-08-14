"use client";
import CustomForm from "@/components/crew/CustomForm";
import { DynamicForm } from "@/components/crew/DynamicForm";
import { educationFormValidationSchema } from "@/lib/validation/crew";
import { EducationFormType, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const educationFormFields: FormFieldConfig<{ educations: EducationFormType[] }>[] = [
  {
    name: "educations.0.academicQualifications",
    label: "Academic Qualifications",
    type: "text",
    placeholder: " Enter your academic qualification",
  },
  {
    name: "educations.0.professionalCourses",
    label: "Professional Courses",
    type: "text",
    placeholder: " Enter your professional courses",
  },
  {
    name: "educations.0.workshopsAttended",
    label: "Workshops Attended",
    type: "text",
    placeholder: " Enter your workshops attended",
  },
];

const educationsDefaultValue: EducationFormType = {
  academicQualifications: "",
  professionalCourses: "",
  workshopsAttended: "",
};

const Educations = () => {
  const form = useForm({
    resolver: zodResolver(educationFormValidationSchema),
    defaultValues: {
      educations: [educationsDefaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });
  const onSubmit = (data: { educations: EducationFormType[] }) => {
    console.log(data);
  };
  return (
    <>
      <h1 className=" text-lg sm:text-xl text-center text-gray-800 font-semibold">
        Educational Details
      </h1>
      <DynamicForm
        form={form}
        formFields={educationFormFields}
        onSubmit={onSubmit}
        append={() => append(educationsDefaultValue)}
        remove={remove}
        fields={fields}
        isLoading={false}
        formName="educations"
      />
    </>
  );
};

export default Educations;
