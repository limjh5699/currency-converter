import React, { useState } from "react";
import styles from './currency-converter.module.css'
import { countryList } from "../../utils/countryList";

const Main = () => {
  const [convertPrice, setConvertPrice] = useState(100)
  const [selectRemittanceCountry, setSelectRemittanceCountry] = useState('KRW')
  const [selectReceptionCountry, setSelectReceptionCountry] = useState('USD')
  const [errorMassage, setErrorMessage] = useState('')
  const [isVaild, setIsVaild] = useState(false)

  const checkValue = (value) => {
    if(Number(value) < 0) {
      setIsVaild(false)
      setErrorMessage('0 이상의 값을 입력해주세요')
    } else if (isNaN(value)) {
      setIsVaild(false)
      setErrorMessage('숫자만 입력하세요')
    } else {
      setIsVaild(true)
      setErrorMessage('')
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <span>금액</span>
          <div className={styles.inputPrice}>
            <input type='text' value={convertPrice} onChange={(e) => setConvertPrice(e.target.value)} />      
          </div>
        </div>
        <div className={styles.selectCountry}>
          <select className={styles.remittanceCountry} onChange={(e) => setSelectRemittanceCountry(e.target.value)}>
            <option value="KRW" selected>KRW(한국/원)</option>
            <option value="USD">USD(미국/달러)</option>
            {countryList.map((country) => {
              return <option value={country.split(0, 3)}>{country}</option>
            })}
          </select>
          <select className={styles.receptionCountry} onChange={(e) => setSelectReceptionCountry(e.target.value)}>
            <option value="KRW">KRW(한국/원)</option>
            <option value="USD" selected>USD(미국/달러)</option>
            {countryList.map((country) => {
              return <option value={country.split(0, 3)}>{country}</option>
            })}
          </select>
        </div>
        <div className={styles.transform_btn}>
          <input type='button' value="변환" onClick={() => {checkValue(convertPrice)}} />
        </div>
        <div className={styles.transform_message}>
          {isVaild ? (
            <p className={styles.outputPrice}><bold>1 USD = 1396.75</bold></p>
          ) : (
            <p className={styles.errorMessage}>{errorMassage}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main