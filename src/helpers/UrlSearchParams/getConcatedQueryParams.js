function getConcatedQueryParams(params = {}) {
  let searchParams = "";
  Object.entries(params).forEach(([key, value], index) => {
    if (value) {
      searchParams += `&${key}=${value}`;
    }
  });

  return `?${searchParams.slice(1).toString()}`;
}

export default getConcatedQueryParams;
