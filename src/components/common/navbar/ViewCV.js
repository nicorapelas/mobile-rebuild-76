import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Context as NavContext } from '../../../context/NavContext'
import { normalize } from '../../../utils/fontUtils'

const ViewCV = () => {
  const {
    state: { navTabSelected },
    setNavTabSelected,
  } = useContext(NavContext)

  const handlePress = () => {
    setNavTabSelected('viewCV')
  }

  const renderContent = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text
          style={navTabSelected === 'viewCV' ? styles.textActive : styles.text}
        >
          View CV
        </Text>
      </TouchableOpacity>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  text: {
    color: '#278ACD',
    textAlign: 'center',
    fontSize: normalize(13),
  },
  textActive: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: normalize(13),
  },
})

export default ViewCV
