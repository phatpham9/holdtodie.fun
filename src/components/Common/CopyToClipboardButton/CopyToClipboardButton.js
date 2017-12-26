import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'reactstrap';

const DEFAULT_TEXT = 'Copy';
const COPIED_TEXT = 'Copied';

class CopyToClipboardButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
    };

    this.copy = this.copy.bind(this);
  }

  copy() {
    this.setState({
      inProgress: true,
    }, () => setTimeout(() => {
      this.setState({
        inProgress: false,
      }, () => {
        if (this.props.onCopy) {
          this.props.onCopy();
        }
      });
    }, 1000));
  }

  render() {
    return (
      <CopyToClipboard text={this.props.value} onCopy={this.copy}>
        <Button className={this.props.className || ''} outline size="sm" disabled={this.state.inProgress}>{this.state.inProgress ? COPIED_TEXT : DEFAULT_TEXT}</Button>
      </CopyToClipboard>
    )
  }
}

export default CopyToClipboardButton;
