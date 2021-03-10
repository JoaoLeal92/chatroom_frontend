import React from 'react';
import { Link } from 'react-router-dom';

import { FiMessageCircle } from 'react-icons/fi';
import { Container, Title, Links } from './styles';

import { useAuth } from '../../hooks/auth';

const Toolbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <FiMessageCircle />
      <Link to="/" id="home">
        <Title>Chat Plan</Title>
      </Link>

      <Links>
        {!user ? (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <Link to="/" onClick={signOut}>
            Sign out
          </Link>
        )}
      </Links>
    </Container>
  );
};

export default Toolbar;
