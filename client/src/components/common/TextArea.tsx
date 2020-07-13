import React from "react";
import classnames from "classnames";

interface TextAreaInterface {
  name: string;
  value: string;
  onChange(e: any): any;
  placeholder?: string;
  error?: any;
  info?: string;
}

export default function TextArea({
  name,
  placeholder,
  value,
  error,
  onChange,
  info
}: TextAreaInterface) {
  const baseClasses = "form-control form-control-lg";
  const isInvalid = classnames(baseClasses, {
    "is-invalid": error,
  });


  return (
    <div className="form-group">
      <textarea
        className={isInvalid}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
