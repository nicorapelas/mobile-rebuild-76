import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import DashboardScreen from './dashboard/DashboardScreen'
import ViewCVScreen from './viewCV/ViewCVScreen'
import ShareCVScreen from './shareCVScreen/ShareCVScreen'
import BannerAdRender from '../../../advertisements/bannerAdsStrip/BannerAdStripRender'
import { Context as NavContext } from '../../../context/NavContext'

const MainViewRender = () => {
  const {
    state: { navTabSelected },
  } = useContext(NavContext)

  const renderContent = () => {
    switch (navTabSelected) {
      case 'dashboard':
        return <DashboardScreen />
      case 'viewCV':
        return <ViewCVScreen />
      case 'shareCV':
        return <ShareCVScreen />
      default:
        break
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>{renderContent()}</View>
      <View style={styles.bannerContainer}>
        <BannerAdRender />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default MainViewRender
