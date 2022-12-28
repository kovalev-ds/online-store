enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

type RequestOptions = {
  method: RequestMethod;
};

export const makeRequest = <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
  console.log('Requesting data...');

  return fetch(endpoint, options)
    .then((res) => res.json())
    .catch(console.log);
};
