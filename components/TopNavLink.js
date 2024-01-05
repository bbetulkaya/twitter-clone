import React from "react";
import Link from "next/link";

const TopNavLink = ({title="Tweet", url="/"}) => {
  return (
    <Link href={url}>
      <div className="flex mb-5 cursor-pointer items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className="w-5 h-4 mr-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <div className="text-lg font-bold">{title}</div>
      </div>
    </Link>
  );
};

export default TopNavLink;
