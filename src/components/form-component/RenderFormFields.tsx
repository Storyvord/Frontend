"use client";
import React, { useState, Fragment, ReactNode } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectInputWithQuantity from "@/components/form-component/SelectInputWithQuantity";
import SelectInput from "@/components/form-component/SelectInput";
import CustomFileInput from "./CustomFileInput";
import PasswordInput from "./PasswordInput";
import SliderInput from "./SliderInput";
import { DatePicker } from "../ui/date-picker";
import { cn } from "@/lib/utils";

// Define the configuration for each form field, specifying the field's type, label, and other properties
export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type:
    | "text"
    | "password"
    | "number"
    | "email"
    | "textarea"
    | "checkbox"
    | "date"
    | "file"
    | "time"
    | "datetime-local"
    | "select"
    | "selectWithQuantity"
    | "slider";
  placeholder?: string;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  note?: ReactNode;
  optional?: boolean;
  isMulti?: boolean; // Only applicable for select type fields
  options?: { value: string | number; label: string }[]; // Required for select & selectWithQuantity fields
  layout?: "row" | "col";
};

// Define the props for the RenderFormFields component
type Props<TFormValues extends FieldValues> = {
  formName?: string;
  form: UseFormReturn<TFormValues>; // react-hook-form's useForm instance
  formFields: FormFieldConfig<TFormValues>[]; // Array of form field configurations
};

const RenderFormFields = <TFormValues extends FieldValues>({
  formName,
  form,
  formFields,
}: Props<TFormValues>) => {
  // State to manage the visibility of password fields
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  // Toggle function to show or hide passwords for specific fields
  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  return (
    <Fragment>
      {/* Optional form name displayed at the top */}
      {formName && <h1 className="text-center text-xl font-semibold">{formName}</h1>}
      {formFields.map((fieldConfig) => {
        const { name, type, label, placeholder, layout } = fieldConfig;
        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem
                className={cn("mt-4 font-poppins", layout === "row" && "md:grid grid-cols-4")}
              >
                {/* Form label with required indicator if field is not optional */}
                <FormLabel
                  className={cn(
                    " text-[#666666] text-base md:text-lg font-poppins-medium",
                    layout === "row" && "col-span-1"
                  )}
                >
                  {label}
                  <span className="text-red-500 ml-1 text-sm">
                    {fieldConfig?.optional ? "" : "*"}
                  </span>
                </FormLabel>
                <div className={cn("", layout === "row" && "col-start-2 col-span-4")}>
                  <FormControl>
                    <Fragment>
                      {/* Render input fields based on type */}
                      {type === "file" && (
                        <CustomFileInput
                          value={field.value}
                          onChange={field.onChange}
                          isMulti={fieldConfig.isMulti}
                        />
                      )}
                      {(type === "text" ||
                        type === "email" ||
                        type === "number" ||
                        type === "time" ||
                        type === "datetime-local") && (
                        <Input
                          type={type}
                          className=" rounded-md border-gray-300 focus:border-none h-11 font-poppins focus-visible:ring-primary lg:text-base lg:font-normal"
                          placeholder={placeholder}
                          {...field}
                          value={field.value as string} // Ensure value is a string for these input types
                          disabled={fieldConfig.disabled}
                        />
                      )}
                      {type === "date" && (
                        <DatePicker value={field.value} onChange={(date) => field.onChange(date)} />
                      )}

                      {type === "textarea" && (
                        <Textarea
                          placeholder={placeholder}
                          {...field}
                          value={field.value as string}
                          className="lg:text-base lg:font-normal font-poppins"
                          rows={5}
                        />
                      )}
                      {type === "checkbox" && (
                        <Checkbox
                          className="ml-3"
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      )}
                      {type === "select" && (
                        <SelectInput
                          control={form.control}
                          name={name}
                          options={fieldConfig.options || []}
                          isMulti={fieldConfig.isMulti}
                          placeholder={placeholder}
                        />
                      )}
                      {type === "slider" && (
                        <SliderInput
                          field={field}
                          value={field.value as number}
                          minValue={fieldConfig.minValue}
                          maxValue={fieldConfig.maxValue}
                        />
                      )}
                      {type === "selectWithQuantity" && (
                        <SelectInputWithQuantity
                          fieldName={name}
                          options={fieldConfig.options || []}
                          form={form}
                        />
                      )}
                      {type === "password" && (
                        <PasswordInput
                          name={name}
                          placeholder={placeholder}
                          value={field.value as string}
                          onChange={field.onChange}
                          disabled={fieldConfig.disabled}
                        />
                      )}
                    </Fragment>
                  </FormControl>
                </div>
                {/* Optional note for additional field instructions */}
                {fieldConfig.note && <FormDescription>{fieldConfig.note}</FormDescription>}{" "}
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </Fragment>
  );
};

export default RenderFormFields;
