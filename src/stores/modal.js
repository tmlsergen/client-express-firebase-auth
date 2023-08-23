import {defineStore} from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        updateModal: false,
        deleteModal: false,
    }),
    getters: {
        getUpdateModal: (state) => state.updateModal,
        getDeleteModal: (state) => state.deleteModal,
    },
    actions: {
        async setUpdateModal(value) {
            this.updateModal = value
        },
        async setDeleteModal(value) {
            this.deleteModal = value
        }
    }
})
