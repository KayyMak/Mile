async function request(path, options = {}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);

  if (!response.ok) {
    const errorBody = await response.json();
    const message = errorBody.detail ?? response.statusText;

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  // DELETE returns a literal JSON `null` body, not an empty one
  const data = await response.json();
  if (data === null) {
    return;
  }

  return data;
}

async function authRequest(path, options = {}) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    const error = new Error("No access token found");
    error.status = 401;
    throw error;
  }
  const mergedOptions = {...options};
  mergedOptions.headers = {...mergedOptions.headers, Authorization: `Bearer ${token}`};
  return request(path, mergedOptions);
}
