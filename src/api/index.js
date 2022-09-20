const API_KEY = process.env.REACT_APP_API_KEY // input your api key
const URL = `/site/program/financial/exchangeJSON?authkey=${API_KEY}&searchdate=20220914&data=AP01`

const getExchangeRate = async () => {
  return fetch(URL).then(res => res.json())
} 

export default getExchangeRate