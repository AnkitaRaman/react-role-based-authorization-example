import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import axios from 'axios';

export const userService = {
    getAll,
    getById,
    getAllCourses,
    getCourrseById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    
    return fetch(`http://34.145.73.148/user`, requestOptions).then(handleResponse);
}

function getById(userId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://34.145.73.148/user/${userId}`, requestOptions).then(handleResponse);
}

function getCourrseById(cId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    console.log("ahgshagsh")
    return fetch(`http://34.145.73.148/courses/${cId}`, requestOptions).then(handleResponse);
}

function getAllCourses() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    console.log("data")
    return fetch(`http://34.145.73.148/courses/`, requestOptions).then(handleResponse);
}