import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Context as UniversalContext } from '../../../context/UniversalContext'
import { Context as SecondEduContext } from '../../../context/SecondEduContext'
import { Context as TertEduContext } from '../../../context/TertEduContext'
import { Context as EmployHistoryContext } from '../../../context/EmployHistoryContext'

const YearPicker = ({ bit, buttonText }) => {
  const [condensedYearArray, setCondensedYearArray] = useState([])

  const scrollViewRef = useRef(null)

  const {
    state: { yearPickerShow, yearSelected, startDate, endDate },
    setYearPickerShow,
    setYearPickerProps,
    clearYearPickerProps,
    setStartDate,
    setEndDate,
  } = useContext(UniversalContext)

  const { clearSecondEduErrors } = useContext(SecondEduContext)
  const { clearTertEduErrors } = useContext(TertEduContext)
  const { clearEmployHistoryErrors } = useContext(EmployHistoryContext)

  const yearsArray = []
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    yearsArray.push(i)
  }

  useEffect(() => {
    if (yearPickerShow === false) {
      clearYearPickerProps()
    }
  }, [yearPickerShow])

  useEffect(() => {
    if (startDate && endDate && parseInt(startDate) > parseInt(endDate)) {
      setEndDate(startDate)
    }
  }, [startDate, endDate])

  useEffect(() => {
    if (scrollViewRef.current) {
      const middleIndex = Math.floor(yearsArray.length / 2)
      scrollViewRef.current.scrollTo({ y: middleIndex * 70, animated: false })
    }
  }, [yearPickerShow])

  const handlePressYearSelect = (data) => {
    if (bit === 'startDate') setStartDate(data.toString())
    if (bit === 'endDate') setEndDate(data.toString())
    setYearPickerShow(false)
  }

  const CustomPicker = () => {
    return (
      <View style={styles.pickerBed}>
        <ScrollView ref={scrollViewRef} style={styles.scrollPicker}>
          {(condensedYearArray.length > 0 && bit === 'endDate'
            ? condensedYearArray
            : yearsArray
          ).map((year) => (
            <TouchableOpacity
              key={year}
              style={styles.pickerItem}
              onPress={() => handlePressYearSelect(year)}
            >
              <Text style={styles.pickerItemText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }

  const buttonTextStyle = () => {
    if (bit === 'startDate' && !startDate) return styles.dummyInputText
    if (bit === 'startDate' && startDate) return styles.inputText
    if (bit === 'endDate' && !endDate) return styles.dummyInputText
    if (bit === 'endDate' && endDate) return styles.inputText
  }

  const showPickerButton = () => {
    return (
      <TouchableOpacity
        style={styles.dummyInput}
        onPress={() => {
          setYearPickerShow(true)
          setYearPickerProps({ bit })
          clearSecondEduErrors()
          clearTertEduErrors()
          clearEmployHistoryErrors()
        }}
      >
        <Text style={buttonTextStyle()}>
          {bit !== 'startDate' ? null : startDate}
          {bit !== 'endDate' ? null : endDate}
          {bit === 'startDate' && !startDate ? buttonText : null}
          {bit === 'endDate' && !endDate ? buttonText : null}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (!yearPickerShow) {
      return showPickerButton()
    }
    return CustomPicker()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  dummyInput: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
  dummyInputText: {
    color: '#B6B8BA',
    marginTop: 17,
  },
  inputText: {
    color: 'black',
    marginTop: 17,
  },
  pickerBed: {
    backgroundColor: '#ffff',
    borderRadius: 7,
    margin: 20,
  },
  scrollPicker: {
    maxHeight: 200,
  },
  pickerItem: {
    padding: 10,
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 22,
    color: '#1a1a1a',
  },
})

export default YearPicker
