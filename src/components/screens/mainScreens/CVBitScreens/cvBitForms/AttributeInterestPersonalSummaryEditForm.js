import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useKeyboard } from '@react-native-community/hooks'

import FormHintModal from '../../../../common/modals/FormHintModal'
import FormCancelButton from '../../../../common/FormCancelButton'
import { Context as AttributeContext } from '../../../../../context/AttributeContext'
import { Context as InterestContext } from '../../../../../context/InterestContext'
import { Context as PersonalSummaryContext } from '../../../../../context/PersonalSummaryContext'
import { Context as UniversalContext } from '../../../../../context/UniversalContext'
import { Context as NavContext } from '../../../../../context/NavContext'

const AttributeInterestPersonalSummaryEditForm = ({ bit }) => {
  const [incomingBit, setIncomingBit] = useState('')
  const [attribute, setAttribute] = useState('')
  const [interest, setInterest] = useState('')
  const [personalSummary, setPersonalSummary] = useState('')

  const {
    state: { attributeToEdit },
    editAttribute,
  } = useContext(AttributeContext)

  const {
    state: { interestToEdit },
    editInterest,
  } = useContext(InterestContext)

  const {
    state: { personalSummaryToEdit },
    editPersonalSummary,
  } = useContext(PersonalSummaryContext)

  const {
    state: { tipSelected },
    tipSelectReset,
    buildCV,
  } = useContext(UniversalContext)

  const { setCVBitScreenSelected } = useContext(NavContext)

  const keyboard = useKeyboard()

  useEffect(() => {
    if (bit) setIncomingBit(bit)
  }, [bit])

  useEffect(() => {
    if (attributeToEdit) {
      const { attribute } = attributeToEdit
      setAttribute(attribute)
    }
  }, [attributeToEdit])

  useEffect(() => {
    if (interestToEdit) {
      const { interest } = interestToEdit
      setInterest(interest)
    }
  }, [interestToEdit])

  useEffect(() => {
    if (personalSummaryToEdit) {
      const { content } = personalSummaryToEdit
      setPersonalSummary(content)
    }
  }, [personalSummaryToEdit])

  const handleSaveAttribute = () => {
    if (attributeToEdit) {
      const { id } = attributeToEdit
      editAttribute({
        id,
        attribute: tipSelected ? tipSelected : attribute,
      })
      tipSelectReset()
      setCVBitScreenSelected('attribute')
      buildCV()
      setAttribute('')
      setIncomingBit('')
    }
  }

  const handleSaveInterest = () => {
    if (interestToEdit) {
      const { id } = interestToEdit
      editInterest({
        id,
        interest: tipSelected ? tipSelected : interest,
      })
      tipSelectReset()
      setCVBitScreenSelected('interest')
      buildCV()
      setAttribute('')
      setIncomingBit('')
    }
  }

  const handleSavePersonalSummary = () => {
    const { _id } = personalSummaryToEdit
    editPersonalSummary({ id: _id, content: personalSummary })
    tipSelectReset()
    setCVBitScreenSelected('personalSummary')
    setPersonalSummary('')
  }

  const selectFormFields = () => {
    switch (incomingBit) {
      case 'attribute':
        if (!attributeToEdit) return null
        const { id } = attributeToEdit
        return (
          <>
            <Text style={styles.inputHeading}>Attribute</Text>
            <TextInput
              style={styles.input}
              maxLength={25}
              textAlign="center"
              placeholder="attribute"
              value={tipSelected ? tipSelected : attribute}
              onChangeText={setAttribute}
              onFocus={() => {
                tipSelectReset()
              }}
              autoFocus={true}
              autoCorrect={true}
            />
            <Text style={styles.maxCharactersNote}>
              max 25 characters ({!attribute ? '0' : attribute.length}
              /25)
            </Text>
            <View style={styles.buttonContainer}>
              <FormCancelButton route="attribute" />
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={handleSaveAttribute}
              >
                <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.addButtonTextIos
                      : styles.addButtonText
                  }
                >
                  save
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )
      case 'interest':
        return (
          <>
            <Text style={styles.inputHeading}>Interenst</Text>
            <TextInput
              style={styles.input}
              maxLength={25}
              textAlign="center"
              placeholder="interest"
              value={tipSelected ? tipSelected : interest}
              onChangeText={setInterest}
              onFocus={() => {
                tipSelectReset()
              }}
              autoFocus={true}
              autoCorrect={true}
            />
            <Text style={styles.maxCharactersNote}>
              max 25 characters ({!interest ? '0' : interest.length}
              /25)
            </Text>
            <View style={styles.buttonContainer}>
              <FormCancelButton route="interest" />
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={handleSaveInterest}
              >
                <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.addButtonTextIos
                      : styles.addButtonText
                  }
                >
                  save
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )
      case 'personalSummary':
        return (
          <>
            <Text style={styles.inputHeading}>Personal summary</Text>
            <TextInput
              style={styles.inputTextArea}
              maxLength={330}
              multiline={true}
              numberOfLines={10}
              placeholder="personal summary"
              value={personalSummary}
              onChangeText={setPersonalSummary}
              autoCorrect={true}
              autoFocus={true}
            />
            <Text style={styles.maxCharactersNote}>
              max 330 characters ({!interest ? '0' : interest.length}
              /330)
            </Text>
            <View style={styles.buttonContainer}>
              <FormCancelButton route="personalSummary" />
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={handleSavePersonalSummary}
              >
                <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.addButtonTextIos
                      : styles.addButtonText
                  }
                >
                  save
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )
      default:
        break
    }
  }

  const renderForm = () => {
    return (
      <View style={styles.formBed}>
        {selectFormFields()}
        <FormHintModal bit={bit} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={
        Platform.OS === 'ios' && keyboard.keyboardShown === false
          ? styles.bedIos
          : styles.bedAndroid
      }
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="always"
      >
        {renderForm()}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  bedIos: {
    backgroundColor: '#232936',
    width: '100%',
    flex: 1,
    marginTop: -100,
  },
  bedAndroid: {
    backgroundColor: '#232936',
    width: '100%',
    flex: 1,
  },
  formBed: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 10,
  },
  inputHeading: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputTextArea: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    textAlignVertical: 'top',
    width: '85%',
    height: 200,
    borderRadius: 7,
    padding: 5,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    margin: 5,
    height: 40,
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonTextIos: {
    color: '#ffff',
    fontSize: 18,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 4,
  },
})

export default AttributeInterestPersonalSummaryEditForm
