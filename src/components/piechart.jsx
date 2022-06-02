import React, { Component } from "react";
import ReactECharts from "echarts-for-react";
import { cloneDeep } from "lodash";
class PiChart extends Component {
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
        step: "start",
        data: [
          // ["2022-04-23T05:54:34", 333.10849],
          // ["2022-04-23T05:54:40", 333.95694],
          // ["2022-04-23T05:54:45", 333.551041],
          // ["2022-04-23T05:54:48", 333.314362],
          // ["2022-04-23T05:54:51", 333.060211],
          // ["2022-04-23T05:54:55", 333.93396],
        ],
      },
    },
    websocket: null,
    dt: "empty",
  };

  testClick = () => {
    let ws = this.state.websocket;
    console.log("clicked");
    // console.log(`Pi web api Websocket data comming ${ws.readyState}`);
    // console.log(`state is  ${this.state.data.toString()}`);
    // let datanew = this.state.data;
    // datanew.push([Date.now().toString(), 300]);
    // this.setState({
    //   data: datanew[0],
    // });
    this.setState({
      option: {
        series: {
          data: [
            ["2022-04-23T05:54:34", 164.10849],
            ["2022-04-23T05:54:40", 167.95694],
            ["2022-04-23T05:54:45", 168.551041],
            ["2022-04-23T05:54:48", 168.314362],
            ["2022-04-23T05:54:51", 171.060211],
            ["2022-04-23T05:54:55", 167.93396],
          ],
        },
      },
    });
  };

  addClick = () => {
    console.log("Add clicked");
    let datanew = cloneDeep(this.state.option.series.data);
    console.log(`state is  ${datanew.toString()}`);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString().slice(0, -5);
    console.log(today);
    datanew.push(["2022-04-23T05:55:55", 300]);
    this.setState({
      option: {
        series: {
          data: datanew,
        },
      },
      dt: today,
    });
  };

  doConnect = () => {
    const ws = new WebSocket(
      "wss://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZeglwAAAASElTVE9SSUFOXEhJU1RPUklBTlRFU1RUQUc/channel"
    ); //?Username=Administrator&Password=Rockwell1
    ws.onopen = (ev) => {
      console.log("Pi web api Websocket is open");
      this.setState({ websocket: ws });
    };
    ws.onmessage = (ev) => {
      console.log(`Pi web api Websocket data comming ${ws.readyState}`);
      console.log(`state is  ${this.state.option.series.data.toString()}`);
      const eventdata = JSON.parse(ev.data);
      console.log(
        `data value is ${
          eventdata.Items[0].Items[0].Value
        }at ${eventdata.Items[0].Items[0].Timestamp.slice(0, -1)}`
      );

      let datanew = cloneDeep(this.state.option.series.data);
      datanew.push([
        eventdata.Items[0].Items[0].Timestamp.slice(0, -1),
        eventdata.Items[0].Items[0].Value,
      ]);
      this.setState({
        option: {
          series: {
            data: datanew,
          },
        },
      });
    };
  };

  disConnect = () => {
    console.log(`the state of websocket ${this.state.websocket.readyState}`);
    let ws = this.state.websocket;
    ws.onclose = () => {
      console.log("Pi web api Websocket is closed");
    };
    ws.close();
  };

  render() {
    return (
      <div>
        <button onClick={this.testClick}>Test</button>
        <button onClick={this.addClick}>{this.state.dt}</button>
        <button onClick={this.doConnect}>Connect</button>
        <button onClick={this.disConnect}>DisConnect</button>
        <ReactECharts option={this.state.option} style={{ height: 400 }} />
      </div>
    );
  }
}

export default PiChart;

// var a1 = 'FNOEozcPzkigMNOpd1XZeg==';
// var b2 = 'jQAAAA==';
// var b3 = 'SElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ';
// var b1 = ''

//   var binary_string = window.atob(b2);
// console.log(binary_string);
//   var len = binary_string.length;
// console.log(len);
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i);
//     console.log(bytes[i]);
//   }
// {
//   "Links": {},
//   "Items": [
//     {
//       "WebId": "F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ",
//       "Id": 141,
//       "Name": "bae9cf24-c8b3-46c0-ad5d-a64df2174ed9",
//       "Path": "\\\\HISTORIAN\\bae9cf24-c8b3-46c0-ad5d-a64df2174ed9",
//       "Descriptor": "PIBatch storage point. PI Batch Database generated, do not delete or edit.",
//       "PointClass": "base",
//       "PointType": "String",
//       "DigitalSetName": "",
//       "EngineeringUnits": "",
//       "Span": 100.0,
//       "Zero": 0.0,
//       "Step": true,
//       "Future": false,
//       "DisplayDigits": -5,
//       "Links": {
//         "Self": "https://historian/piwebapi/points/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ",
//         "DataServer": "https://historian/piwebapi/dataservers/F1DSFNOEozcPzkigMNOpd1XZegSElTVE9SSUFO",
//         "Attributes": "https://historian/piwebapi/points/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/attributes",
//         "InterpolatedData": "https://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/interpolated",
//         "RecordedData": "https://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/recorded",
//         "PlotData": "https://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/plot",
//         "SummaryData": "https://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/summary",
//         "Value": "https://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/value",
//         "EndValue": "https://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegjQAAAASElTVE9SSUFOXEJBRTlDRjI0LUM4QjMtNDZDMC1BRDVELUE2NERGMjE3NEVEOQ/end"
//       }
//     },
