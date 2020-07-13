import React from "react";
import classnames from "classnames";

interface InputInterface {
  name: string;
  value: string;
  onChange(e: any): any;
  placeholder?: string;
  error?: any;
  icon: string;
  type?: string;
}

export default function Input({
  name,
  placeholder,
  value,
  error,
  onChange,
  icon,
  type,
}: InputInterface) {
  const baseClasses = "form-control form-control-lg";
  const isInvalid = classnames(baseClasses, {
    "is-invalid": error,
  });

  if (!type) type = "text";

  return (
    <div className="form-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input
        className={isInvalid}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
