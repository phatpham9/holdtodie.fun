import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Table, Row, Col, FormText } from 'reactstrap';

import Button from '../Common/Button';

import CryptoROI from 'crypto-roi';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 10,
      min: undefined,
      max: undefined,
      from: '2017-01-01',
      to: '2017-12-31',
      ignores: '',
      response: undefined,
      inProgress: false,
    }

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

		this.setState({
      [name]: value,
    });
  }

  submit(e){
    e.preventDefault();

    this.setState({
      response: undefined,
      inProgress: true,
    }, async () => {
      const { top, from, to, min, max, ignores } = this.state;

      const response = await CryptoROI.calculate({
        top,
        from,
        to,
        min,
        max,
        ignores: ignores ? ignores.split(',') : [],
      });

      this.setState({
        response,
        inProgress: false,
      });
    });
  }

  render() {
    return (
      <div className="calculator-wrapper">
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label for="top">Top coins</Label>
            <Input type="text" name="top" id="topSelect" value={this.state.top} onChange={this.change} required></Input>
          </FormGroup>

          <Row className="form-group">
            <Col xs="6">
              <Label for="from">From</Label>
              <Input type="date" value={this.state.from} name="from" id="from" placeholder="From date" onChange={this.change} required/>
            </Col>
            <Col xs="6">
              <Label for="dateE">To</Label>
              <Input type="date" value={this.state.to} name="to" id="to" placeholder="To date" onChange={this.change} required/>
            </Col>
          </Row>

          <Row className="form-group">
            <Col xs="6">
              <Label for="min">Min price (optional)</Label>
              <Input type="text" name="min" id="min" value={this.state.min} placeholder="Min" onChange={this.change}></Input>
            </Col>
            <Col xs="6">
              <Label for="max">Max price (optional)</Label>
              <Input type="text" name="max" id="max" value={this.state.max} placeholder="Max" onChange={this.change}></Input>
            </Col>
          </Row>

          <FormGroup>
            <Label for="ignores">Except (optional)</Label>
            <Input type="search" value={this.state.ignores} name="ignores" id="ignores" placeholder="Enter a coin you want to ignore." onChange={this.change}/>
            <FormText color="muted">
              Coins are separated by comma. For example: 'USDT,DOGE'
            </FormText>
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit" block busy={this.state.inProgress} busyText="Calculating...">Calculate</Button>
          </FormGroup>
        </Form>

        { this.state.response && (
          <div className="response-table">
            <span>If you put {`$${this.state.response.investmentOfEach}`} in each coin, you will make...</span>

            <Table bordered>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th colSpan="2">{`From ${this.state.from}`}</th>
                  <th>Multiplier</th>
                  <th colSpan="2">{`To ${this.state.to}`}</th>
                </tr>
              </thead>

              <tbody>
                { this.state.response.coins &&
                    this.state.response.coins.map((coin, index) =>
                      <tr key={index}>
                        <td>
                          <img src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32/color/${coin.symbol.toLowerCase()}.png`} alt="" />
                          {coin.name || 'N/A'}
                        </td>
                        <td>{`#${coin.lastIndex}`}</td>
                        <td>{`$${coin.lastPrice}`}</td>
                        <td>{coin.price ? Math.round(coin.price/coin.lastPrice, 2) : 'N/A'}</td>
                        <td>{coin.price ? `$${coin.price}` : 'N/A'}</td>
                        <td>{coin.index ? `#${coin.index}` : 'N/A'}</td>
                      </tr>
                    )
                }
                <tr>
                    <th scope="row">Total investment</th>
                    <th scope="row" colSpan="2">{`$${this.state.response.totalInvestment}`}</th>
                    <th scope="row">{Math.round(this.state.response.returnRate, 2)}</th>
                    <th scope="row" colSpan="2">{`$${Math.round(this.state.response.totalReturn, 2)}`}</th>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default Calculator;
