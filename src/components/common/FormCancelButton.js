import React, { useContext } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Context as NavContext } from '../../context/NavContext'

const FormCancelButton = ({ route }) => {
  const { setCVBitScreenSelected } = useContext(NavContext)

  const cancelButton = () => {
    return (
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => {
          setCVBitScreenSelected(route)
          Keyboard.dismiss()
        }}
      >
        <AntDesign name="back" style={styles.cancelButtonIcon} />
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.addButtonTextIos
              : styles.addButtonText
          }
        >
          cancel
        </Text>
      </TouchableOpacity>
    )
  }

  return cancelButton()
}

const styles = StyleSheet.create({
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
    margin: 5,
    height: 40,
  },
  addButtonTextIos: {
    color: '#ffff',
    fontSize: 18,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 4,
  },
  cancelButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
})

export default FormCancelButton
