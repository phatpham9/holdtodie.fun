import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Table, Row, Col, FormText } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';

import Button from '../Common/Button';

import CryptoROI from 'crypto-roi';
import './Calculator.css';

/**
 * formatNumber(number, n, x)
 *
 * @param integer number: number to be formated
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
const formatNumber = (number, n = 2, x = 3) => {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';

  return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 10,
      from: '2017-01-01',
      to: '2017-12-31',
      min: undefined,
      max: undefined,
      ignores: '',
      response: undefined,
      leaderBoard: [],
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

      const leaderBoard = response.coins.filter(({ index }) => !!index).sort((c1, c2) => c2.price / c2.lastPrice - c1.price / c1.lastPrice).map(({ symbol }) => symbol);

      this.setState({
        response,
        leaderBoard,
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
            <Input type="search" value={this.state.ignores} name="ignores" id="ignores" placeholder="Enter coins you want to exclude" onChange={this.change}/>
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
                  <th className="text-right">{new Date(this.state.from).toLocaleDateString()}</th>
                  <th className="text-right">ROI</th>
                  <th className="text-right">{new Date(this.state.to).toLocaleDateString()}</th>
                </tr>
              </thead>

              <tbody>
                {this.state.response.coins && (
                  this.state.response.coins.map((coin, index) =>
                    <tr key={index}>
                      <td>
                        <img src={`https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32/color/${coin.symbol.toLowerCase()}.png`} alt="" /> {coin.name || 'N/A'} {[0, 1, 2].indexOf(this.state.leaderBoard.indexOf(coin.symbol)) !== -1 && <div className="text-warning d-inline-block">
                          <FontAwesomeIcon icon={faStar} /> WINNER #{this.state.leaderBoard.indexOf(coin.symbol) + 1} <FontAwesomeIcon icon={faStar} />
                        </div>}
                      </td>

                      <td className="text-right">
                        <div>${coin.lastPrice}</div>
                        <small className="text-muted">#{coin.lastIndex}</small>
                      </td>

                      <td className="text-right">
                        {!!coin.index ? (
                          <div>
                            <div className={coin.price - coin.lastPrice > 0 ? 'text-success' : coin.price - coin.lastPrice < 0 ? 'text-danger' : ''}>
                              {`${coin.price - coin.lastPrice >= 0 ? '+' : '-'} ${formatNumber(Math.round(Math.abs(coin.price - coin.lastPrice) / coin.lastPrice * 100), 0)}%`}
                            </div>

                            <small className={coin.index - coin.lastIndex > 0 ? 'text-success' : coin.index - coin.lastIndex === 0 ? 'text-muted' : 'text-danger'}>
                              {coin.index - coin.lastIndex >= 0 ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />} {Math.abs(coin.index - coin.lastIndex)}
                            </small>
                          </div>
                        ) : <div className="text-muted">N/A</div>}
                      </td>

                      <td className="text-right">
                        {!!coin.index ? (
                          <div>
                            <div>${coin.price}</div>
                            <small className="text-muted">#{coin.index}</small>
                          </div>
                        ) : <div className="text-muted">N/A</div>}
                      </td>
                    </tr>
                  )
                )}
                <tr>
                  <th scope="row">Total investment</th>

                  <th className="text-right" scope="row">{`$${formatNumber(this.state.response.totalInvestment, 0)}`}</th>

                  <th className="text-right" scope="row">
                    <div className={this.state.response.totalReturn - this.state.response.totalInvestment > 0 ? 'text-success' : this.state.response.totalReturn - this.state.response.totalInvestment < 0 ? 'text-danger' : ''}>
                      {`${this.state.response.totalReturn - this.state.response.totalInvestment >= 0 ? '+' : '-'} ${formatNumber(Math.round(Math.abs(this.state.response.totalReturn - this.state.response.totalInvestment) / this.state.response.totalInvestment * 100), 0)}%`}
                    </div>
                  </th>

                  <th className="text-right" scope="row">{`$${formatNumber(this.state.response.totalReturn, 0)}`}</th>
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
