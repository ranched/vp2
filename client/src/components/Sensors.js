import "../css/Sensors.css";
import React from "react";
import SensorNav from "./SensorsHelpers/SensorNav";
import SensorButtonArea from "./SensorsHelpers/SensorButtonArea";
import SensorFilter from "./SensorsHelpers/SensorFilter";
import SensorPump from "./SensorsHelpers/SensorPump";
import SensorDesalter from "./SensorsHelpers/SensorDesalter";
import SensorBoiler from "./SensorsHelpers/SensorBoiler";

const API_SENSOR_URL = "http://localhost:5000/sensordata";
const RUL_SENSOR_URL = "http://localhost:5000/sensordata/rul";

class Sensors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: {},
      currentModel: "http://localhost:5000/Refinery_Model/",
      leftFilter: "-550px",
      filOp: "0",
      pumpOp: "0",
      desOp: "0",
      boilOp: "0",
      leftPump: "-550px",
      leftDesalter: "-550px",
      leftBoiler: "-550px",
      filterSensorData: {},
      pumpSensorData: {},
      boilerSensorData: {},
      desalterSensorData: {},
      boilerRul: "",
      pumpRul: "",
      desalterRul: "",
      filterRul: ""
    };
  }

  componentDidMount() {
    this.fetchUrl();
    this.fetchRul();
  }

  fetchUrl = () => {
    try {
      setInterval(async () => {
        const response = await fetch(API_SENSOR_URL);
        const json = await response.json();
        this.handleResults(json);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  handleResults = sensorData => {
    this.setState({
      sensorData,
      filterSensorData: sensorData.filter,
      pumpSensorData: sensorData.pump,
      desalterSensorData: sensorData.desalter,
      boilerSensorData: sensorData.boiler
    });
  };

  fetchRul = async () => {
    try {
      const response = await fetch(RUL_SENSOR_URL);
      const json = await response.json();
      const rul = json.rows;
      this.handleRulResults(rul);
    } catch (err) {
      console.log(err);
    }
  };

  handleRulResults = rul => {
    this.setState({
      boilerRul: rul[0].RUL,
      pumpRul: rul[1].RUL,
      desalterRul: rul[2].RUL,
      filterRul: rul[4].RUL
    });
  };

  onPumpClick = e => {
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        currentModel: "http://localhost:5000/Filter_Model/",
        leftFilter: "-550px",
        leftDesalter: "-550px",
        leftBoiler: "-550px",
        leftPump: "0px",
        pumpOp: 1,
        filOp: "0",
        desOp: "0",
        boilOp: "0"
      });
    }, 0);
  };

  onBoilerClick = e => {
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        currentModel: "http://localhost:5000/Boiler_Model/",
        leftFilter: "-550px",
        leftDesalter: "-550px",
        leftPump: "-550px",
        leftBoiler: "0px",
        boilOp: 1,
        pumpOp: "0",
        filOp: "0",
        desOp: "0"
      });
    }, 0);
  };

  onDesalterClick = e => {
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        currentModel: "http://localhost:5000/Pump_Model/",
        leftFilter: "-550px",
        leftDesalter: "0px",
        leftPump: "-550px",
        leftBoiler: "-550px",
        desOp: 1,
        pumpOp: "0",
        filOp: "0",
        boilOp: "0"
      });
    }, 0);
  };

  onFilterClick = e => {
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        currentModel: "http://localhost:5000/Desalter_Model/",
        leftFilter: "0px",
        leftPump: "-550px",
        leftDesalter: "-550px",
        leftBoiler: "-550px",
        filOp: 1,
        pumpOp: "0",
        desOp: "0",
        boilOp: "0"
      });
    }, 50);
  };

  render() {
    console.log("the RUL for boiler is: ", this.state.boilerRul);
    return (
      <div className="sensorsPageLayout">
        <SensorNav />
        <div className="sensorButtonArea">
          <SensorButtonArea
            onBoilerClick={this.onBoilerClick}
            onPumpClick={this.onPumpClick}
            onDesalterClick={this.onDesalterClick}
            onFilterClick={this.onFilterClick}
          />
        </div>

        <div
          style={{ left: this.state.leftFilter, opacity: this.state.filOp }}
          className="sensorCard"
        >
          <SensorFilter
            rul={this.state.filterRul}
            filterSensorData={this.state.filterSensorData}
          />
        </div>

        <div
          style={{ left: this.state.leftPump, opacity: this.state.pumpOp }}
          className="sensorCard"
        >
          <SensorPump
            rul={this.state.pumpRul}
            pumpSensorData={this.state.pumpSensorData}
          />
        </div>

        <div
          style={{ left: this.state.leftDesalter, opacity: this.state.desOp }}
          className="sensorCard"
        >
          <SensorDesalter
            rul={this.state.desalterRul}
            desalterSensorData={this.state.desalterSensorData}
          />
        </div>

        <div
          style={{ left: this.state.leftBoiler, opacity: this.state.boilOp }}
          className="sensorCard"
        >
          <SensorBoiler
            rul={this.state.boilerRul}
            boilerSensorData={this.state.boilerSensorData}
          />
        </div>

        <div className="loadRefModel">Loading Refinery</div>
        <iframe
          className="sensorModelFrame"
          src={this.state.currentModel}
          title="Landing Frame"
        />
      </div>
    );
  }
}

export default Sensors;
