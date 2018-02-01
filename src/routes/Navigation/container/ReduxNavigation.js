import { connect } from 'react-redux';
//import DrawerContainer from "../components/DrawerContainer";
import * as ReactNavigation from 'react-navigation';
import React from "react";
import PrimaryNav from '../../nav';

// here is our redux-aware our smart component
function ReduxNavigation (props) {
  
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  })

  return <PrimaryNav  />
}

const mapStateToProps = state => ({ 
  nav: state.nav 
})
const mapActionCreators = {
  
};
export default connect(mapStateToProps,mapActionCreators)(ReduxNavigation)
