import UserStats from "../components/UserStats";
import {connect} from "react-redux";
import * as actions from "../actions";

const dispatchToPropsMapper = dispatch => ({
    // functions to be written
    // fetchLikedAlbums: () =>
    //     actions.fetchLikedAlbums(dispatch)
});
const stateToPropsMapper = state => ({
    // albumResults: state.albumResults,
    // trackResults: state.trackResults,
    // artistResults: state.artistResults,
    // eventResults: state.eventResults,
    // modalToggle: state.modalToggle,
    // details: state.details,
    // flag: state.searchFlag
    username: state.username
});
const UserStatsContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(UserStats);
export default UserStatsContainer;