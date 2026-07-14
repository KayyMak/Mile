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
