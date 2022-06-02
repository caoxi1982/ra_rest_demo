import React, { Component } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class Calculation extends Component {
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

  getDataSummaryCount = () => {
    axios
      .get(
        "/api/streams/F1DPFNOEozcPzkigMNOpd1XZeglwAAAASElTVE9SSUFOXEhJU1RPUklBTlRFU1RUQUc/summary?summaryType=Count&summaryDuration=10m&startTime=*-2h",
        {
          headers: {
            //Authorization: "Basic QWRtaW5pc3RyYXRvcjpSb2Nrd2VsbDE=",
          },
        }
      )
      .then((res) => {
        console.log(res.data.Items);
        let data = res.data.Items;
        let datavalue = [];
        let datatimestamp = [];
        for (let item of data) {
          datavalue.push(item.Value.Value);
          datatimestamp.push(item.Value.Timestamp.slice(0, 19));
        }
        console.log(datavalue);
        this.setState({
          option: {
            xAxis: {
              type: "category",
              data: datatimestamp,
              axisLabel: {
                rotate: 45,
              },
            },
            series: {
              type: "bar",
              data: datavalue,
            },
          },
        });
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    // this.setState({
    //   option: {
    //     series: {
    //       data: [
    //         ["2022-04-23T05:54:34", 164.10849],
    //         ["2022-04-23T05:54:40", 167.95694],
    //         ["2022-04-23T05:54:45", 168.551041],
    //         ["2022-04-23T05:54:48", 168.314362],
    //         ["2022-04-23T05:54:51", 171.060211],
    //         ["2022-04-23T05:54:55", 167.93396],
    //       ],
    //     },
    //   },
    // });
  };

  getDataSummaryAverage = () => {
    axios
      .get(
        "/api/streams/F1DPFNOEozcPzkigMNOpd1XZeglwAAAASElTVE9SSUFOXEhJU1RPUklBTlRFU1RUQUc/summary?summaryType=Average&summaryDuration=5m&startTime=*-2h",
        {
          headers: {
            //Authorization: "Basic QWRtaW5pc3RyYXRvcjpSb2Nrd2VsbDE=",
          },
        }
      )
      .then((res) => {
        console.log(res.data.Items);
        let data = res.data.Items;
        let datavalue = [];
        // let datatimestamp = []
        for (let item of data) {
          // console.log(item);
          datavalue.push([item.Value.Timestamp.slice(0, 19), item.Value.Value]);
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
        console.log(this.state);
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
        <button onClick={this.getDataSummaryCount}>SummaryCount</button>
        <button onClick={this.getDataSummaryAverage}>SummaryAverage</button>
        <ReactECharts option={this.state.option} style={{ height: 400 }} />
      </div>
    );
  }
}

export default Calculation;
