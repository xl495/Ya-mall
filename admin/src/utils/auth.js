import Storage from './storage'
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Storage.get(TokenKey)
}

export function setToken(token) {
  return Storage.set(TokenKey, token)
}

export function removeToken() {
  return Storage.remove(TokenKey)
}
