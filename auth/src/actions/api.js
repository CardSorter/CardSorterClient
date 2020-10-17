import env from '../enviroment';

let exportString;
if (env === 'PRODUCTION') {
  exportString = 'http://127.0.0.1:8500';
} else {
  exportString = 'http://127.0.0.1:5000';
}

export default exportString;
