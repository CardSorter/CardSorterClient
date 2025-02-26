"use client"

import { useDispatch } from 'react-redux'
import {useEffect} from "react";
import {setAuthToken} from "actions/authAction";
import {fetchUsername} from "actions/headerAction";
import {fetchStudies} from "actions/studyAction";
import {getCookie} from "utils/cookies";
import {Dispatch} from "@reduxjs/toolkit";

export default function GetInitialStateFromServer() {
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(setAuthToken(getCookie('auth_token')));
        dispatch(fetchUsername());
        dispatch(fetchStudies());

    }, [dispatch]);

    return (
    <></>
    )
}