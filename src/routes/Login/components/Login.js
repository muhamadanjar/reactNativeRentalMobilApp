import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Logo from "../../../components/Logo";
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#000'
    },
    
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        
        color:'#ffffff',
        textAlign:'center'
    },
    message:{
        
        color: 'red', 
        padding: 5
    },
})
export default class Login extends Component {
    state = {
        username: '',
        password: '',
        isLoggingIn: false,
        message: ''
    }
    _userLogin = () => {

        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            username: this.state.username,
            password: this.state.password,
            grant_type: 'password'
        };
        

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody);
        var proceed = false;
        fetch("https://192.168.20.5/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
        })
        .then((response) => response.json())
        .then((response) => {
                if (response.status==200) proceed = true;
                else this.setState({ message: response.message });
        })
        .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) this.props.onLoginPress();
        })
        .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false })
		});
    }

    clearUsername = () => {
        this._username.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }
    handleInput = (key, val)=>{
		this.props.getInputData({
			key,
			value:val
		});
	}
    render() {
        return (
            <View>
                <ScrollView>
                    <Text>
                        Login
                    </Text>
                    <Logo/>
                    <TextInput
                        placeholder='Username' 
                        autoFocus={true}
                        onChangeText={this.handleInput.bind(this, "username")}
                    />
                    <TextInput
                        placeholder='Password' 
                        secureTextEntry={true}
                        onSubmitEditing={this.props.userLogin}
                        onChangeText={this.handleInput.bind(this, "password")}
                        
                    />
                    {!!this.props.message && (
                        <Text
                            style={styles.message}>
                            {this.props.message}
                        </Text>
                    )}
                    {this.props.isLoggingIn && <ActivityIndicator />}
                    <View  />
                    
                    <Button 
                        disabled={this.props.isLoggingIn}
                        onPress={this.props.userLogin}
                        onClick={this.props.userLogin}
                        title="Submit"
                    />
                </ScrollView>
            </View>
            )
    }
}