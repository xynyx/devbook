import React from "react";
import classnames from "classnames";

interface SelectListInterface {
  name: string;
  value: string;
  onChange(e: any): any;
  error?: any;
  info?: string;
  options?: any[];
}

export default function SelectList({
  name,
  value,
  error,
  onChange,
  options,
  info,
}: SelectListInterface) {
  const baseClasses = "form-control form-control-lg";
  const isInvalid = classnames(baseClasses, {
    "is-invalid": error,
  });

  const selectOptions = options?.map(option => (
    <option key={option.label} value={option.value}></option>
  ));

  return (
    <div className="form-group">
      <select
        className={isInvalid}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted"></small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
