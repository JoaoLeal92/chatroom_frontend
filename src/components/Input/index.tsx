import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   name: string;
// }

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <Container>
      <input {...props} />
    </Container>
  );
};

export default Input;
