import React from "react";
import Select, { MultiValue } from "react-select";
import { Control, Controller } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";

type Option = { value: string | number; label: string };

type MultiSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
};

const SelectInput = <T extends FieldValues>({
  control,
  name,
  options,
  isMulti = false,
  placeholder,
}: MultiSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          options={options}
          isMulti={isMulti}
          onChange={(selectedOption) => {
            field.onChange(
              isMulti
                ? Array.isArray(selectedOption)
                  ? (selectedOption as MultiValue<Option>).map((option) => option.value)
                  : [] // Handle no options selected
                : (selectedOption as Option)?.value || "" // Single select value
            );
          }}
          value={
            isMulti
              ? options.filter((option) =>
                  (field.value as (string | number)[]).includes(option.value)
                )
              : options.find((option) => option.value === field.value) || null
          }
          placeholder={placeholder}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "0.4rem",
              borderColor: state.isFocused ? "black" : "#D1D5DB",
              borderWidth: state.isFocused ? "2px" : "1px",
              fontFamily: "'Poppins', sans-serif",
              minHeight: "2.8rem",
              boxShadow: state.isFocused ? "0 0 0 2px transparent" : baseStyles.boxShadow,
              ":hover": {
                borderColor: "black",
              },
            }),
          }}
        />
      )}
    />
  );
};

export default SelectInput;
