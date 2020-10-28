import {React, Component} from 'react'
import axios from "axios";
import BinanceTable from "./BinanceTable";
import { TextField, Button } from "@material-ui/core";
import Binanceform from './Binanceform';
import BinanceDashboard from './BinanceDashboard';

export default class Binance2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fCoin: '',
      sCoin: '',
      count: '20',
      start: false
    };
  }


  fetchAPI() {
    fetch("http://localhost:9000/binance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first: this.state.fCoin,
        second: this.state.sCoin,
        count: this.state.count,
      }),
    })
      .then((res) => res.json())
      .then((res) =>{
        if (res[0] !== undefined) {
          this.setState({ data: res.sort((a, b) => (a.a < b.a ? 1 : -1)) });
        }
        }
      );
  }
  submit = (fcoin, scoin,quantity) => {
    this.setState({fCoin:fcoin,sCoin:scoin, count: quantity})
    this.fetchAPI()
  }
  stream = () => {
      console.log('here');
      this.setState({ start: true });
  }
  updateData = (data) => {
      let sorted = data.sort((a, b) => (a.a < b.a ? 1 : -1));
      if(sorted.length+this.state.data.length > this.state.count) this.setState({ data: [...this.state.data,sorted] });
      this.setState({ data: sorted.slice(0,this.state.count) });
  }

  render() {
    return (
      <div>
        <Binanceform
          fcoin={this.state.fCoin}
          scoin={this.state.sCoin}
          submit={this.submit}
          start={this.stream}
        ></Binanceform>
        {this.state.data.length > 0 ? (
          <BinanceTable
            fcoin={this.state.fCoin}
            scoin={this.state.sCoin}
            data={this.state.data}
          ></BinanceTable>
        ) : null}
        <BinanceDashboard
          fcoin={this.state.fCoin}
          scoin={this.state.sCoin}
          updateData={this.updateData}
          start={this.state.start}
        ></BinanceDashboard>
      </div>
    );
  }
}