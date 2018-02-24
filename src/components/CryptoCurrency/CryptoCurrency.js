import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Table, Row, Col, FormText } from 'reactstrap';

import Button from '../Common/Button';

import Calculator from 'cryptocurrency-roi';
import './CryptoCurrency.css';

class CryptoCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 10,
      from: '2017-01-01',
      to: '2017-12-31',
      min: undefined,
      max: undefined,
      ignores: '',
      inProgress: false,
      response: undefined,
    }
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
		const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
		this.setState({ [name]: value });
  }
  submit(e){
    e.preventDefault();
    const top = this.state.top,
          min = this.state.min,
          max = this.state.max,
          from = this.state.from,
          to = this.state.to,
          ignores = this.state.ignores;
    this.setState({
      inProgress: true,
      response: undefined,
    }, async () => {

      const response = await Calculator.init({top, from, to, max, min, ignores: ignores ? ignores.split(',') : [],});
      this.setState({
        response: response.print(),
        inProgress: false,
      });
    });
  }
  render() {
    console.log(this.state.response);
    return (
      <div className="crypto-currency-wrapper">
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label for="top">Top</Label>
            <Input type="text" name="top" id="topSelect" value={this.state.top} onChange={this.onChange} required></Input>
          </FormGroup>
          <Row className="form-group">
            <Col xs="6">
              <Label for="min">Min</Label>
              <Input type="text" name="min" id="min" value={this.state.min} placeholder="Min" onChange={this.onChange}></Input>
            </Col>
            <Col xs="6">
              <Label for="max">Max</Label>
              <Input type="text" name="max" id="max" value={this.state.max} placeholder="Max" onChange={this.onChange}></Input>
            </Col>
          </Row>
          <Row className="form-group">
            <Col xs="6">
              <Label for="from">From</Label>
              <Input type="date" value={this.state.from} name="from" id="from" placeholder="From date" onChange={this.onChange} required/>
            </Col>
            <Col xs="6">
              <Label for="dateE">To</Label>
              <Input type="date" value={this.state.to} name="to" id="to" placeholder="To date" onChange={this.onChange} required/>
            </Col>
          </Row>
          <FormGroup>
              <Label for="ignores">Except coins</Label>
              <Input type="search" value={this.state.ignores} name="ignores" id="ignores" placeholder="Enter a coin you want to ignore." onChange={this.onChange}/>
              <FormText color="muted">
                Each coin separated by comma. Like this BTC,ADA,RXP
              </FormText>
            </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" block busy={this.state.inProgress} busyText="Requesting...">Calculator</Button>
          </FormGroup>
        </Form>
        { this.state.response &&
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
                          <img src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32/color/${coin.symbol.toLowerCase()}.png`} /> 
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
        }
      </div>
    );
  }
}

export default CryptoCurrency;
