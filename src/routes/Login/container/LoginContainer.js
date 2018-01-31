import { connect } from "react-redux";
import Login from "../components/Login";
import {
    _userLogin,
    userLogin
} from "../module/login";
const mapStateToProps = (state) => ({
    users: state.login.users || {},
    inputData:state.login.inputData || {},
    isLoggingIn:state.login.isLoggingIn,
});

const mapActionCreators = {
    _userLogin,
    userLogin
};
export default connect(mapStateToProps, mapActionCreators)(Login);