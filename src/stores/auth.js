import {defineStore} from 'pinia'

const baseUrl = import.meta.env.VITE_API_URL || ''

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
        token: localStorage.getItem('token') || ''
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        async loginUser(user) {
            const response = await fetch(baseUrl + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            if (!response.ok) {
                return false
            }

            let resp = await response.json()

            localStorage.setItem('token', resp.token)
            localStorage.setItem('login_status', 'true')
            this.user = resp.user
            this.token = resp.token

            console.log(this.user)

            return true
        },
        async refreshUser() {
            const response = await fetch(baseUrl + '/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })

            if (!response.ok) {
                return false
            }

            this.user = await response.json()

            return true
        },
        async logoutUser() {
            localStorage.removeItem('token')
            localStorage.removeItem('login_status')
            this.user = {}
            this.token = ''
        }
    }
})
