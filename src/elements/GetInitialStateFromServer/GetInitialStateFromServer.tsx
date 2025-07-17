"use client"

import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from "react";
import {setAuthToken} from "actions/authAction";
import {fetchUsername} from "actions/headerAction";
import {fetchStudies} from "actions/studiesAction";
import {getCookie} from "utils/cookies";
import {Dispatch} from "@reduxjs/toolkit";
import StateSchema from "../../reducers/StateSchema";

export default function GetInitialStateFromServer() {
    const dispatch: Dispatch<any> = useDispatch();

    // State
    const authToken = useSelector((state: StateSchema) => state.auth.token);

    useEffect(() => {
        if (authToken) {
            dispatch(fetchUsername());
            dispatch(fetchStudies());
        }
    }, [dispatch, authToken]);

    return (
    <></>
    )
}