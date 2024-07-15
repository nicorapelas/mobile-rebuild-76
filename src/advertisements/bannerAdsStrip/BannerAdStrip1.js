import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const BannerAdStrip1 = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text>Banner ad strip 1</Text>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: 'grey',
    width: 320,
    height: 50,
  },
})

export default BannerAdStrip1
