import { call, fork, take } from "redux-saga/effects"
import { loginPending, logout } from "../redux/user/user.slide"
import { ILogin } from "../types/backend"
import { PayloadAction } from "@reduxjs/toolkit"


const authorize = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(">> login succeed")
            if (email === "dungnd@gmail.com" && password === "admin123") {
                localStorage.setItem("access_token", "dungnd")
                resolve("ok")
            }
            resolve("nothing")
        }, 5000)
    })
}
function* authSaga() {
    while (true) {
        const action: PayloadAction<ILogin> = yield take(loginPending)
        yield take(loginPending)
        // yield call(authorize, action.payload.email, action.payload.password)
        yield fork(authorize, action.payload.email, action.payload.password)

        yield take([logout, 'LOGOUT_ERROR'])
        console.log(">>> do logout")
    }

}
export default authSaga;