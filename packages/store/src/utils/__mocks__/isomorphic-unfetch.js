class Fetch {
  fetchFunction = () => {};

  setFetchData = fetchFunction => {
    this.fetchFunction = fetchFunction;
  };

  main = (url, options) => {
    const fetchData = this.fetchFunction(url, options);

    this.fetchFunction = () => {};
    return fetchData;
  };
}

const fetch = new Fetch();

export const { setFetchData } = fetch;
export default fetch.main;
