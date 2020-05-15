const api = 'http://note.dev.cloud.lightform.com';

export async function getNotes(pageNumber, limit = 4) {
  let response = await fetch(`${api}/notes?page=${pageNumber}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let result = await response.json();

  return result;
}

export async function getNote(id) {
  let response = await fetch(`${api}/notes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let result = await response.json();
  return result;
}

export async function createNote(title) {
  let body = { title, body: '' };

  let response = await fetch(`${api}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  let result = await response.json();

  return result;
}

export async function deleteNote(id) {
  let response = await fetch(`${api}/notes/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
}

export async function updateNote(id, { titleText, bodyText }) {
  let body = {};

  if (titleText) body.title = titleText;
  if (bodyText) body.body = bodyText;

  let response = await fetch(`${api}/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response;
}
