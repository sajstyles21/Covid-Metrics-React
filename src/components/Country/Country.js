import React, { useEffect, useState } from "react";
import "./Country.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { ALL_COUNTRIES_DATA } from "../../apiUrls";
import { publicRequest } from "../../requestMethods";

const Country = () => {
  const position = [32.2733, 75.6522];
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const apiResponse = await publicRequest.get(ALL_COUNTRIES_DATA);
        const modifiedResponse = apiResponse.data.map((item) => {
          return {
            country: item.country,
            cases: item.cases,
            lat: item.countryInfo.lat,
            long: item.countryInfo.long,
          };
        });
        setCountries(modifiedResponse);
      } catch (err) {}
    };
    getCountriesData();
  }, []);

  return (
    <div className="countryContainer">
      <h2 className="countryTitle">Covid 19 Worldwide Metrics</h2>
      <div className="countryMap">
        <MapContainer
          center={position}
          zoom={3}
          style={{ height: "50vh", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {countries.map((countryData) => {
            return (
              <Marker
                key={countryData.country}
                position={[countryData?.lat, countryData?.long]}
                onMouseOver={(e) => {
                  e.target.openPopup();
                }}
                onMouseOut={(e) => {
                  e.target.closePopup();
                }}
              >
                <Tooltip>{`${countryData.country} - Total Cases: ${countryData.cases}`}</Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Country;
