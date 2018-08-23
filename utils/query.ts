export function objectToQueryParams(params): string {
  return Object.keys(params)
    .map(key => {
      if (
        key !== "" &&
        typeof params[key] !== "undefined" &&
        params[key] !== ""
      ) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      }
    })
    .join("&");
}

export function getQueryParams() {
  if (typeof window !== "undefined") {
    const queryParamsString = window.location.search.substr(1);
    const queryParams = queryParamsString
      .split("&")
      .reduce((accumulator, singleQueryParam) => {
        const [key, value] = singleQueryParam.split("=");
        if (key !== "") {
          accumulator[key] = decodeURIComponent(value);
        }
        return accumulator;
      }, {});
    return queryParams;
  }
  return {};
}
