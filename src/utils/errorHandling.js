function handleAxiosError(error, callbackFn) {
  if (error.response) {
    // Request made and server responded with a status code not in 2xx
    /* console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
    console.log('Headers:', error.response.headers); */
    callbackFn(
      ` Status : ${error.response.status} Data : ${error.response.data}`,
      undefined
    );
  } else if (error.request) {
    // Request was made but no response received
    // console.log('No response received:', error.request);
    // callbackFn(` No response received: ${error.request}`, undefined);
    callbackFn(
      ` Unable to connect to this address (Server down or bad URL)`,
      undefined
    );
  } else {
    // Something happened setting up the request
    //console.log('Error Message:', error.message);
    callbackFn(`Bad location !!! `, undefined);
  }
}

module.exports = handleAxiosError;
