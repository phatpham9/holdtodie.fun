import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, ButtonGroup, Table, Button } from 'reactstrap';

import './CryptoCurrency.css';

class CryptoCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topSelect: 10,
      dateS: '2017-01-01',
      dateE: '2017-01-07',
    }
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
		const value = e.target.type == 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log(value);
		this.setState({ [name]: value });
  }
  submit(){
    
  }

  render() {
    return (
      <div className="crypto-currency">
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label for="topSelect">Top</Label>
            <Input type="select" name="topSelect" id="topSelect" value={this.state.topSelect} onChange={this.onChange}>
              <option>10</option>
              <option>20</option>
              <option>More</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="dateS">Date start</Label>
            <Input type="text" value={this.state.dateS} name="dateS" id="dateS" placeholder="Date start" onChange={this.onChange}/>
          </FormGroup>

          <FormGroup>
            <Label for="dateE">Date end</Label>
            <Input type="text" value={this.state.dateE} name="dateE" id="dateE" placeholder="Date end" onChange={this.onChange}/>
          </FormGroup>

          <FormGroup>
            <Button type="submit" color="primary" block >GO !</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default CryptoCurrency;
