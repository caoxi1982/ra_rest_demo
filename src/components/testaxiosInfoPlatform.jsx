import React, { Component } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
class InfoAxios extends Component {
  state = {
    option: {
      title: {
        text: "Step Line",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {
            show: true,
          },
        },
      },
      xAxis: {
        type: "time",
        axisLabel: {
          rotate: 45,
          formatter: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}",
        },
      },
      yAxis: {
        type: "value",
      },
      series: {
        name: "Step Start",
        type: "line",
        data: [],
      },
    },
  };

  componentDidMount() {
    this.setState({
      name: "com_did_mount",
      value: 50,
    });
  }

  getResponse = () => {
    //here change the webpackDevServer.js Proxy configure
    axios
      .post("/info", {
        fqns: ["Historians.historian.HistorianTestTag"],
        timePeriod: {
          duration: -120,
        },
        samplingDefinition: {
          sliceCount: 0,
          deltaT: 1,
          samplingType: "Interpolative",
        },
      })
      .then((res) => {
        console.log(res);
        let data = res.data.fqnsResults[0].values;
        let datavalue = [];
        // let datatimestamp = []
        for (let item of data) {
          // console.log(item);
          datavalue.push([item.t.slice(0, 19), item.v]);
          // datatimestamp.push(item.Value.Timestamp);
        }
        console.log(datavalue);
        this.setState({
          option: {
            xAxis: {
              type: "time",
              axisLabel: {
                rotate: 45,
                formatter: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}",
              },
            },
            series: {
              type: "line",
              data: datavalue,
            },
          },
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
      <div>
        <h2>Example For InfoPlatform</h2>
        <button className="btn btn-info" onClick={this.getResponse}>
          Send Request
        </button>
        <ReactECharts option={this.state.option} style={{ height: 400 }} />
      </div>
    );
  }
}

export default InfoAxios;
