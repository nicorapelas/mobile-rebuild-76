import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as NavContext } from '../../context/NavContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const ModalLink = ({ message, routeName, buttonText }) => {
  const { clearErrorMessage, clearApiMessage } = useContext(AuthContext)

  const { setScreenSelected } = useContext(NavContext)

  const {
    state: { userPlanformOS },
  } = useContext(UniversalContext)

  const visible = !!message

  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor="rgba(0, 0, 0, 0.75)"
      overlayStyle={styles.overlay}
    >
      <View style={styles.messageBed}>
        <Text
          style={
            userPlanformOS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          {message}
        </Text>
        <TouchableOpacity
          onPress={() => {
            clearErrorMessage()
            clearApiMessage()
            setScreenSelected('loginEmail')
          }}
        >
          <Text style={styles.button}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: 'auto',
    height: 'auto',
  },
  messageBed: {
    width: '90%',
    borderRadius: 7,
    alignItems: 'center',
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  button: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: '#59BB46',
    marginTop: 20,
  },
})

export default ModalLink
