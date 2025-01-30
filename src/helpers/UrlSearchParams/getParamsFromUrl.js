function getParamsFromUrl() {
  return `?${new URLSearchParams(window.location.search)}`;
}

export default getParamsFromUrl;
