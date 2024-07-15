import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import LoaderModal from '../../common/LoaderModal'

const EmailVerificationModal = ({
  message,
  email,
  buttonOneText,
  buttonTwoText,
}) => {
  const visible = !!message

  const {
    state: { loading },
    resendVerificationEmail,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)

  const {
    state: { userPlanformOS },
  } = useContext(UniversalContext)

  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor="rgba(0, 0, 0, 0.75)"
      overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
    >
      <View style={styles.messageBed}>
        <LoaderModal loading={loading} />
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
            clearApiMessage()
            clearErrorMessage()
          }}
        >
          <Text style={styles.button}>{buttonOneText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resendVerificationEmail({ email })}>
          <Text style={styles.resendLink}>{buttonTwoText}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  messageBed: {
    width: '80%',
    borderRadius: 7,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 25,
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
  },
  resendLink: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: '#288acd',
  },
})

export default EmailVerificationModal
