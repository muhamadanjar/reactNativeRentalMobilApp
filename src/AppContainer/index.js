import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import PropTypes from 'prop-types';
import scenes from "../routes/scenes";
import PrimaryNav from "../routes/nav";
import ReduxNavigation from "../routes/Navigation/container/ReduxNavigation";
import { Provider } from "react-redux";
import {StatusBar} from "react-native";

export default class AppContainer extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired
	}
	render(){
		return (
			<Provider store={this.props.store}>
				
				<ReduxNavigation/>
			</Provider>

			);
	}
}
