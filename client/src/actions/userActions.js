import axios from 'axios';

import { GET_USERS, USERS_LOADING, GET_ERRORS } from './types';

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  }
}

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios.get('/api/users/all')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    )
}

export const createUser = (userData) => dispatch => {
  axios.post('/api/users/create', userData)
    .then(res => window.location.href = '/login')
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

export const editUser = (id, userData, history) => dispatch => {
  axios.patch(`/api/users/${id}`, userData)
    .then(res => {
      if (res) {
        window.location.href = '/login';
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteUser = (id) => dispatch => {
  axios.delete(`/api/users/${id}`)
    .then(res => {
      if (res) {
        window.location.href = '/login';
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}