import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./userSagas";
import finalDataReducer from "./usersSlice";



let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        userData: finalDataReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
