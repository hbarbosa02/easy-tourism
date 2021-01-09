export const TOKEN = 'user_token'

export const setToken = access_token =>
    localStorage.setItem(TOKEN, access_token)

export const getToken = _ => localStorage.getItem(TOKEN)

export const getUser = _ => {
    if (isAuthenticated) {
        let token = getToken()
        if (token) {
            token = token.split('.')
            if (token[1]) {
                const userInfoHash = JSON.parse(
                    Buffer.from(token[1], 'base64').toString('ascii')
                )
    
                return userInfoHash
            }
        }
    }
}

export const eraseLocalStorage = () => localStorage.clear()

export const isAuthenticated = () => getToken() !== null
