import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as PersonalSummaryContext } from '../../../../../context/PersonalSummaryContext'
// HERE.......
import PersonalSummaryEditForm from '../cvBitForms/personalSummary/PersonalSummaryEditForm'

const PersonalSummaryEditScreen = () => {
  const {
    state: { loading },
  } = useContext(PersonalSummaryContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <PersonalSummaryEditForm />
  }

  return renderContent()
}

export default PersonalSummaryEditScreen
