import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  TextInput,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { Fontisto, MaterialIcons } from '@expo/vector-icons'

import { keys } from '../../../../../../config/keys_dev'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import PhotoPermissions from './PhotoPermissions'
import FormHintModal from '../../../../common/modals/FormHintModal'
import FormCancelButton from '../../../../common/FormCancelButton'
import DoneButton from '../../../../links/DoneButton'
import { Context as PhotoContext } from '../../../../../context/PhotoContext'
import { Context as NavContext } from '../../../../../context/NavContext'

const PhotoCreateScreen = () => {
  const [modal, setModal] = useState(true)
  const [title, setTitle] = useState(null)
  const [imageUri, setImageUri] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState(null)
  const [galleryPermissionStatus, setGalleryPermissionStatus] = useState(null)

  const {
    state: { loading, uploadSignature },
    createPhoto,
    createUploadSignature,
    clearUploadSignature,
  } = useContext(PhotoContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    if (uploadSignature) {
      imageUpload()
    }
  }, [uploadSignature])

  const randomFileName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString()

  const imageUpload = () => {
    const { apiKey, signature, timestamp } = uploadSignature
    const data = new FormData()
    data.append('file', {
      uri: imageFile.uri,
      type: `image/${imageFile.uri.split('.')[1]}`,
      name: imageFile.name,
    })
    data.append('api_key', apiKey)
    data.append('signature', signature)
    data.append('timestamp', timestamp)
    data.append('upload_preset', 'photo')
    fetch(keys.cloudinary.uploadImageUrl, {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          clearUploadSignature()
          Alert.alert('Unable to upload image, please try again later')
          setCVBitScreenSelected('')
          return
        }
        createPhoto({
          title: title,
          photoUrl: data.url,
          publicId: data.public_id,
        })
        clearUploadSignature()
        setCVBitScreenSelected('photo')
      })
      .catch((err) => {
        Alert.alert('Unable to upload image, please try again later')
        return
      })
  }

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.15,
      })
      if (!data.canceled) {
        const { uri } = data.assets[0]
        let newFile = {
          uri: uri,
          type: `image/${uri.split('.')[1]}`,
          name: `${randomFileName}.${uri.split('.')[1]}`,
        }
        setImageUri(newFile.uri)
        setImageFile(newFile)
        setModal(false)
      }
    } else {
      setGalleryPermissionStatus(false)
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync()
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      if (!data.canceled) {
        const { uri } = data.assets[0]
        console.log(`uri:`, uri)
        let newFile = {
          uri: uri,
          type: `image/${uri.split('.')[1]}`,
          name: `${randomFileName}.${uri.split('.')[1]}`,
        }
        setImageUri(newFile.uri)
        setImageFile(newFile)
        setModal(false)
      }
    } else {
      setCameraPermissionStatus(false)
    }
  }

  const titleField = () => {
    if (!imageUri || imageUri.length < 1) return null
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps="always">
          <Image source={{ uri: imageUri }} style={styles.photo} />
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="image title"
            value={title}
            onChangeText={setTitle}
            autoCorrect={false}
            autoCapitalize="words"
          />
          <View style={styles.buttonContainer}>
            <FormCancelButton route="photo" />
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => createUploadSignature()}
            >
              <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
              <Text style={styles.addButtonText}>save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  const cameraOrGallery = () => {
    if (modal === false) return null
    return (
      <View>
        <TouchableOpacity
          style={styles.imageSelectButton}
          onPress={pickFromGallery}
        >
          <View style={styles.imageSelectButtonsBed}>
            <Fontisto style={styles.imageSelectButtonIcon} name="photograph" />
            <Text style={styles.imageSelectButtonText}>gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageSelectButton}
          onPress={pickFromCamera}
        >
          <View style={styles.imageSelectButtonsBed}>
            <Fontisto style={styles.imageSelectButtonIcon} name="camera" />
            <Text style={styles.imageSelectButtonText}>camera</Text>
          </View>
        </TouchableOpacity>
        <FormHintModal bit="photo" />
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    if (cameraPermissionStatus === false)
      return <PhotoPermissions bit="camera" />
    if (galleryPermissionStatus === false)
      return <PhotoPermissions bit="gallery" />
    return (
      <>
        <View style={styles.bed}>
          {cameraOrGallery()}
          {titleField()}
        </View>
        <DoneButton text="Cancel" routeName="photo" />
      </>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  imageSelectButton: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageSelectButtonsBed: {
    flexDirection: 'row',
  },
  imageSelectButtonText: {
    color: '#ffff',
    fontSize: 18,
    paddingVertical: 10,
  },
  imageSelectButtonIcon: {
    color: '#ffff',
    fontSize: 22,
    paddingTop: 10,
    paddingRight: 10,
  },
  cancelButtonIcon: {
    fontSize: 22,
    color: 'red',
    padding: 5,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 7,
    alignSelf: 'center',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    height: 40,
    marginLeft: 10,
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 5,
  },
})

export default PhotoCreateScreen
