import { take, takeEvery, takeLatest, put, all, delay, fork, call } from "redux-saga/effects"
import { createUserError, createUserSuccess, deleteUserError, deleteUserSuccess, filterUserError, filterUserSuccess, loadUserError, loadUserSuccess, searchUserError, searchUserSuccess, sortUserError, sortUserSuccess, updateUserError, updateUserSuccess } from "./usersSlice"
import { createUsersApi, deleteUsersApi, filterUsersApi, loadUsersApi, searchUsersApi, sortUsersApi, updateUsersApi } from "./api"
import * as sagaActions from './sagaActions'
function* onLoadUsersStartAsync(page) {
    try {
        const responce = yield call(loadUsersApi,page)
        yield delay(500)
        yield put(loadUserSuccess(responce.data))
    } catch (error) {
        yield put(loadUserError(error.responce.data))
    }
}
function* onCreateUsersStartAsync(payload) {
    try {
        const responce = yield call(createUsersApi, payload.formValue)
        yield delay(1000)
        yield put(createUserSuccess(responce.data))
    } catch (error) {
        yield put(createUserError(error.responce.data))
    }
}
function* onDeleteUsersStartAsync(userId) {
    try {
        const responce = yield call(deleteUsersApi, userId.id)
        yield put(deleteUserSuccess(userId.id))
    } catch (error) {
        yield put(deleteUserError(error.responce.data))
    }
}

function* onUpdateUsersStartAsync({ id, formValue }) {
    try {
        const responce = yield call(updateUsersApi, id, formValue)
        yield put(updateUserSuccess())
    } catch (error) {
        yield put(updateUserError(error.responce.data))
    }
}
function* onSearchUsersStartAsync(query ) {
    try {
        const responce = yield call(searchUsersApi, query)
        yield put(searchUserSuccess(responce.data))
    } catch (error) {
        yield put(searchUserError(error.responce.data))
    }
}
function* onFilterUsersStartAsync(value) {
    try {
        const responce = yield call(filterUsersApi, value)
        yield put(filterUserSuccess(responce.data))
    } catch (error) {
        yield put(filterUserError(error.responce.data))
    }
}
function* onSortUsersStartAsync(value) {
    try {
        const responce = yield call(sortUsersApi, value)
        yield put(sortUserSuccess(responce.data))
    } catch (error) {
        yield put(sortUserError(error.responce.data))
    }
}


function* onLoadUsers() {
    yield takeEvery(sagaActions.LOAD_USERS_START, onLoadUsersStartAsync)
}
function* onCreateUsers() {
    yield takeLatest(sagaActions.CREATE_USER_START, onCreateUsersStartAsync)
}
function* onDeleteUser() {
    while (true) {
        const payload = yield take(sagaActions.DELETE_USER_START)
        yield call(onDeleteUsersStartAsync, payload)
    }
}
function* onUpdateUsers() {
    yield takeEvery(sagaActions.UPDATE_USER_START, onUpdateUsersStartAsync)
}
function* onSearchUsers() {
    yield takeEvery(sagaActions.SEARCH_USER_START, onSearchUsersStartAsync)
}
function* onFilterUsers() {
    yield takeEvery(sagaActions.FILTER_USER_START, onFilterUsersStartAsync)
}
function* onSortUsers() {
    yield takeEvery(sagaActions.SORT_USER_START, onSortUsersStartAsync)
}


const usersSagas = [fork(onLoadUsers), fork(onCreateUsers), fork(onDeleteUser), fork(onUpdateUsers)
    , fork(onSearchUsers),fork(onFilterUsers),fork(onSortUsers)]
export default function* rootSaga() {
    yield all([...usersSagas])
}