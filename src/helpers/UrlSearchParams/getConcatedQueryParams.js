function getConcatedQueryParams(params = {}) {
  let searchParams = "";

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams += `&${key}=${value}`;
    }
  });

  return `?${searchParams.slice(1).toString()}`;
}

export default getConcatedQueryParams;
