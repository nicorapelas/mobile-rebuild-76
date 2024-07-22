import React, { useContext, useEffect } from 'react'

import AttributeScreen from './attribute/AttributeScreen'
import AttributeCreateScreen from './attribute/AttributeCreateScreen'
import AttributeEditScreen from './attribute/AttributeEditScreen'
import InterestScreen from './interest/InterestScreen'
import InterestCreateScreen from './interest/InterstCreateScreen'
import InterestEditScreen from './interest/InterestEditScreen'
import SkillScreen from './skill/SkillScreen'
import SkillCreateScreen from './skill/SkillCreateScreen'
import SkillEditScreen from './skill/SkillEditScreen'
import LanguageScreen from './language/LanguageScreen'
import LanguageCreateScreen from './language/LanguageCreateScreen'
import LanguageEditScreen from './language/LanguageEditScreen'
import PersonalInfoScreen from './personalInfo/PersonalInfoScreen'
import PersonalInfoCreateScreen from './personalInfo/PersonalInfoCreateScreen'
import PersonalInfoEditScreen from './personalInfo/PersonalInfoEditScreen'
import PersonalSummaryScreen from './personalSummary/PersonalSummaryScreen'
import PersonalSummaryCreateScreen from './personalSummary/PersonalSummaryCreateScreen'
import PersonalSummaryEditScreen from './personalSummary/PersonalSummaryEditScreen'
import { Context as NavContext } from '../../../../context/NavContext'

const CVBitScreenRender = () => {
  const {
    state: { CVBitScreenSelected },
  } = useContext(NavContext)

  const renderCVBitScreen = () => {
    switch (CVBitScreenSelected) {
      case 'attribute':
        return <AttributeScreen />
      case 'attributeCreate':
        return <AttributeCreateScreen />
      case 'attributeEdit':
        return <AttributeEditScreen />
      case 'interest':
        return <InterestScreen />
      case 'interestCreate':
        return <InterestCreateScreen />
      case 'interestEdit':
        return <InterestEditScreen />
      case 'skill':
        return <SkillScreen />
      case 'skillCreate':
        return <SkillCreateScreen />
      case 'skillEdit':
        return <SkillEditScreen />
      case 'language':
        return <LanguageScreen />
      case 'languageCreate':
        return <LanguageCreateScreen />
      case 'languageEdit':
        return <LanguageEditScreen />
      case 'personalInformation':
        return <PersonalInfoScreen />
      case 'personalInfoCreate':
        return <PersonalInfoCreateScreen />
      case 'personalInfoEdit':
        return <PersonalInfoEditScreen />
      case 'personalSummary':
        return <PersonalSummaryScreen />
      case 'personalSummaryCreate':
        return <PersonalSummaryCreateScreen />
      case 'personalSummaryEdit':
        return <PersonalSummaryEditScreen />
      default:
        break
    }
  }

  return renderCVBitScreen()
}

export default CVBitScreenRender
