import { connect } from "react-redux";
import Services from "../components/Services";
import {
	getInputData,
} from "../module/services";

const mapStateToProps = (state) => ({
	inputData:state.services.inputData || {},
	resultTypes:state.services.resultTypes || {},
});

const mapActionCreators = {
	getInputData
};
export default connect(mapStateToProps, mapActionCreators)(Services);