import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NavBar = () => {
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Text>NavBar</Text>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
  },
})

export default NavBar
