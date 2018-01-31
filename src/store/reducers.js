import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/module/home";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/module/trackDriver";
import { LoginReducer as login } from "../routes/Login/module/login";

export const makeRootReducer = () => {
	return combineReducers({
		home,
		trackDriver,
		login
	});
}

export default makeRootReducer;