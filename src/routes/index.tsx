import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ChatRoom from '../pages/ChatRoom';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:roomName" component={ChatRoom} />
    </Switch>
  );
};

export default Routes;
