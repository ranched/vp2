import "../css/Visualizations.css";
import React from "react";
import RefNav from "./VisualizationsHelpers/RefNav";

const Visualizations = props => {
  console.log("the props are: ", props);
  return (
    <div className="refPageLayout">
      <RefNav information={props.match.params.id} />
      <iframe
        className="modelFrame"
        src={`http://127.0.0.1:4000/?${props.match.params.id}`}
        title="Landing Frame"
      />
    </div>
  );
};

export default Visualizations;
