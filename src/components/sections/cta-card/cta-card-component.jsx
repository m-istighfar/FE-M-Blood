/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-off_white rounded-rsm mb-6 xl:mb-8 shadow-xl hover:shadow-lg transition">
        <div className="flex-auto p-4">
          <div className="flex items-start">
            <div className="relative w-full pr-4 max-w-full flex-grow">
              <h5 className="text-dark_gray uppercase font-bold text-xs tracking-wide">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-dark truncate">
                {statTitle}
              </span>
            </div>
            <div className="relative w-12 flex-shrink-0">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className="text-xl">{statIconName}</i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blue mt-4">
            <span
              className={`${statPercentColor} font-semibold mr-2 ${
                statArrow === "up" ? "text-green" : "text-red"
              }`}
            >
              <i>
                {statArrow === "up" ? <BsArrowUpRight /> : <BsArrowDownLeft />}
              </i>{" "}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Donate Blood",
  statTitle: "000,030",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statDescripiron: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-blue",
};
