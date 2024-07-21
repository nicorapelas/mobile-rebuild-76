import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import PersonalInfoBitButton from '../../../cvBitButtons/PersonalInfoBitButton'
import PersonalSummaryBitButton from '../../../cvBitButtons/PersonalSummaryBitButton'
import AttributeBitButton from '../../../cvBitButtons/AttributeBitButton'
import InterestBitButton from '../../../cvBitButtons/InterestBitButton'
import SkillBitButton from '../../../cvBitButtons/SkillBitButton'
import CVBitScreenRender from '../CVBitScreens/CVBitScreenRender'
import LanguageBitButton from '../../../cvBitButtons/LanguageBitButton'
import { Context as NavContext } from '../../../../context/NavContext'

const DashboardScreen = () => {
  const {
    state: { CVBitScreenSelected },
  } = useContext(NavContext)

  const renderContent = () => {
    if (CVBitScreenSelected === '') {
      return (
        <View style={styles.container}>
          <PersonalInfoBitButton />
          <PersonalSummaryBitButton />
          <LanguageBitButton />
          <AttributeBitButton />
          <InterestBitButton />
          <SkillBitButton />
        </View>
      )
    }
    return <CVBitScreenRender />
  }

  return renderContent()
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})

export default DashboardScreen
