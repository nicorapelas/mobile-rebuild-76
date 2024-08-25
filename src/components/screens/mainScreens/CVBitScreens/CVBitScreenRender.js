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
import ContactInfoScreen from './contactInfo/ContactInfoScreen'
import ContactInfoCreateScreen from './contactInfo/ContactInfoCreateScreen'
import ContactInfoEditScreen from './contactInfo/ContactInfoEditScreen'
import SecondEduScreen from './secondEdu/SecondEduScreen'
import SecondEduCreateScreen from './secondEdu/SecondEduCreateScreen'
import SecondEduEditScreen from './secondEdu/SecondEduEditScreen'
import TertEduScreen from './tertEdu/TertEduScreen'
import TertEduCreateScreen from './tertEdu/TertEduCreateScreen'
import TertEduEditScreen from './tertEdu/TertEduEditScreen'
import EmployHistoryScreen from './employHistory/EmployHistoryScreen'
import EmployHistoryCreateScreen from './employHistory/EmployHistoryCreateScreen'
import EmployHistoryEditScreen from './employHistory/EmployHistoryEditScreen'
import ExperienceScreen from './experience/ExperienceScreen'
import ExperienceCreateScreen from './experience/ExperienceCreateScreen'
import ExperienceEditScreen from './experience/ExperienceEditScreen'
import ReferenceScreen from './reference/ReferenceScreen'
import ReferenceCreateScreen from './reference/ReferenceCreateScreen'
import ReferenceEditScreen from './reference/ReferenceEditScreen'
import PhotoScreen from './photo/PhotoScreen'
import PhotoCreateScreen from './photo/PhotoCreateScreen'
import PhotoEditScreen from './photo/PhotoEditScreen'
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
      case 'contactInfo':
        return <ContactInfoScreen />
      case 'contactInfoCreate':
        return <ContactInfoCreateScreen />
      case 'contactInfoEdit':
        return <ContactInfoEditScreen />
      case 'secondEdu':
        return <SecondEduScreen />
      case 'secondEduCreate':
        return <SecondEduCreateScreen />
      case 'secondEditEdit':
        return <SecondEduEditScreen />
      case 'tertEdu':
        return <TertEduScreen />
      case 'tertEduCreate':
        return <TertEduCreateScreen />
      case 'tertEduEdit':
        return <TertEduEditScreen />
      case 'employHistory':
        return <EmployHistoryScreen />
      case 'employHistoryCreate':
        return <EmployHistoryCreateScreen />
      case 'employHistoryEdit':
        return <EmployHistoryEditScreen />
      case 'experience':
        return <ExperienceScreen />
      case 'experienceCreate':
        return <ExperienceCreateScreen />
      case 'experienceEdit':
        return <ExperienceEditScreen />
      case 'reference':
        return <ReferenceScreen />
      case 'referenceCreate':
        return <ReferenceCreateScreen />
      case 'referenceEdit':
        return <ReferenceEditScreen />
      case 'photo':
        return <PhotoScreen />
      case 'photoCreate':
        return <PhotoCreateScreen />
      case 'photoEdit':
        return <PhotoEditScreen />
      default:
        break
    }
  }

  return renderCVBitScreen()
}

export default CVBitScreenRender
