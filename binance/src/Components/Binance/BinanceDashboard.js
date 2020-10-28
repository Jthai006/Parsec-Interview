import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BinanceTable from "./BinanceTable";




function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}
function BinanceDashboard (props) {
    const forceUpdate = useForceUpdate();
    const [startCoin, setStartCoin] = useState('');
    const [endCoin, setEndCoin] = useState("");
    const [data, setData] = useState([]);
    
    React.useEffect(() => {
      setStartCoin(props.fcoin);
      setEndCoin(props.scoin);
      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${startCoin.toLowerCase()}${endCoin.toLowerCase()}@aggTrade`
      );
      ws.onopen = () => {
        console.log("connected");
      };
      ws.onmessage = (evt) => {
        console.log(JSON.parse(evt.data));
        let joinedData = data;
        joinedData.push(JSON.parse(evt.data));
        props.updateData(joinedData);
        forceUpdate()
      };
      ws.onclose = () => {
        console.log("disconnected");
        ws.close()
        // automatically try to reconnect on connection loss
      };

    },[props.fcoin,props.scoin,props.start])
    

    
    
    return (
      <div>
      </div>
    );
};

export default BinanceDashboard
