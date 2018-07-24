import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://debeer-burgerbuilder.firebaseio.com/'
});



export default instance;