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

async function register(credentials) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  };
  return request('/api/register', options);
}

async function login(credentials) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  };

  const response = await request('/api/login', options);
  localStorage.setItem("accessToken", response.access_token);
  return response;
}

async function createTrip(tripDetails) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tripDetails)
  };
  const response = await authRequest('/api/trips', options);
  return response
}

async function getTrips() {
  const response = await authRequest('/api/trips');
  return response
}

async function deleteTrip(tripID) {
  const options = {
    method: 'DELETE',
  };
  const response = await authRequest(`/api/trips/${tripID}`, options);
  return response
}

async function editTrip({tripID, ...updates}) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  };
  const response = await authRequest(`/api/trips/${tripID}`, options);
  return response
}

export { request, authRequest, register, login, createTrip, getTrips, deleteTrip, editTrip};