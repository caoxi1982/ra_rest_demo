import React, { useState, useEffect } from "react";

import ReactECharts from "echarts-for-react";
import { cloneDeep } from "lodash";

const PageChart = () => {
  const init_option = {
    title: {
      text: "PI Webapi_websocket",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      name: "pi",
    },
    series: {
      name: "cdt",
      type: "line",
      data: [],
    },
  };

  const [option, setOption] = useState(init_option);
  const [websocket, setWS] = useState(0);
  //let d;

  function fetchNewData() {
    const data0 = Math.round(Math.random() * 100);
    console.log(option);
    const newOption = cloneDeep(option);
    option.series.data.push([Date.now(), data0]);
    setOption(option);
  }

  // useEffect(()=>{
  //   const timer = setInterval(() => {
  //     fetchNewData();
  //   }, 1000);

  //   return () => clearInterval(timer);
  // });
  useEffect(() => {
    //const data0 = Math.round(Math.random() * 100);
    //fetchNewData()
    return () => websocket.close;
  });

  function upgradeConnect() {
    const ws = new WebSocket(
      "wss://historian/piwebapi/streams/F1DPFNOEozcPzkigMNOpd1XZegkQAAAASElTVE9SSUFOXENETTE1OA/channel"
    ); //?Username=Administrator&Password=Rockwell1
    ws.onopen = (ev) => console.log("Pi web api Websocket is open");
    ws.onmessage = (ev) => {
      console.log("Pi web api Websocket data comming");
      fetchNewData();
    };
    //setWS(ws)
  }

  // function disConnect(){
  //   const ws = websocket;
  //   ws.close();
  //   ws.onclose = (ev) => console.log(ev);
  // }

  return (
    <div>
      <button onClick={upgradeConnect}>Connect</button>
      {/* <button onClick={disConnect}>disConnect</button> */}
      <ReactECharts option={option} style={{ height: 400 }} />;
    </div>
  );
};
export default PageChart;
