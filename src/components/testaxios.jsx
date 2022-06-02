import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
class TestAxios extends Component {
  state = {
    name: "test",
    value: 0,
  };
  
  componentDidMount(){
    this.setState({
      name: 'com_did_mount',
      value: 50,})
  }
  

  getResponse = () => {
    axios
      .get(
        "/api/streams/F1DPFNOEozcPzkigMNOpd1XZeglwAAAASElTVE9SSUFOXEhJU1RPUklBTlRFU1RUQUc/value",
        {
          headers: {
            //Authorization: "Basic QWRtaW5pc3RyYXRvcjpSb2Nrd2VsbDE=",
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          name: res.data.Timestamp,
          value: res.data.Value,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  render() {
    return (
      <div className="border p-3 mb-2 bg-primary text-white">
        <h2>Example to get a point's current value</h2>
        <button className="btn btn-info" onClick={this.getResponse}>
          Send Request
        </button>
        <h3 className="bg-secondary">
          <span>the time is {this.state.name}</span>
          <span>current value is {this.state.value}</span>
        </h3>
      </div>
    );
  }
}

export default TestAxios;
