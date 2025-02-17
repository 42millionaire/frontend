import { useState, useEffect, useRef } from "react";
import { getAPI } from "../apis/get";

export default function getUserInfo() { // (endpoint, transform = (data) => data) {
    const id = window.localStorage.getItem('memberId');
    const name = window.localStorage.getItem('memberName');

    return {id, name};
}
