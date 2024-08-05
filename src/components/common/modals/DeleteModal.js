import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { Context as AttributeContext } from '../../../context/AttributeContext'
import { Context as CertificateContext } from '../../../context/CertificateContext'
import { Context as ContactInfoContext } from '../../../context/ContactInfoContext'
import { Context as EmployHistoryContext } from '../../../context/EmployHistoryContext'
import { Context as ExperienceContext } from '../../../context/ExperienceContext'
import { Context as FirstImpressionContext } from '../../../context/FirstImpressionContext'
import { Context as InterestContext } from '../../../context/InterestContext'
import { Context as LanguageContext } from '../../../context/LanguageContext'
import { Context as PersonalInfoContext } from '../../../context/PersonalInfoContext'
import { Context as PersonalSummaryContext } from '../../../context/PersonalSummaryContext'
import { Context as PhotoContext } from '../../../context/PhotoContext'
import { Context as SecondEduContext } from '../../../context/SecondEduContext'
import { Context as ReferenceContext } from '../../../context/ReferenceContext'
import { Context as SkillContext } from '../../../context/SkillContext'
import { Context as TertEduContext } from '../../../context/TertEduContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import { Context as NavContext } from '../../../context/NavContext'

const DeleteModal = ({ id, documentSelected, bit, publicId }) => {
  const [incomingBit, setIncomingBit] = useState('')
  const { deleteAttribute } = useContext(AttributeContext)
  const { deleteCertificate, fetchCertificates } =
    useContext(CertificateContext)
  const { deleteContactInfo, fetchContactInfo } = useContext(ContactInfoContext)
  const { deleteEmployHistory, fetchEmployHistorys } =
    useContext(EmployHistoryContext)
  const { deleteExperience, fetchExperiences } = useContext(ExperienceContext)

  const { deleteFirstImpression } = useContext(FirstImpressionContext)
  const { fetchInterests, deleteInterest } = useContext(InterestContext)
  const { fetchLanguages, deleteLanguage } = useContext(LanguageContext)
  const { fetchPersonalInfo, deletePersonalInfo } =
    useContext(PersonalInfoContext)
  const { fetchPersonalSummary, deletePersonalSummary } = useContext(
    PersonalSummaryContext
  )
  const {
    state: { assignedPhotoId },
    fetchPhotos,
    deletePhoto,
    clearAssignedPhoto,
  } = useContext(PhotoContext)
  const { fetchSecondEdus, deleteSecondEdu } = useContext(SecondEduContext)
  const { fetchReferences, deleteReference } = useContext(ReferenceContext)
  const { fetchSkills, deleteSkill } = useContext(SkillContext)
  const { fetchTertEdus, deleteTertEdu } = useContext(TertEduContext)

  const {
    state: { deleteModalShow, userPlanformOS },
    hideDeleteModal,
    toggleHideNavLinks,
  } = useContext(UniversalContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  useEffect(() => {
    setIncomingBit(bit)
  }, [])

  const photoDelete = () => {
    if (assignedPhotoId === id) {
      deletePhoto({ id, publicId }, () => {
        clearAssignedPhoto()
        fetchPhotos()
        toggleHideNavLinks(false)
      })
      return
    }
    deletePhoto({ id, publicId }, () => {
      fetchPhotos()
      toggleHideNavLinks(false)
    })
  }

  const selectAction = () => {
    if (incomingBit === 'attribute') {
      deleteAttribute(id)
    }
    if (incomingBit === 'certificate') {
      toggleHideNavLinks(true)
      deleteCertificate({ id, publicId }, () => {
        fetchCertificates()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'contact information') {
      toggleHideNavLinks(true)
      deleteContactInfo(id, () => {
        fetchContactInfo()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'employment history') {
      toggleHideNavLinks(true)
      deleteEmployHistory(id, () => {
        fetchEmployHistorys()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'experience') {
      toggleHideNavLinks(true)
      deleteExperience(id, () => {
        fetchExperiences()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'first impression') {
      toggleHideNavLinks(true)
      deleteFirstImpression({ id, publicId }, () => {
        setCVBitScreenSelected('dashboard')
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'language') {
      toggleHideNavLinks(true)
      deleteLanguage(id, () => {
        fetchLanguages()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'interest') {
      deleteInterest(id)
    }
    if (incomingBit === 'personal information') {
      toggleHideNavLinks(true)
      deletePersonalInfo(id, () => {
        fetchPersonalInfo()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'personal summary') {
      toggleHideNavLinks(true)
      deletePersonalSummary(id, () => {
        fetchPersonalSummary()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'photo') {
      toggleHideNavLinks(true)
      photoDelete()
    }
    if (incomingBit === 'reference') {
      toggleHideNavLinks(true)
      deleteReference(id, () => {
        fetchReferences()
        toggleHideNavLinks(false)
      })
    }
    if (incomingBit === 'secondary education') {
      deleteSecondEdu(id)
      setCVBitScreenSelected('secondEdu')
    }
    if (incomingBit === 'skill') {
      deleteSkill(id)
    }
    if (incomingBit === 'tertiary education') {
      toggleHideNavLinks(true)
      deleteTertEdu(id, () => {
        fetchTertEdus()
        toggleHideNavLinks(false)
      })
    }
    return null
  }

  const renderModal = () => {
    return (
      <Overlay
        isVisible={deleteModalShow}
        windowBackgroundColor="rgba(0, 0, 0, 0.7)"
        overlayBackgroundColor="rgba(0, 0, 0, 0)"
        width="auto"
        height="auto"
      >
        <View style={styles.messageBed}>
          <FontAwesome style={styles.icon} name="trash-o" />
          <Text
            style={
              userPlanformOS === 'ios'
                ? styles.messageTextIos
                : styles.messageTextAndroid
            }
          >
            delete {incomingBit}
          </Text>
          {documentSelected ? (
            <Text style={styles.documentSelectedText}>
              "{documentSelected}"
            </Text>
          ) : (
            <Text style={styles.noDocumentSelectedText}></Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              selectAction()
              hideDeleteModal()
            }}
          >
            <Text style={styles.buttonText}>delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setCVBitScreenSelected(incomingBit)
              hideDeleteModal()
            }}
          >
            <AntDesign name="closecircle" style={styles.backButtonIcon} />
            <Text style={styles.backButtonText}>cancel</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    )
  }

  return renderModal()
}

const styles = StyleSheet.create({
  messageBed: {
    backgroundColor: '#232936',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 7,
    borderColor: '#f56c6c',
    margin: -30,
  },
  icon: {
    color: '#F9B321',
    alignSelf: 'center',
    fontSize: 55,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  documentSelectedText: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 2,
  },
  noDocumentSelectedText: {
    paddingBottom: 3,
  },
  button: {
    backgroundColor: '#f56c6c',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#ffff',
    borderWidth: 2,
    alignSelf: 'center',
    width: 'auto',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#ffff',
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    paddingTop: 5,
    fontSize: 13,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 16,
  },
})

export default DeleteModal
