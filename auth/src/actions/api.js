// import env from '../enviroment';

let exportString;
if (process.env.NODE_ENV === 'production') {
  exportString = 'http://usability.csd.auth.gr:8500';
} else {
  exportString = 'http://127.0.0.1:5000';
}

export default exportString;
