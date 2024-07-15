
import { Switch as AriaSwitch } from "react-aria-components";

export default function Switch() {
    return (
      <AriaSwitch
        className="group touch-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="group-data-[selected]:bg-custom-main group-data-[focus-visible]:ring-2 h-12 w-20 cursor-pointer rounded-full border border-custom-main transition duration-200 p-2 ">
          <div className="group-data-[selected]:ml-8 group-data-[selected]:group-data-[pressed]:ml-6  group-data-[pressed]:w-10 block h-full w-8 origin-right rounded-full border border-custom-main bg-custom-invert transition-all duration-200" />
        </div>
      </AriaSwitch>
    );
  }