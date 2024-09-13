import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import { Context as NavContext } from '../../../../context/NavContext'
import ShareCVForm from './ShareCVForm'

const ShareCVScreen = () => {
  const { setScreenSelected, setCVBitScreenSelected } = useContext(NavContext)

  const renderContent = () => {
    return (
      <View style={styles.bed}>
        <ShareCVForm />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
})

export default ShareCVScreen
