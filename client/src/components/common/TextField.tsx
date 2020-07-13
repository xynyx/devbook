import React from "react";
import classnames from "classnames";

interface TextFieldInterface {
  name: string;
  value: string;
  onChange(e: any): any;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: any;
  disabled?: boolean;
  info?: string;
}

export default function TextField({
  name,
  info,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
}: TextFieldInterface) {

  console.log('info :>> ', info);
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
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
