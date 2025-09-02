import { takeEvery } from "redux-saga/effects";
import { fetchUserPending } from "../redux/user/user.slide";

function* handleFetchUser() {
    console.log(">>> check handleFetchUser")
}

function* userSaga() {
    yield takeEvery(fetchUserPending, handleFetchUser)
    console.log(">>> check userSaga")
}



export default userSaga;