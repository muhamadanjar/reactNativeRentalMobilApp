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
        payload
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


function handleMessage(state, action){
	return update(state, {
		message:{
			$set:action.payload
		}
	});
}


const ACTION_HANDLERS = {
    GET_INPUT:handleGetInputData,
    GET_MESSAGE:handleMessage,
}

const initialState = {
	inputData:{},
    resultTypes:{},
    message:'',

};

export function serviceReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}