import env from '../enviroment';

let exportString;
if (env === 'PRODUCTION') {
  exportString = 'http://83.212.97.237:8090';
} else {
  exportString = 'http://127.0.0.1:5000';
}

export default exportString;
