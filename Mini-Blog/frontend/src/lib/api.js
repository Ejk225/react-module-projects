const BASE_URL = "http://localhost:3002"

// helper pour les requêtes avec token
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
})

// AUTH
export const registerUser = (email, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  }).then(res => res.json())
}

export const loginUser = (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  }).then(res => res.json())
}

// ARTICLES
export const getArticles = () => {
  return fetch(`${BASE_URL}/articles`).then(res => res.json())
}

export const getArticle = (id) => {
  return fetch(`${BASE_URL}/articles/${id}`).then(res => res.json())
}

export const getMyArticles = (token) => {
  return fetch(`${BASE_URL}/my-articles`, {
    headers: authHeaders(token)
  }).then(res => res.json())
}

export const createArticle = (titre, contenu, token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ titre, contenu })
  }).then(res => res.json())
}

export const updateArticle = (id, titre, contenu, token) => {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ titre, contenu })
  }).then(res => res.json())
}

export const deleteArticle = (id, token) => {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
    headers: authHeaders(token)
  }).then(res => res.json())
}