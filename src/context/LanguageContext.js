import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const LanguageReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERRORS':
      return { ...state, error: action.payload }
    case 'FETCH_SAMPLE':
      return { ...state, languageSample: action.payload }
    case 'FETCH_STATUS':
      return { ...state, languageStatus: action.payload, loading: false }
    case 'FETCH_ALL':
      return { ...state, languages: action.payload, loading: false }
    case 'CREATE':
      return { ...state, languages: action.payload, loading: false }
    case 'SET_LANGUAGE_TO_EDIT':
      return { ...state, languageToEdit: action.payload }
    case 'EDIT':
      return { ...state, languages: action.payload, loading: false }
    case 'DELETE':
      return { ...state, languages: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const fetchLanguageSample = (dispatch) => async () => {
  try {
    const response = await ngrokApi.get('/api/language/sample')
    dispatch({ type: 'FETCH_SAMPLE', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchLanguageSample ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchLanguageStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/language/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchLanguageStatus ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchLanguages = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/language')
    dispatch({ type: 'FETCH_ALL', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchLanguages ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const createLanguage = (dispatch) => async (formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/language', formValues)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'CREATE', payload: response.data })
    return
  } catch (error) {
    console.log(`createLanguage ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const setLanguageToEdit = (dispatch) => (data) => {
  dispatch({ type: 'SET_LANGUAGE_TO_EDIT', payload: data })
  return
}

const editLanguage = (dispatch) => async (id, formValues) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(`/api/language/${id.id}`, formValues)
    dispatch({ type: 'EDIT', payload: response.data })
    return
  } catch (error) {
    console.log(`editLanguage ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteLanguage = (dispatch) => async (id) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete(`/api/language/${id}`)
    dispatch({ type: 'DELETE', payload: response.data })
    return
  } catch (error) {
    console.log(`deleteLanguage ERROR`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const addError = (dispatch) => (error) => {
  dispatch({ type: 'ADD_ERROR', payload: error })
  return
}

const clearLanguageErrors = (dispatch) => async () => {
  dispatch({ type: 'CLEAR_ERRORS', payload: null })
  return
}

export const { Context, Provider } = createDataContext(
  LanguageReducer,
  {
    fetchLanguageSample,
    fetchLanguageStatus,
    createLanguage,
    fetchLanguages,
    setLanguageToEdit,
    editLanguage,
    deleteLanguage,
    addError,
    clearLanguageErrors,
  },
  // Initial state
  {
    language: null,
    languages: null,
    languageSample: null,
    languageStatus: null,
    languageToEdit: null,
    loading: null,
    error: null,
  }
)
