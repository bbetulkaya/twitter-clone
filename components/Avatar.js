import React from "react";
import EditableImage from "./EditableImage";

const Avatar = ({ src, big, onChange, editable = false }) => {
  const widthClass = big ? "w-24" : "w-12";
  return (
    <div>
      <EditableImage
        type={"image"}
        src={src}
        onChange={onChange}
        editable={editable}
        className={"rounded-full overflow-hidden " + widthClass}
      />
    </div>
  );
};

export default Avatar;
