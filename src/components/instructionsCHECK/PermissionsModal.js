import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { Context as UniversalContext } from '../../context/UniversalContext'

const PermissionsModal = ({ bit }) => {
  const [incomingBit, setIncomingBit] = useState('')

  const {
    state: { permissionsModalShow },
    togglePermissionsModal,
  } = useContext(UniversalContext)

  useEffect(() => {
    setIncomingBit(bit)
  }, [])

  const renderInstruction = () => {
    if (incomingBit === 'camera') return noCameraPermissions()
    return null
  }

  const noCameraPermissions = () => {
    return (
      <View style={styles.hitBed}>
        <Text style={styles.subHeading}>Camera access denied</Text>
        <Text>To fix this:</Text>
        <Text style={styles.stepHeading}>Step 1</Text>
        <Text style={styles.hintText}>Launch setting from home screen</Text>
        <Text style={styles.stepHeading}>Step 2</Text>
        <Text style={styles.hintText}>Search for 'CV Cloud' and tap it</Text>
        <Text style={styles.stepHeading}>Step 3</Text>
        <Text style={styles.hintText}>Turn Camera and Microphone on</Text>
      </View>
    )
  }

  const renderModal = () => {
    if (!bit) return null
    return (
      <Modal
        transparent={true}
        visible={permissionsModalShow}
        animationType="slide"
        onRequestClose={() => togglePermissionsModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.messageBed}>
            <View style={styles.headingBed}>
              <AntDesign name="infocirlce" style={styles.headingIcon} />
            </View>
            <View style={styles.hintListBed}>{renderInstruction()}</View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => togglePermissionsModal(false)}
            >
              <AntDesign style={styles.backButtonIcon} name="closecircle" />
              <Text style={styles.backButtonText}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return renderModal()
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  messageBed: {
    backgroundColor: '#232936',
    width: '80%',
    padding: 15,
    borderRadius: 10,
  },
  headingBed: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  headingText: {
    color: '#7ac6fa',
    fontSize: 28,
  },
  headingIcon: {
    color: '#7ac6fa',
    fontSize: 27,
    margin: 7,
  },
  subHeading: {
    color: '#7ac6fa',
    fontSize: 18,
    paddingBottom: 3,
    alignSelf: 'center',
  },
  hitBed: {
    paddingBottom: 7,
  },
  hintText: {
    color: '#7ac6fa',
    fontSize: 14,
  },
  stepHeading: {
    color: '#7ac6fa',
    fontWeight: '900',
    paddingTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 7,
    paddingTop: 2,
    fontSize: 20,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 18,
  },
})

export default PermissionsModal
