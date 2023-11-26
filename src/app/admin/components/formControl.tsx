import { InputHTMLAttributes } from "react";
import CrossIcon from "public/svg/close.svg";
import { ChangeEvent, useState } from "react";

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
      {label && <label className="font-bold">{label}</label>}
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

type ListInputProps = {
  values: string[];
  placeholder?: string;
  onChange?: (values: string[]) => void;
  onChangeInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export const ListInput = (props: ListInputProps) => {
  const [newValue, setNewValue] = useState("");
  const [composing, setComposing] = useState(false);
  const startComposition = () => setComposing(true);
  const endComposition = () => setComposing(false);
  return (
    <div className="flex flex-col">
      {props.label && <label className="font-bold">{props.label}</label>}
      {props.values.map((item, index) => (
        <div
          key={index}
          className="group relative m-2 flex h-8 rounded-lg p-1 px-7 hover:bg-slate-200"
        >
          <div className="h-6 opacity-80 group-hover:opacity-90">{item}</div>
          <span
            className="absolute inset-y-auto right-1 top-1 cursor-pointer text-danger opacity-0 group-hover:opacity-100"
            onClick={() => {
              props.onChange?.(props.values.filter((_, idx) => idx !== index));
            }}
          >
            <CrossIcon className="w-6 h-6" />
          </span>
        </div>
      ))}
      <div className="flex gap-0 m-2">
        <input
          className="h-8 rounded-l-full border border-slate-400 bg-white px-3 grow"
          placeholder={props.placeholder}
          value={newValue}
          onChange={(event) => {
            setNewValue(event.target.value);
            props.onChangeInput?.(event);
          }}
          onCompositionStart={startComposition}
          onCompositionEnd={endComposition}
          onKeyDown={(event) => {
            if (composing) {
              return;
            }
            if (event.key === "Enter" && newValue.length > 0) {
              event.preventDefault();
              props.onChange?.([...props.values, newValue]);
              setNewValue("");
            }
          }}
        />
        <button
          className="bg-success text-white h-8 rounded-r-full w-[100px]"
          onClick={() => {
            if (newValue.length > 0) {
              props.onChange?.([...props.values, newValue]);
              setNewValue("");
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
