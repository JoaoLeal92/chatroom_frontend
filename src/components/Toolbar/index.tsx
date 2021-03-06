import React from 'react';
import { Link } from 'react-router-dom';

import { FiMessageCircle } from 'react-icons/fi';
import { Container, Title, Links } from './styles';

const Toolbar: React.FC = () => {
  return (
    <Container>
      <FiMessageCircle />
      <Link to="/" id="home">
        <Title>Chat Plan</Title>
      </Link>

      <Links>
        <Link to="/">Sign in</Link>
        <Link to="/">Sign up</Link>
      </Links>
    </Container>
  );
};

export default Toolbar;
