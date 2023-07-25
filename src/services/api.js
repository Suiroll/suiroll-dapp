
export const post = async (uri, body={}) => {
  const headers = {};

  const response = await fetch(uri, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    }
  });

  if(response.status >= 400) {
    throw new Error("Api Error");
  }

  const contentType = response.headers.get('content-type')
  if(contentType && contentType.indexOf('application/json') !== -1) {
    return await response.json()
  } else if(contentType && contentType.indexOf('text/plain') !== -1) {
    return await response.text()
  }

  return await response.text()
}

export const get = async (uri) => {
  const response = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if(response.status >= 400) {
    throw new Error("Api Error");
  }

  const contentType = response.headers.get('content-type')
  if(contentType && contentType.indexOf('application/json') !== -1) {
    return await response.json()
  } else if(contentType && contentType.indexOf('text/plain') !== -1) {
    return await response.text()
  }

  return await response.text()
}
