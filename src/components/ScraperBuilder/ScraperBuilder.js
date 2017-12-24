import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import qs from 'qs';

import './ScraperBuilder.css';

const METHOD = 'GET';
const SCHEME = 'https';
const API_HOST = 'scraper.onroads.xyz';
const BASE_PATH = '/scrape';

const map = ({ url, selector }) => ({
  's-url': url,
  's-selector': selector,
});

const generate = params => {
  return `${SCHEME}://${API_HOST}${BASE_PATH}${qs.stringify(map(params), {
    addQueryPrefix: true,
  })}`
};

const request = async url => {
  try {
    const res = await fetch(url, {
      method: METHOD,
    });
    const text = await res.text();

    return text;
  } catch ({ message }) {
    return message;
  }
}

class ScraperBuilder extends Component {
  constructor(props) {
    super(props);

    const form = {
      url: 'https://coinmarketcap.com',
      selector: '#id-bitcoin .price',
    };

    this.state = {
      form,
      request: generate(form),
      response: '',
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(field, value) {
    const form = {
      ...this.state.form,
      [field]: value,
    };

    this.setState({
      form,
      request: generate(form),
    });
  }

  async submit(e) {
    e.preventDefault();

    const response = await request(this.state.request);

    this.setState({
      response,
    });
  }

  render() {
    return (
      <div className="scraper-builder">
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label for="s-url">URL</Label>
            <Input type="url" id="s-url" name="s-url" placeholder="Website URL" value={this.state.form.url} onChange={e => this.change('url', e.target.value)} required />
          </FormGroup>
    
          <FormGroup>
            <Label for="s-selector">Selector</Label>
            <Input type="text" id="s-selector" name="s-selector" placeholder="CSS selector" value={this.state.form.selector} onChange={e => this.change('selector', e.target.value)} required />
          </FormGroup>
    
          <FormGroup className="request">
            <Label>Request</Label>
            <code className="d-block">curl {this.state.request}</code>
          </FormGroup>
    
          <Button color="primary" type="submit" block>Test</Button>
        </Form>

        {!!this.state.response && (
          <FormGroup className="response">
            <Label>Response</Label>
            <code className="d-block">{this.state.response}</code>
          </FormGroup>
        )}
      </div>
    );
  }
}

export default ScraperBuilder;
