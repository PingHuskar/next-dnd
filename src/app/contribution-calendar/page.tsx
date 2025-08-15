"use client";
import Calendar from "react-github-contribution-calendar";
import until from "./until";
import weekNames from "./weekNames";
import panelColors from "./panelColors";
import panelAttributes from "./panelAttributes";

import getValuesFromAuthor from "./getValuesFromAuthor";
import weekLabelAttributes from "./weekLabelAttributes";
// import data from "./dist.json"
import "./s.scss"

export default function ContributionCalendar() {
    return (
      <>
        <Calendar
          values={getValuesFromAuthor(``)}
          until={until}
          weekNames={weekNames}
          panelColors={panelColors}
          panelAttributes={panelAttributes}
          weekLabelAttributes={weekLabelAttributes}
          monthLabelAttributes={null}
        />
        {/* {JSON.stringify(data.filter((item) => item.author === ``).map((item) => item.date))} */}
      </>
    );
}