import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';

import Home from './containers/Home';
import StyleGrid from './components/StyleGrid';
import OtherSolution from './containers/OtherSolutions';
import UserRelations from './containers/UserRelations';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Check from './containers/Check';
import MyTestResult from './containers/MyTestResult';
import ResearchAPI from './containers/ResearchAPI';
import AuthRoute from './HOC/AuthRoute';
import Group from './containers/Group/Group';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GroupDetail from './containers/Group/GroupDetail';
import LoggedInHome from './containers/LoggedInHome';

function App(props) {
  const { history } = props;
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/relation/" component={UserRelations} />
        <Route exact path="/research/api" component={ResearchAPI} />
        <Route
          path="/check/:pid"
          exact
          render={(props) => <Check {...props} />}
        />
        <Route
          exact
          path="/check/result/:pid/:style"
          render={(props) => <OtherSolution {...props} />}
        />
        <Route
          exact
          path="/check/result/:pid"
          render={(props) => <StyleGrid {...props} />}
        />
        <Route
          exact
          path="/home/"
          render={(props) => <LoggedInHome {...props} />}
        />
        <AuthRoute exact path="/my/tests/results">
          <MyTestResult />
        </AuthRoute>
        <AuthRoute exact path="/group">
          <Group />
        </AuthRoute>
        {/* <Route exact path="/group" component={Group} /> */}
        <Route
          exact
          path="/group/detail/:groupId"
          render={(props) => <GroupDetail {...props} />}
        />
      </Switch>

      <Footer />
    </Router>
  );
}

App.propTypes = {
  history: PropTypes.instanceOf(Object),
};
App.defaultProps = {
  history: {},
};
export default App;
