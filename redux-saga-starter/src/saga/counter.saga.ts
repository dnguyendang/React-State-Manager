import { takeEvery, put, delay } from 'redux-saga/effects'
import { decreaseSagaFinish, increaseSagaFinish } from '../redux/counter/counter.slide'

function* handleIncrease(action: any) {
    yield put(increaseSagaFinish({ value: 2 }))
}

function* handleDecrease(action: any) {
    yield put(decreaseSagaFinish({ value: 2 }))
}

function* counterSaga() {
    yield takeEvery("counter/increaseSagaStart", handleIncrease)
    yield takeEvery("counter/decreaseSagaStart", handleDecrease)
}



export default counterSaga;