import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 10;

  width: 100%;
  height: 50px;

  background: #6519d6;
  position: fixed;

  svg {
    margin: 0 16px;
    height: 100%;
    width: 30px;
    color: #fff;
  }

  a {
    text-decoration: none;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: #fff;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  right: 0;

  margin-right: 50px;

  a {
    color: #fff;

    padding: 10px;
  }
`;
