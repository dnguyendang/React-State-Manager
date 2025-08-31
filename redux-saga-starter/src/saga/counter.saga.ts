import { takeEvery, put, delay } from 'redux-saga/effects'

function* handleIncrease(action: any) {
    console.log(">>> check handleSaga: ", action)
    // yield delay(3000)
    yield put({
        type: "counter/increaseSagaFinish",
        payload: { value: 2 }
    })
}

function* handleDecrease(action: any) {
    console.log(">>> check handleSaga: ", action)
    yield put({
        type: "counter/decreaseSagaFinish",
        payload: { value: 2 }
    })
}

function* counterSaga() {
    yield takeEvery("counter/increaseSagaStart", handleIncrease)
    yield takeEvery("counter/decreaseSagaStart", handleDecrease)
}



export default counterSaga;