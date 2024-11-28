"use client";

import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { BsTrash } from "react-icons/bs";

import { projectFormSchema } from "@/lib/validation";
import { useCreateProject } from "@/lib/react-query/queriesAndMutations/project";
import { convertToBase64 } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import RenderFormFields, { FormFieldConfig } from "@/components/form-component/RenderFormFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";
import {
  defaultValues,
  CreateProjectFields as formFields,
} from "@/constant/formFields/createProject";

export type ProjectFormFieldType = z.infer<typeof projectFormSchema>;

type Props = {
  isEdit?: boolean;
  projectDetails?: ProjectFormFieldType;
  handleEditProject?: (projectData: any) => void;
  isLoadingEditProject?: boolean;
  isErrorEditProject?: boolean;
  prevStep?: () => void;
  handleSkipOnBoard?: () => void;
};
const CreateProjectForm = ({
  isEdit,
  projectDetails,
  handleEditProject,
  isLoadingEditProject,
  isErrorEditProject,
  prevStep,
  handleSkipOnBoard,
}: Props) => {
  const { toast } = useToast();
  const form = useForm<ProjectFormFieldType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  // useEffect to reset form values when data changes
  useEffect(() => {
    if (isEdit) {
      form.reset(projectDetails);
    }
  }, [isEdit, form, projectDetails]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "locationDetails",
  });

  const {
    mutateAsync: createProjectMutation,
    isPending: isLoadingCreateProject,
    isError: isErrorCreateProject,
    error,
  } = useCreateProject();
  const router = useRouter();

  const onSubmit = async (formData: ProjectFormFieldType) => {
    const {
      locationDetails,
      crew,
      equipment,
      projectName,
      description,
      uploadedDocument,
      budget,
      contentType,
    } = formData;

    const base64Documents = uploadedDocument?.map(async (item) => {
      const base64 = await convertToBase64(item);
      return { document: base64 };
    });
    const documents = await Promise.all(base64Documents || []);

    const transformedFormData = {
      project_details: {
        name: projectName,
        content_type: contentType,
        brief: description,
        additional_details: description,
      },
      project_requirement: {
        budget_currency: "$",
        budget: budget,
        crew_requirements: crew,
        equipment_requirements: equipment,
      },
      shooting_details: locationDetails,
    };
    if (isEdit && handleEditProject) {
      handleEditProject(transformedFormData);
    } else {
      try {
        const project = await createProjectMutation(transformedFormData);
        if (project) {
          toast({ title: "Project has been successfully created" });
          if (prevStep) {
            router.push("/dashboard");
          } else {
            router.push(`/project-details/${project.data.project.project_id}`);
          }
        }
      } catch (e) {
        toast({ title: "Failed to create Project", variant: "destructive" });
      }
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-center md:mt-1 md:mb-6 sm:text-3xl text-xl font-semibold">
        {isEdit ? `Edit (${projectDetails?.projectName}) Project` : "Create a new Project"}
      </h1>
      <div className="w-full space-y-8 mx-auto max-w-[800px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col"
          >
            <RenderFormFields form={form} formFields={formFields.slice(0, 8)} />

            {/* Render locationDetails fields dynamically */}
            <h3 className=" text-center font-semibold text-xl underline">Location Details</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="border px-6 py-2 rounded-md mb-4 relative">
                <RenderFormFields
                  form={form}
                  formFields={formFields.slice(8, 13).map((fieldConfig) => ({
                    ...fieldConfig,
                    name: `locationDetails.${index}.${fieldConfig.name.split(".")[2]}` as keyof ProjectFormFieldType,
                  }))}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="absolute right-2 top-1 text-red-700 hover:text-red-500 mt-2"
                    onClick={() => remove(index)}
                  >
                    <BsTrash className=" w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full mt-2 border-green-600"
              onClick={() =>
                append({
                  location: "",
                  start_date: "",
                  end_date: "",
                  permits: false,
                  mode_of_shooting: "both",
                })
              }
            >
              Add Location
            </Button>

            {(isErrorCreateProject || isErrorEditProject) && (
              <p className="text-center text-sm text-red-600 font-semibold">
                Failed to submit your form <br />
              </p>
            )}

            {isEdit ? (
              <Button type="submit" disabled={isLoadingEditProject} className="w-full">
                {isLoadingEditProject ? <Loader /> : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={isLoadingCreateProject} className="w-full">
                {isLoadingCreateProject ? <Loader /> : "Submit"}
              </Button>
            )}
          </form>
        </Form>
        {prevStep && handleSkipOnBoard && (
          <div className=" flex justify-between">
            <Button variant="outline" disabled={isLoadingEditProject} onClick={() => prevStep()}>
              Back
            </Button>
            <Button
              variant="outline"
              disabled={isLoadingEditProject}
              onClick={() => handleSkipOnBoard()}
            >
              Skip
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateProjectForm;
