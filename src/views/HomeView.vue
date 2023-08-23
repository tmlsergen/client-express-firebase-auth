<script setup>

import {useUserStore} from "@/stores/user";
import {computed, onMounted, ref} from "vue";
import DataTable from "@/components/DataTable.vue";
import {useAuthStore} from "@/stores/auth";
import LoadingSpin from "@/components/LoadingSpin.vue";
import DefaultModal from "@/components/modals/DefaultModal.vue";
import {useModalStore} from "@/stores/modal";

const updateFields = ref(['username'])
const showFields = ref(['username', 'role'])
const updateModalInfo = ref({})
const deleteModalInfo = ref({})

const userStore = useUserStore()
const modalStore = useModalStore()
const authStore = useAuthStore()

const limit = ref(10)
const offSet = ref(0)

onMounted(async () => {
  await fetchUsers()
})

const authUser = computed(() => {
  return authStore.getUser
})

const users = computed(() => {
  return userStore.getUsers ?? []
})

const updateModal = computed(() => {
  return modalStore.getUpdateModal
})

const deleteModal = computed(() => {
  return modalStore.getDeleteModal
})

const fetchUsers = async () => {
  await modalStore.setUpdateModal(false)
  await modalStore.setDeleteModal(false)
  await userStore.fetchUsers()
}

const updateUser = async (id) => {
  await modalStore.setUpdateModal(false)

  let user = users.value.find(user => user.id === id)

  let status = await userStore.updateUser(user.id, user.username)
  if (!status) {
    updateModalInfo.value = {
      icon: 'bi-exclamation-circle-fill error-icon-color',
      title: 'Error',
      desc: 'Something went wrong',
      acceptButtonText: 'OK'
    }

    await modalStore.setUpdateModal(true)
    return
  }

  updateModalInfo.value = {
    icon: 'bi-check-circle-fill success-icon-color',
    title: 'Success',
    desc: 'User updated successfully',
    acceptButtonText: 'OK'
  }
  await modalStore.setUpdateModal(true)
}

const deleteUser = async (id) => {
  await modalStore.setDeleteModal(false)

  let user = users.value.find(user => user.id === id)

  let status = await userStore.deleteUser(user.id)
  if (!status) {
    deleteModalInfo.value = {
      icon: 'bi-exclamation-circle-fill error-icon-color',
      title: 'Error',
      desc: 'Something went wrong',
      acceptButtonText: 'OK'
    }

    await modalStore.setDeleteModal(true)
    return
  }

  deleteModalInfo.value = {
    icon: 'bi-check-circle-fill success-icon-color',
    title: 'Success',
    desc: 'User deleted successfully',
    acceptButtonText: 'OK'
  }
  await modalStore.setDeleteModal(true)
}
</script>

<template>
  <section>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Manage Users</h5>
        </div>
        <div class="card-body">
          <ul class="nav nav-tabs p-2" id="myTab" role="tablist">
            <li @click="fetchUsers" class="nav-item" role="presentation">
              <button class="nav-link active" id="list-users-tab" data-bs-toggle="tab" data-bs-target="#list-users"
                      type="button" role="tab" aria-controls="list-users" aria-selected="true">
                List Users
              </button>
            </li>
            <li @click="fetchUsers" v-if="authUser.role === 'admin'" class="nav-item" role="presentation">
              <button class="nav-link" id="update-users-tab" data-bs-toggle="tab" data-bs-target="#update-users"
                      type="button" role="tab" aria-controls="update-users" aria-selected="false">
                Update Users
              </button>
            </li>
            <li @click="fetchUsers" v-if="authUser.role === 'admin'" class="nav-item" role="presentation">
              <button class="nav-link" id="delete-users-tab" data-bs-toggle="tab" data-bs-target="#delete-users"
                      type="button" role="tab" aria-controls="delete-users" aria-selected="false">
                Delete Users
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="list-users" role="tabpanel" aria-labelledby="list-users-tab">
              <data-table v-if="users.length" :showFields="showFields" :data="users" :off-set="offSet" :limit="limit" />
              <LoadingSpin v-else/>
            </div>
            <div v-if="authUser.role === 'admin'" class="tab-pane fade" id="update-users" role="tabpanel"
                 aria-labelledby="update-users-tab">
              <data-table v-if="users.length" :showFields="showFields" :data="users" :updateFields="updateFields"
                          update-button-text="Update Username" @onUpdate="updateUser"/>
              <LoadingSpin v-else/>
            </div>
            <div v-if="authUser.role === 'admin'" class="tab-pane fade" id="delete-users" role="tabpanel"
                 aria-labelledby="delete-users-tab">
              <data-table v-if="users.length" :showFields="showFields" :data="users" delete-button-text="Delete User"
                          @onDelete="deleteUser"/>
              <LoadingSpin v-else/>
            </div>
          </div>
        </div>
      </div>
    </div>


    <default-modal
        :show="updateModal"
        modal-name="updateModal"
        :modal-info="updateModalInfo"
        @onClickYes="fetchUsers"
    />


    <default-modal
        :show="deleteModal"
        modal-name="deleteModal"
        :modal-info="deleteModalInfo"
        @onClickYes="fetchUsers"
    />

  </section>
</template>