import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const TertEduReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'FETCH_SAMPLE':
      return { ...state, tertEduSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, tertEduStatus: action.payload, loading: false }
    case 'FETCH_TERT_EDUS':
      return { ...state, tertEdus: action.payload, loading: false }
    case 'CREATE':
      return { ...state, tertEdus: action.payload, loading: false }
    case 'SET_TERT_EDU_TO_EDIT':
      return { ...state, tertEduToEdit: action.payload }
    case 'EDIT':
      return { ...state, tertEdus: action.payload, loading: false }
    case 'DELETE':
      return { ...state, tertEdus: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const fetchTertEduSample = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/tertiary-education/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchTertEduStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/tertiary-education/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
  }
}

const fetchTertEdus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/tertiary-education')
    dispatch({ type: 'FETCH_TERT_EDUS', payload: response.data })
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
  }
}

const createTertEdu = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/tertiary-education', formValues)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE', payload: response.data })
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
  }
}

const setTertEduToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_TERT_EDU_TO_EDIT', payload: data })
}

const editTertEdu = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      `/api/tertiary-education/${id.id}`,
      formValues
    )
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'EDIT', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteTertEdu = (dispatch) => async (id, callback) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/tertiary-education/${id}`)
    dispatch({ type: 'DELETE', payload: response.data })
    callback()
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    callback()
  }
}

const addError = (dispatch) => (error) => {
  dispatch({ type: 'ADD_ERROR', payload: error })
}

const clearTertEduErrors = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
}

export const { Context, Provider } = createDataContext(
  TertEduReducer,
  {
    fetchTertEduSample,
    fetchTertEduStatus,
    fetchTertEdus,
    createTertEdu,
    setTertEduToEdit,
    editTertEdu,
    deleteTertEdu,
    addError,
    clearTertEduErrors,
  },
  // Initial state
  {
    tertEdu: null,
    tertEdus: null,
    tertEduSample: null,
    tertEduStatus: null,
    tertEduToEdit: null,
    loading: null,
    error: null,
  }
)
