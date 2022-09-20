import React, { useEffect, useState } from "react";
import api from '../../api'
import styles from './currency-converter.module.css'
import { countryList } from "../../utils/countryList";

const Main = () => {
  const [convertPrice, setConvertPrice] = useState(100)
  const [exchangePrice, setExchangePrice] = useState()
  const [selectRemittanceCountry, setSelectRemittanceCountry] = useState('KRW')
  const [selectReceptionCountry, setSelectReceptionCountry] = useState('USD')
  const [remittanceCountryPrice, setRemittanceCountryPrice] = useState()
  const [receptionCountryPrice, setReceptionCountryPrice] = useState()
  const [errorMassage, setErrorMessage] = useState('')
  const [isVaild, setIsVaild] =  useState(false)
  

  useEffect(() => {
    api().then((res) => {
      res.map(m => {
        if(m.cur_unit.substring(0, 3) === selectRemittanceCountry) {
          let value = m.deal_bas_r.replace(',', '')
          setRemittanceCountryPrice(value)
        }
        if(m.cur_unit.substring(0, 3) === selectReceptionCountry) {
          let value = m.deal_bas_r.replace(',', '')
          setReceptionCountryPrice(value)
        }
      })
    })

    setExchangePrice((convertPrice / (receptionCountryPrice / remittanceCountryPrice)).toFixed(5))
    console.log(convertPrice / (receptionCountryPrice / remittanceCountryPrice))

    if(Number(convertPrice) < 0) {
      setIsVaild(false)
      setErrorMessage('0 이상의 값을 입력해주세요')
    } else if (isNaN(convertPrice)) {
      setIsVaild(false)
      setErrorMessage('숫자만 입력하세요')
    } else {
      setIsVaild(true)
      setErrorMessage('')
    }
  }, [selectRemittanceCountry, selectReceptionCountry, convertPrice, receptionCountryPrice, remittanceCountryPrice])
  
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
          <select className={styles.remittanceCountry} value={selectRemittanceCountry} onChange={(e) => setSelectRemittanceCountry(e.target.value)}>
            {countryList.map((country) => {
              return <option key={country.key} value={country.value.substring(0, 3)}>{country.value}</option>
            })}
          </select>
          <select className={styles.receptionCountry} value={selectReceptionCountry} onChange={(e) => setSelectReceptionCountry(e.target.value)}>
            {countryList.map((country) => {
              return <option key={country.key} value={country.value.substring(0, 3)}>{country.value}</option>
            })}
          </select>
        </div>
        <div className={styles.transform_message}>
          {isVaild ? (
            <>
              <p className={styles.outputPrice}>{convertPrice} {selectRemittanceCountry} <br /></p>
              <p className={styles.outputPrice}> = {exchangePrice} {selectReceptionCountry} </p>
            </>
          ) : (
            <p className={styles.errorMessage}>{errorMassage}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main