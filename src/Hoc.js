import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ALL_COUNTRIES_DATA, ALL_CONTINENTS_DATA } from "./apiUrls";
import { publicRequest } from "./requestMethods";

const Hoc = (WrappedComponent, entity) => {
  return class extends React.Component {
    state = {
      data: [],
    };

    randomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    uniqueId() {
      return uuid().slice(0, 8);
    }

    componentDidMount() {
      const getData = async () => {
        try {
          const response = await publicRequest.get(
            entity === "continents" ? ALL_CONTINENTS_DATA : ALL_COUNTRIES_DATA
          );
          const newData = response.data
            .map((item) => {
              return {
                id: this.uniqueId(),
                title: entity === "continents" ? item.continent : item.country,
                value: item.cases,
                color: this.randomColor(),
              };
            })
            .sort((a, b) => {
              return b.value - a.value;
            })
            .splice(0, 5);
          this.setState({ ...this.state, data: newData });
        } catch (err) {}
      };
      getData();
    }
    render() {
      return <WrappedComponent data={this.state.data} />;
    }
  };
};

export default Hoc;
