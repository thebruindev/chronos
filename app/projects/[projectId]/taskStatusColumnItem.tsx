import React from "react";

export default function TaskStatusColumnItem(props: { name: string }) {
  return (
    <div className="border border-slate-400 dark:border-[#57E1C0] backdrop-blur-md shadow-lg dark:shadow-xl rounded">
      <p className="py-4 font-bold text-[#005A4E] dark:text-[#DBF9FF] text-center bg-[#57E1C0]">
        {props.name}
      </p>
    </div>
  );
}
