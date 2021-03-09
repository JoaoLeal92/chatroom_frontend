import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import ChatRoom from '../pages/ChatRoom';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/:roomName" component={ChatRoom} />
    </Switch>
  );
};

export default Routes;
