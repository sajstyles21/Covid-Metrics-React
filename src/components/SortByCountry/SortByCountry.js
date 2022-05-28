import React, { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import "./SortByCountry.css";
import { v4 as uuid } from "uuid";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SortByCountry = () => {
  const [countryName, setCountryName] = useState("IN");
  const [data, setData] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uniqueId = () => {
    return uuid().slice(0, 8);
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countryList = await publicRequest.get("countries");
        setAllCountries(
          countryList.data.map((item) => {
            return {
              iso: item.countryInfo.iso2,
              country: item.country,
              id: uniqueId(),
            };
          })
        );
      } catch (err) {}
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await publicRequest.get(
          `countries/${countryName}?strict=true`
        );

        const {
          cases,
          deaths,
          recovered,
          country,
          active,
          critical,
          population,
          continent,
          tests,
          ...others
        } = response.data;

        setData({
          cases,
          deaths,
          recovered,
          active,
          critical,
          tests,
          population,
          continent,
          flag: others.countryInfo.flag,
          country,
        });
        setIsLoading(false);
      } catch (err) {
        setErrorMessage("Unable to fetch data");
        setIsLoading(false);
      }
    };
    getData();
  }, [countryName]);

  const handleCountrySelect = (e) => {
    setIsLoading(true);
    setCountryName(e.target.value);
  };

  return (
    <>
      <div className="topBar">
        <h2 className="casesTitle">Country Wise Data</h2>
        <select
          style={{ marginLeft: "10px" }}
          value={countryName}
          disabled={isLoading}
          onChange={handleCountrySelect}
        >
          {allCountries.map((item) => {
            return (
              <option key={item.id} value={item.iso}>
                {item.country}
              </option>
            );
          })}
        </select>
      </div>

      <div className="outerBox">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="countryName">
              <h3>{data.country}</h3>
              <img width="100" height="50" src={data.flag} />
            </div>
            <div className="innerDiv">
              <div className="totalCount">
                <div className="innerCount">
                  <b>Total Cases: {data?.cases?.toLocaleString()}</b>
                </div>
                <div className="innerCount">
                  <b>Total Recovered: {data?.recovered?.toLocaleString()}</b>
                </div>
                <div className="innerCount">
                  <b>Total Death: {data?.deaths?.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="innerDiv">
              <div className="totalCount">
                <div className="innerCount">
                  <b>Total Active Cases: {data?.active?.toLocaleString()}</b>
                </div>
                <div className="innerCount">
                  <b>
                    Total Critical Cases: {data?.critical?.toLocaleString()}
                  </b>
                </div>
                <div className="innerCount">
                  <b>Total Tests: {data?.tests?.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="innerDiv">
              <div className="totalCount">
                <div className="innerCount">
                  <b>Continent: {data?.continent}</b>
                </div>
                <div className="innerCount">
                  <b>Total Population: {data?.population?.toLocaleString()}</b>
                </div>
              </div>
            </div>
          </>
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </>
  );
};

export default SortByCountry;
