<script setup>
import {computed, onMounted, ref} from "vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import TextInput from "@/components/inputs/TextInput.vue";

const selectedPage = ref(1)
// eslint-disable-next-line vue/no-dupe-keys
const limit = ref(10)
// eslint-disable-next-line vue/no-dupe-keys
const offSet = ref(0)

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  updateFields: {
    type: Array,
    default: () => {
      return []
    }
  },
  showFields: {
    type: Array,
    default: () => {
      return []
    }
  },
  limit: {
    type: Number,
    default: 10
  },
  offSet: {
    type: Number,
    default: 0
  },
  updateButtonText: String,
  deleteButtonText: String,
})

onMounted(async () => {
  limit.value = props.limit
  offSet.value = props.offSet
})

const emit = defineEmits([
  'onUpdate',
  'onDelete'
])

const head = computed(() => {
  if (props.showFields.length > 0) {
    return props.showFields
  }

  return Object.keys(props.data[0] ?? {})
})

const limitedData = computed(() => {
  return props.data.slice(offSet.value, offSet.value + limit.value)
})

const pagination = computed(() => {
  return Math.ceil(props.data.length / props.limit)
})

const fieldCheck = (field) => {
  return props.updateFields.includes(field)
}

const changePage = (page) => {
  selectedPage.value = page
  offSet.value = (page - 1) * limit.value
}

const updateData = async (id) => {
  emit('onUpdate', id)
}

const deleteData = async (id) => {
  emit('onDelete', id)
}
</script>

<template>
  <section class="p-2">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="title in head" :key="title">
            {{ title }}
          </th>
          <th v-if="props.updateButtonText">Update</th>
          <th v-if="props.deleteButtonText">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in limitedData" :key="index">
          <td>{{ offSet + index + 1 }}</td>
          <td v-for="title in head" :key="title">
            <span v-if="fieldCheck(title)">
              <text-input v-model="row[title]" />
            </span>
            <span v-else>
              {{ row[title] }}
            </span>
          </td>
          <td v-if="props.updateButtonText">
            <default-button :text="props.updateButtonText" color="success" @onClick="updateData(row.id ? row.id : index)" />
          </td>
          <td v-if="props.deleteButtonText">
            <default-button :text="props.deleteButtonText" color="danger" @onClick="deleteData(row.id ? row.id : index)" />
          </td>
        </tr>
      </tbody>
    </table>

    <nav class="d-flex justify-content-center">
      <ul class="pagination pagination-sm">
        <li v-for="page in pagination" :key="page" class="page-item">
          <a v-if="selectedPage !== page" class="page-link cursor" @click="changePage(page)">{{page}}</a>
          <span v-else class="page-link active" >{{page}}</span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>