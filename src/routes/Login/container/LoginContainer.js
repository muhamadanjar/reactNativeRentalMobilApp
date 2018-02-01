import { connect } from "react-redux";
import Login from "../components/Login";
import {
    userLogin,
    getInputData,
} from "../module/login";
const mapStateToProps = (state) => ({
    users: state.login.users || {},
    inputData:state.login.inputData || {},
    isLoggingIn:state.login.isLoggingIn,
});

const mapActionCreators = {
    userLogin,
    getInputData
};
export default connect(mapStateToProps, mapActionCreators)(Login);