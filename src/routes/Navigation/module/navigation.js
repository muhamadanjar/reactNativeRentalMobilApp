import {LOGIN_URL} from "../../../config/config";
import {AsyncStorage} from "react-native";
import constants from "./actionConstants";
const { 
    GET_INPUT,
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

const ACTION_HANDLERS = {
    GET_INPUT:handleGetInputData,
}
const initialState = {
	inputData:{},
    message:'',

};
export function NavigationReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}