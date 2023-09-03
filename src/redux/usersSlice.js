import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "userData",
    initialState: {
        users: [],
        loading: false,
        error: null,
        pageLimit: 4,
    },
    reducers: {
        loadUserStart: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        loadUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        },
        loadUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createUserStart: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        createUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        createUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteUserStart: (state, action) => {
            return {
                ...state,
                loading: true,
                users: action.payload
            }
        },
        deleteUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: state.users.filter((item) => item.id !== action.payload)
            }
        },
        deleteUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserStart: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        updateUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        updateUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        searchUserStart: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        searchUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        },
        searchUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        filterUserStart: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        filterUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        },
        filterUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        sortUserStart: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        sortUserSuccess: (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        },
        sortUserError: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    }
});

export const { loadUserStart, loadUserSuccess, loadUserError, createUserStart,
    createUserSuccess, createUserError, deleteUserStart, deleteUserSuccess,
    deleteUserError, updateUserStart, updateUserSuccess, updateUserError,
    searchUserStart, searchUserSuccess, searchUserError,
    filterUserStart, filterUserSuccess, filterUserError,
    sortUserStart, sortUserSuccess, sortUserError } = listSlice.actions;

export default listSlice.reducer