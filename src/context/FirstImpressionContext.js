import _ from 'lodash'
import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

// Reducer
const FirstImpressionReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'ADD_UPLOAD_SIGNATURE':
      return { ...state, uploadSignature: action.payload }
    case 'CLEAR_UPLOAD_SIGNATURE':
      return { ...state, uploadSignature: action.payload }
    case 'FETCH_STATUS':
      return { ...state, firstImpressionStatus: action.payload, loading: false }
    case 'FETCH':
      return { ...state, firstImpression: action.payload, loading: false }
    case 'CREATE':
      return { ...state, firstImpression: action.payload, loading: false }
    case 'EDIT':
      return { ...state, [action.payload._id]: action.payload, loading: false }
    case 'DELETE':
      return { ...state, firstImpression: action.payload, loading: false }
    case 'ADD_VIDEO_OBJECT':
      return { ...state, videoObject: action.payload }
    case 'CLEAR_VIDEO_OBJECT':
      return { ...state, videoObject: action.payload }
    case 'SET_VIDEO_DEMO_SHOW':
      return { ...state, videoDemoShow: action.payload }
    case 'FETCH_DEMO_URL':
      return { ...state, videoDemoUrl: action.payload, loading: false }
    case 'SET_VIDEO_UPLOADING':
      return { ...state, videoUploading: action.payload }
    default:
      return state
  }
}

// Actions
const fetchFirsImpressionStatus = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/first-impression/status')
    dispatch({ type: 'FETCH_STATUS', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchFirsImpressionStatus ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchFirstImpression = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/first-impression')
    dispatch({ type: 'FETCH', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchFirstImpression ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const createUploadSignature = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/api/cloudinary/signature-request-no-preset'
    )
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'ADD_UPLOAD_SIGNATURE', payload: response.data })
    return
  } catch (error) {
    console.log(` ERROR: createUploadSignature`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearUploadSignature = (dispatch) => () => {
  dispatch({ type: 'CLEAR_UPLOAD_SIGNATURE', payload: null })
}

const createFirstImpression = (dispatch) => async (videoData) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/first-impression', videoData)
    dispatch({ type: 'CREATE', payload: response.data })
    return
  } catch (error) {
    console.log(`createFirstImpression ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteFirstImpression = (dispatch) => async (videoData) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      `/api/first-impression/delete`,
      videoData
    )
    dispatch({ type: 'DELETE', payload: response.data })
    return
  } catch (error) {
    console.log(`deleteFirstImpression ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const addVideoObject = (dispatch) => async (video) => {
  dispatch({ type: 'ADD_VIDEO_OBJECT', payload: video })
  return
}

const clearVideoObject = (dispatch) => async (video) => {
  dispatch({ type: 'CLEAR_VIDEO_OBJECT', payload: null })
  return
}

const setLoadingForUploading = (dispatch) => () => {
  dispatch({ type: 'LOADING' })
}

const setVideoDemoShow = (dispatch) => (value) => {
  dispatch({ type: 'SET_VIDEO_DEMO_SHOW', payload: value })
}

const fetchDemoVideoUrl = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/api/first-impression/demo')
    dispatch({ type: 'FETCH_DEMO_URL', payload: response.data })
    return
  } catch (error) {
    console.log(`fetchDemoVideoUrl ERROR:`, error)
    // await ngrokApi.post('/error', { error: error })
    return
  }
}

const setVideoUploading = (dispatch) => (value) => {
  dispatch({ type: 'SET_VIDEO_UPLOADING', payload: value })
}

export const { Context, Provider } = createDataContext(
  FirstImpressionReducer,
  {
    fetchFirsImpressionStatus,
    createFirstImpression,
    createUploadSignature,
    clearUploadSignature,
    fetchFirstImpression,
    deleteFirstImpression,
    addVideoObject,
    clearVideoObject,
    setLoadingForUploading,
    setVideoDemoShow,
    fetchDemoVideoUrl,
    setVideoUploading,
  },
  // Initial state
  {
    firstImpression: null,
    firstImpressionStatus: null,
    loading: null,
    videoObject: null,
    uploadSignature: null,
    videoDemoShow: false,
    videoDemoUrl: null,
    error: null,
    videoUploading: false,
  }
)
