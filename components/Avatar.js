import React from "react";

const Avatar = ({src}) => {
  return (
    <div className="rounded-full overflow-hidden w-10">
      <img src={src} alt="avatar" />
    </div>
  );
};

export default Avatar;
