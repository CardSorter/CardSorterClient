let exportString: string;
if (process.env.NODE_ENV === 'production') {
  exportString = 'https://usability.csd.auth.gr/card-sorter/api';
} else {
  exportString = 'http://127.0.0.1:5000';
}

export default exportString;
