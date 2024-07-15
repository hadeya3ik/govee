import { stagger, useAnimate } from "framer-motion";
import { useState } from "react";
// import { ListBulletIcon } from "@heroicons/react/20/solid";

export default function CheckBox() {
  let [items, setItems] = useState([
    { id: "1", text: "One", checked: true },
    { id: "2", text: "Two", checked: true },
    { id: "3", text: "Three", checked: true },
    { id: "4", text: "Four", checked: false },
    { id: "5", text: "Five", checked: true },
    { id: "6", text: "Six", checked: true },
    { id: "7", text: "Seven", checked: true },
  ]);
  
  let [ref, animate] = useAnimate();

  function handleChange(id: string) {
    let newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);

    // 🟢 If every item has been checked...
    // if (newItems.every((item) => item.checked)) {
    //   let lastCompletedItem = items.findIndex((item) => !item.checked);
    //   let random = Math.random();

    //   if (random < 1 / 3) {
    //     /*
    //       🟢 ...animate each input in the list. The animation uses an array
    //       of keyframes to scale each input from 100% to 125% then back to 100%
    //       in sequence. The `delay` option is used along with the `stagger`
    //       helper to stagger the individual animimations. Stagger accepts
    //       a `from` option to use as a starting point, which we set to
    //       the index of the last completed item.
    //     */
    //     animate(
    //       "input",
    //       { scale: [1, 1.25, 1] },
    //       {
    //         duration: 0.35,
    //         delay: stagger(0.075, { from: lastCompletedItem }),
    //       }
    //     );
    //   } else if (random < 2 / 3) {
    //     /*
    //       🟢 The first animation is a "bounce" effect. This second one is
    //       a "shimmy" effect, achieved by keyframing the `x` prop.
    //     */
    //     animate(
    //       "input",
    //       { x: [0, 2, -2, 0] },
    //       {
    //         duration: 0.4,
    //         delay: stagger(0.1, { from: lastCompletedItem }),
    //       }
    //     );
    //   } else {
    //     /*
    //       🟢 This final effect is a "shake", achieved by keyframing the `rotate` prop.
    //       One of the three effects are randomly selected each time the list is completed.
    //     */
    //     animate(
    //       "input",
    //       { rotate: [0, 10, -10, 0] },
    //       {
    //         duration: 0.5,
    //         delay: stagger(0.1, { from: lastCompletedItem }),
    //       }
    //     );
    //   }
    // }
  }

  return (
    <div className="">
      <div className="">
        <div ref={ref} className="flex flex-col gap-4">
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