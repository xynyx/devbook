import React from "react";
import classnames from "classnames";

interface SelectListInterface {
  name: string;
  value: string;
  onChange(e: any): any;
  error?: any;
  info?: string;
  options: any[];
  placeholder: string;
}

export default function SelectList({
  name,
  value,
  error,
  onChange,
  options,
  placeholder,
  info,
}: SelectListInterface) {
  const baseClasses = "form-control form-control-lg";
  const isInvalid = classnames(baseClasses, {
    "is-invalid": error,
  });

  console.log("options :>> ", options);

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.label}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        placeholder={placeholder}
        className={isInvalid}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
