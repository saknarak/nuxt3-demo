import axios from 'axios'

console.log('lib axios')
const token = sessionStorage.getItem('token')
const opt = {}

if (token) {
  opt.headers = {
    'X-Somsak': '1234',
    Authorization: `Bearer ${token}`,
  }
}

const _axios = axios.create(opt)

export default _axios
