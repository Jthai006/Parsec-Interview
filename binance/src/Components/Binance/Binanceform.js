import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BinanceTable from "./BinanceTable";

const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: "P244oVT0Y5oQrIJhFubriJFVJ2nlbvhWKjYoMF8DTtcHJCL2wFR9engkM26YQtaF",
  APISECRET: "vhCEiMJpPscfmh2sAOD3s8Y0pyzusP1r1rUhDEwAQsYzOmqWADxRT8ufOOYxHZnY",
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}
function Binanceform(props) {
  const forceUpdate = useForceUpdate();
  const [startCoin, setStartCoin] = useState("");
  const [endCoin, setEndCoin] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [data, setData] = useState([]);
  const classes = useStyles();
    React.useEffect(()=>{
        setStartCoin(props.fcoin);
        setEndCoin(props.scoin);
    },[props.scoin,props.fcoin])
  const handleChangeSC = (e) => {
    setStartCoin(e.target.value);
  };
  const handleChangeEC = (e) => {
    setEndCoin(e.target.value);
  };
  const handleChangeQ = (e) => {
    setQuantity(e.target.value);
  };
  const handleUpdate = () => {
    props.submit(startCoin,endCoin, quantity);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Start Coin"
        variant="outlined"
        value={startCoin}
        onChange={handleChangeSC}
      />
      <TextField
        id="outlined-basic"
        label="End Coin"
        variant="outlined"
        value={endCoin}
        onChange={handleChangeEC}
      />
      <TextField
        id="outlined-basic"
        label="Quantity"
        variant="outlined"
        value={quantity}
        onChange={handleChangeQ}
      />
      <Button onClick={handleUpdate} >
        Submit
      </Button>
    </form>
  );
}

export default Binanceform;
