import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-e7b7d.firebaseio.com/'
});



export default instance;