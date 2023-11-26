import { InputHTMLAttributes } from "react";

export const FormInput = (
  props: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    label?: string;
    helpText?: string;
    errorText?: string;
    isError?: boolean;
    multiLines?: boolean;
  }
) => {
  const {
    label,
    helpText,
    errorText,
    className,
    isError,
    multiLines,
    ...otherProps
  } = props;
  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      {multiLines ? (
        <textarea
          rows={10}
          className={`border-2 rounded-lg text-lg ${
            isError ? "border-error" : "border-primary"
          } ${className ? " " + className : ""}`}
          {...otherProps}
        />
      ) : (
        <input
          className={`border-2 rounded-lg text-lg ${
            isError ? "border-error" : "border-primary"
          } ${className ? " " + className : ""}`}
          {...otherProps}
        />
      )}
      {isError && errorText && (
        <div className="text-sm text-error">{errorText}</div>
      )}
    </div>
  );
};
