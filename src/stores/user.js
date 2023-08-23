import {defineStore} from 'pinia'

const baseUrl = import.meta.env.VITE_API_URL || ''

export const useUserStore = defineStore('user', {
    state: () => ({
        users: []
    }),
    getters: {
        getUsers: (state) => state.users
    },
    actions: {
        async fetchUsers() {
            this.users = []
            const response = await fetch(baseUrl + '/users')

            if (!response.ok) {
                return false
            }

            this.users = await response.json()

            return true
        },
        async updateUser(id, username) {
            const response = await fetch(baseUrl + '/users/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
                },
                body: JSON.stringify({username: username})
            })

            if (!response.ok) {
                return false
            }

            await this.fetchUsers()

            return true;
        },
        async deleteUser(id) {
            const response = await fetch(baseUrl + '/users/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
                }
            })

            if (!response.ok) {
                return false
            }

            await this.fetchUsers()

            return true;
        }
    }
})
