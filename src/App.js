import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  componentWillUnmount() {
    /** Close the subscription of a user */
    this.unsubscribeFromAuth();
  }

  componentDidMount() {
    /** Create the subscription of a user */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        /**
         * From the firebase documentation
         * 
         * A DataSnapshot is an efficiently generated, immutable copy of the data at a Database location. 
         * It cannot be modified and will never change (to modify data, you always call the set() method on a Reference directly)
         */
        userRef.onSnapshot(snapShot => {
          /** Data as a snapshot from our firebase db */
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      } else {
        /** If the returned obj (our user) is null, we need to update our state according to that */
        this.setState({ currentUser: userAuth })
      }
    });
  }

  render () {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route path='/signin' component={ SignInAndSignUpPage } />
        </Switch>
      </div>
    )
  }
}

export default App;