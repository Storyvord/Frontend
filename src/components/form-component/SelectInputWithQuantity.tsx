"use client";
import React, { memo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

// Define the type for the options used in the Select component
type OptionType = { value: string | number; label: string } | null;

// Define a unique identifier for each item
interface SelectedItem {
  id: string; // Unique identifier
  title: string | number; // Updated to allow both string and number
  quantity: number;
}

interface SelectableFieldsProps {
  fieldName: string; // The name of the field in the form
  options: { value: string | number; label: string }[]; // Options for the Select component
  form: UseFormReturn<any>; // The react-hook-form instance
}

// Utility to generate unique IDs
const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Component for rendering a select input with quantity controls
const SelectInputWithQuantity: React.FC<SelectableFieldsProps> = ({ fieldName, options, form }) => {
  // State to manage custom names for dynamically added items
  const [customNames, setCustomNames] = useState<{ [id: string]: string }>({});

  // Handle removing an item from the list
  const handleRemove = (id: string) => {
    const currentValue: SelectedItem[] = form.getValues(fieldName) || [];
    const updatedValue = currentValue.filter((item) => item.id !== id);
    form.setValue(fieldName, updatedValue);

    // Remove custom name entry if it exists
    if (customNames[id]) {
      const updatedCustomNames = { ...customNames };
      delete updatedCustomNames[id];
      setCustomNames(updatedCustomNames);
    }
  };

  // Render selected fields with quantity controls
  const renderSelectedFields = () => {
    const currentValues: SelectedItem[] = form.getValues(fieldName) || [];
    return currentValues.map((item: SelectedItem) => {
      // Check if the title is custom (i.e., not in the options list)
      const isCustomTitle = !options.some((option) => option.value === item.title);

      return (
        <Badge key={item.id} className="rounded-md py-1 bg-slate-900 hover:bg-slate-900">
          <FormField
            control={form.control}
            name={`${fieldName}.${currentValues.findIndex((val) => val.id === item.id)}.quantity`}
            render={({ field }) => (
              <FormItem className="flex justify-between w-full items-center gap-2">
                {/* Render input for custom titles */}
                {isCustomTitle ? (
                  <input
                    placeholder="Enter name"
                    className="font-sans font-bold w-full bg-slate-900 border-b-2 border-slate-700 focus:outline-none focus:border-slate-500 p-2 text-[0.9rem] text-white"
                    value={customNames[item.id] || String(item.title)}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setCustomNames((prev) => ({ ...prev, [item.id]: newName }));
                      // Update the title in the form state
                      const updatedItems = currentValues.map((val) =>
                        val.id === item.id ? { ...val, title: newName } : val
                      );
                      form.setValue(fieldName, updatedItems);
                    }}
                  />
                ) : (
                  <FormLabel className="font-sans font-bold text-white">
                    {String(item.title)}
                  </FormLabel>
                )}
                <FormControl>
                  <div className="flex gap-2 items-center relative -top-1">
                    {/* Button to decrease quantity */}
                    <button
                      type="button"
                      className="p-1 bg-red-800 text-white rounded hover:bg-red-700"
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity <= 0) {
                          handleRemove(item.id); // Remove item if quantity goes below 1
                        } else {
                          const updatedItems = currentValues.map((val) =>
                            val.id === item.id ? { ...val, quantity: newQuantity } : val
                          );
                          form.setValue(fieldName, updatedItems);
                        }
                      }}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <p className="text-[1rem]">{item.quantity}</p>
                    {/* Button to increase quantity */}
                    <button
                      type="button"
                      className="p-1 bg-green-800 text-white rounded hover:bg-green-700"
                      onClick={() => {
                        const newQuantity = item.quantity + 1;
                        const updatedItems = currentValues.map((val) =>
                          val.id === item.id ? { ...val, quantity: newQuantity } : val
                        );
                        form.setValue(fieldName, updatedItems);
                      }}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Badge>
      );
    });
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {/* Select component for adding new fields with quantities */}
            <Select
              {...field}
              options={[...options, { value: "Others", label: "Others" }]} // Add an "Others" option for custom entries
              placeholder={`Select required ${fieldName}...`}
              onChange={(selected: SingleValue<OptionType>) => {
                const selectedOption = selected as OptionType;
                const currentValue: SelectedItem[] = field.value || [];

                if (selectedOption) {
                  // Prevent adding duplicate standard options
                  if (
                    selectedOption.value !== "Others" &&
                    currentValue.some((item) => item.title === selectedOption.value)
                  ) {
                    // Option already selected; you might want to notify the user
                    return;
                  }

                  // Create a unique entry for "Others" to allow multiple custom entries
                  const newEntry: SelectedItem = {
                    id: generateUniqueId(),
                    title:
                      selectedOption.value === "Others"
                        ? `Others-${currentValue.length + 1}` // Make each "Others" entry unique
                        : selectedOption.value,
                    quantity: 1,
                  };

                  // Add the new entry to the form's field values
                  form.setValue(fieldName, [...currentValue, newEntry]);
                }
              }}
              onBlur={field.onBlur}
              value={null} // Ensure no selected value shows up in the select input
              isClearable
              isSearchable
              isMulti={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: "1rem",
                  borderColor: state.isFocused ? "black" : "#D1D5DB",
                  borderWidth: state.isFocused ? "2px" : "1px",
                  fontFamily: "'Poppins', sans-serif",
                  height: "3rem",
                  boxShadow: state.isFocused ? "0 0 0 2px transparent" : baseStyles.boxShadow,
                  ":hover": {
                    borderColor: "black",
                  },
                }),
              }}
            />
          </FormControl>
          {Array.isArray(field.value) && field.value.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">{renderSelectedFields()}</div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(SelectInputWithQuantity);
