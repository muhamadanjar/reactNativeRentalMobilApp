import update from "react-addons-update";
import constants from "./actionConstants";
import {LOGIN_URL} from "../../../config/config";
import request from "../../../util/request";
import {AsyncStorage} from "react-native";

const { 
    GET_INPUT,
    GET_MESSAGE,
    POST_LOGIN,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST
	  } = constants;
export function getInputData(payload){
	return{
		type:GET_INPUT,
		payload:payload
	}
}
export function userLogin(){
    var proceed = false;
    return (dispatch, store)=>{
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'password',
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) proceed = true;
            dispatch({
                type:LOGIN_SUCCESS,
                payload:proceed
            });
            dispatch({
                type:POST_LOGIN,
                payload:response.data
            });
            
        })
        
        .catch(err => {
            console.log('error',err);
            dispatch({
                type:GET_MESSAGE,
                payload:err
            });
				//this.setState({ message: err.message });
				//this.setState({ isLoggingIn: false })
        });
    }
}
export function _userLogin (){

    var proceed = false;
    return (dispatch, store)=>{
        var params = {
            username: store().login.inputData.username,
            password: store().login.inputData.password,
            grant_type: 'password'
        };
        request.post(store().login.server_url+"api/login")
			.query({
                username: store().login.inputData.username,
                password: store().login.inputData.password,
			})
			.finish((error, res)=>{
                console.log(error);
                if(res){
                    dispatch({
                        type:POST_LOGIN,
                        payload:res.body
                    });
                }
		}).catch((error)=> console.log(error.message));
    }
    
}

//--------------------
//Action Handlers
//--------------------

function handleGetInputData(state, action){
	const { key, value } = action.payload;
	return update(state, {
		inputData:{
			[key]:{
				$set:value
			}
		}
	});
}

//handle get nearby drivers
function handlePostLogin(state, action){
	return update(state, {
		users:{
			$set:action.payload
		}
	});
}

function handleMessage(state, action){
	return update(state, {
		message:{
			$set:action.payload
		}
	});
}

function handleIsLoggingIn(state, action){
	return update(state, {
		isLoggingIn:{
			$set:action.payload
		}
	});
}

const ACTION_HANDLERS = {
    GET_INPUT:handleGetInputData,
    POST_LOGIN:handlePostLogin,
    GET_MESSAGE:handleMessage,
    LOGIN_SUCCESS:handleIsLoggingIn
    
}

const initialState = {
	inputData:{},
    resultTypes:{},
    isLoggingIn:false,
    loginIn:false,
    users:{},
    message:'',

};

export function LoginReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}