import React from 'react';
import { Button } from 'reactstrap';

const DEFAUT_BUSY_TEXT = 'Processing...';

const CustomButton = ({ busy, children, busyText = DEFAUT_BUSY_TEXT, ...rest }) => (
  <Button {...rest} disabled={!!busy}>
    {busy ? busyText : children}
  </Button>
);

export default CustomButton;
