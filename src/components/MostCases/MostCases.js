import React, { useEffect, useMemo, useState } from "react";
import "./MostCases.css";
import ChartRace from "react-chart-race";
import Hoc from "../../Hoc";

const MostCases = ({ data }) => {
  return (
    <div className="outerCases">
      <h2 className="casesTitle">Top 5 Countries Total Cases</h2>
      <div className="casesData">
        <ChartRace
          data={data}
          backgroundColor="#000"
          width={690}
          padding={12}
          itemHeight={58}
          gap={12}
          titleStyle={{ font: "normal 400 13px Arial", color: "#fff" }}
          valueStyle={{
            font: "normal 400 11px Arial",
            color: "rgba(255,255,255, 0.42)",
          }}
        />
      </div>
    </div>
  );
};

const CountriesData = Hoc(MostCases, "countries");

export default CountriesData;
