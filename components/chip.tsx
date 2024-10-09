import React from "react";

export type ChipColor = "default" | "success" | "info" | "warning" | "error";
export type PriorityValuesMap = "High" | "Low" | "Medium";

export const chipSeverity: Record<PriorityValuesMap, string> = {
  High: "rgb(251 113 133)", // Red for High (Danger)
  Low: "rgb(34 211 238)", // Blue for Low (Info)
  Medium: "rgb(251 146 60)", // Orange for Medium (Warning)
};

export default function Chip(props: {
  label: PriorityValuesMap;
  onClick?: () => void;
  onDelete?: () => void;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  variant: "filled" | "outlined";
  width: string;
}) {
  const dynamicStyles =
    props.variant === "outlined"
      ? { borderColor: chipSeverity[props.label], borderWidth: "2px" }
      : { backgroundColor: chipSeverity[props.label] };

  return (
    <div
      style={dynamicStyles} // Apply dynamic styles here
      className={`flex items-center justify-center space-x-2 px-3 py-1.5 rounded-full cursor-pointer ${props.variant === "outlined" ? "text-[#005A4E] dark:text-[#DBF9FF]" : "text-[#DBF9FF]"} ${props.width}`}
      onClick={props.onClick}
    >
      {props.avatar && <span className="flex-shrink-0">{props.avatar}</span>}
      {props.icon && <span className="flex-shrink-0">{props.icon}</span>}
      <span className="text-sm text-center">{props.label}</span>
      {props.onDelete && (
        <span
          className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={props.onDelete}
        >
          &times;
        </span>
      )}
    </div>
  );
}
