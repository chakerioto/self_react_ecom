import React from 'react';
import { Route , Switch , Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUSer } from './redux/user/user.actions'


class App extends React.Component {
  unsubcribeFromAuth = null ; 

  componentDidMount() {
    const {setCurrentUSer} = this.props;

    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUSer({
              id : snapShot.id ,
              ...snapShot.data()
          })
        });
      }
      else {
        setCurrentUSer(userAuth);
      }
    });
  }
  
  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render (){

    return (
      <div>
        <Header/>
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
        <Route
             exact
             path='/signin'
             render={() =>
               this.props.currentUser ? (
                   <Redirect to='/' />
                   ) : (
                   <SignInAndSignUpPage />
                   ) 
             }
        /> 
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser : user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUSer: user => dispatch(setCurrentUSer(user))
})

export default connect(null,mapDispatchToProps)(App);
