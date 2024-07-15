import React, { useContext } from 'react'
import LoaderFullScreen from '../../../../common/LoaderFullScreen'
import { Context as LanguageContext } from '../../../../../context/LanguageContext'
import LanguageEditForm from '../cvBitForms/LanguageEditForm'

const LanguageCreateScreen = () => {
  const {
    state: { loading },
  } = useContext(LanguageContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <LanguageEditForm />
  }

  return renderContent()
}

export default LanguageCreateScreen
