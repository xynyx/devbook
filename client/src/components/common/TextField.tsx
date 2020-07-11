import React from "react";
import classnames from "classnames";

interface TextFieldInterface {
  name: string;
  value: string;
  onChange(): any;
  type: string;
  placeholder?: string;
  label?: string;
  error?: any;
  info?: string;
  disabled?: boolean;
}

export default function TextFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}: TextFieldInterface) {
  const baseClasses = "form-control form-control-lg";
  const isInvalid = classnames(baseClasses, {
    "is-invalid": error,
  });

  if (!type) type = "text";

  return (
    <div className="form-group">
      <input
        type={type}
        className={isInvalid}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted"></small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
