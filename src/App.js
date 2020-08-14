import React, { Component } from 'react';
import Layout from './Layout/Layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import DishesList from './Containers/DishesList/DishesList'
import DishCreator from './Containers/DishCreator/DishCreator';
import Auth from './Containers/Auth/Auth';
import { connect } from 'react-redux';
import Logout from './Components/Logout/Logout'
import {autoLogin} from './store/actions/auth'


class App extends Component {

  componentDidMount () {
    this.props.autoLogin()
  }

  render () {
    let routes = (
      <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={DishesList} />
          <Redirect to="/" />
        </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/dish-creator" component={DishCreator} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={DishesList} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps (dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
