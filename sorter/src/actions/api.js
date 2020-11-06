// import env from '../enviroment';

let exportString;
if (process.env.NODE_ENV === 'production') {
  exportString = 'http://155.207.201.74:8500';
} else {
  exportString = 'http://127.0.0.1:5000';
}

export default exportString;