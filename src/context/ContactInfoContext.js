import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const ContactInfoReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: null }
    case 'FETCH_SAMPLE':
      return { ...state, contactInfoSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, contactInfoStatus: action.payload, loading: false }
    case 'FETCH_CONTACT_INFO':
      return { ...state, contactInfo: action.payload, loading: false }
    case 'CREATE':
      return { ...state, contactInfo: action.payload, loading: false }
    case 'EDIT':
      return { ...state, contactInfo: action.payload, loading: false }
    case 'SET_CONTACT_INFO_TO_EDIT':
      return { ...state, contactInfoToEdit: action.payload }
    case 'DELETE':
      return { ...state, contactInfo: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const fetchContactInfoSample = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/contact-info/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchContactInfoSample ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchContactInfoStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/contact-info/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchContactInfoStatus ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchContactInfo = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/contact-info')
    dispatch({ type: 'FETCH_CONTACT_INFO', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchContactInfo ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchContactInfoInBackground = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/contact-info')
    dispatch({ type: 'FETCH_CONTACT_INFO', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchContactInfoInBackground ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const createContactInfo = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/contact-info', formValues)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE', payload: response.data })
    return
  } catch (error) {
    console.log(`createContactInfo ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const setContactInfoToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_CONTACT_INFO_TO_EDIT', payload: data })
  return
}

const editContactInfo = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      `/api/contact-info/${id.id}`,
      formValues
    )
    dispatch({ type: 'EDIT', payload: response.data })
    return
  } catch (error) {
    console.log(`editContactInfo ERROR: `, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteContactInfo = (dispatch) => async (id) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/contact-info/${id}`)
    dispatch({ type: 'DELETE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const addError = (dispatch) => (error) => {
  dispatch({ type: 'ADD_ERROR', payload: error })
  return
}

const clearErrors = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERRORS' })
  return
}

export const { Context, Provider } = createDataContext(
  ContactInfoReducer,
  {
    fetchContactInfoSample,
    fetchContactInfoStatus,
    fetchContactInfo,
    fetchContactInfoInBackground,
    createContactInfo,
    setContactInfoToEdit,
    editContactInfo,
    deleteContactInfo,
    addError,
    clearErrors,
  },
  // Initial state
  {
    contactInfo: null,
    contactInfoStatus: null,
    contactInfoToEdit: null,
    loading: null,
    error: null,
  }
)
