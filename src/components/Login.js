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
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#36485f',
      paddingLeft:60,
      paddingRight:60,
      alignSelf:'stretch',
      justifyContent: 'center',
    },
    linky: {
      fontWeight: 'bold',
      color: '#4C3E54',
      paddingTop: 10
    },
    header:{
        fontSize:24,
        color:'#fff',
        paddingBottom:10,
        marginBottom:40,
        borderBottomColor:'#199187',
        borderBottomWidth:1,
    },
    textinput:{
        alignSelf:'stretch',
        height:40,
        color:'#fff',
        marginBottom:30,
        borderBottomColor:'#f8f8f8',
        borderBottomWidth:1,
    }
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
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text 
                        style={styles.header}>
                        Login
                    </Text>
                    <TextInput style={styles.textinput}
                        ref={component => this._username = component}
                        placeholder='Username' 
                        onChangeText={(username) => this.setState({username})}
                        autoFocus={true}
                        onFocus={this.clearUsername}
                    />
                    <TextInput style={styles.textinput}
                        ref={component => this._password = component}
                        placeholder='Password' 
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry={true}
                        onFocus={this.clearPassword}
                        onSubmitEditing={this._userLogin}
                    />
                    {!!this.state.message && (
                        <Text
                            style={{fontSize: 14, color: 'red', padding: 5}}>
                            {this.state.message}
                        </Text>
                    )}
                    {this.state.isLoggingIn && <ActivityIndicator />}
                    <View style={{margin:7}} />
                    <TouchableOpacity>
                    <Button 
                        disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
                        onPress={this._userLogin}
                        title="Submit"
                    />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            )
    }
}