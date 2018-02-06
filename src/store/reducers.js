import { combineReducers } from "redux";
import { HomeReducer as home } from "../routes/Home/module/home";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/module/trackDriver";
import { LoginReducer as login } from "../routes/Login/module/login";
import { NavigationReducer as nav } from "../routes/Navigation/module/navigation";
import { serviceReducer as services } from "../routes/Services/module/services";


export const makeRootReducer = () => {
	return combineReducers({
		home,
		trackDriver,
		login,
		nav,
		services
	});
}

export default makeRootReducer;