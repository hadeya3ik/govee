'use client'
import { useState } from "react";


export default function CheckBox({items, setItems}) {

  function handleChange(id: string) {
    let newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));
    setItems(newItems);
  }

  return (
    <div className="">
      <div className="">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <label
              key={item.id}
              className={`group flex w-full cursor-pointer select-none items-center ${
                item.checked ? "text-custom-main" : "text-gray-400"
              }`}
              onClick={() => handleChange(item.id)}
            >
              <div
                className={`h-10 w-10 border border-custom-main ${
                  item.checked ? "bg-custom-main" : "bg-custom-invert"
                }`}
              ></div>
              <span className="ml-2 text-xl ">{item.text}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};