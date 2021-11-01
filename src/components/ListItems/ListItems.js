import React from "react";
import LaunchItem from "../LaunchItem/LaunchItem";

function ListItems({ data }) {
  return (
    <div>
      {data.map((launch, index) => (
        <LaunchItem key={index} launch={launch} />
      ))}
    </div>
  );
}

export default ListItems;
