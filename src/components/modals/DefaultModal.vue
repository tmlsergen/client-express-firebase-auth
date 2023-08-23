<script setup>
import {onMounted, reactive, watch} from "vue";
import {Modal} from 'bootstrap'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  modalName: {
    type: String,
    required: true
  },
  modalInfo: {
    type: Object,
    default: () => {
      return {
        icon: '',
        title: '',
        desc: '',
        acceptButtonText: '',
        cancelButtonText: '',
        closeButton: false
      }
    }
  },
})

const state = reactive({
  defaultModal: null
})

onMounted(() => {
  // eslint-disable-next-line no-undef
  state.defaultModal = new Modal('#' + props.modalName, {})
})

watch(() => props.show, (value) => {
  state.defaultModal.hide()
  if (value) {
    state.defaultModal.show()
  }
})

const closeModal = () => {
  return state.defaultModal.hide()
}
</script>

<template>
  <section>

    <div class="modal fade" :id="props.modalName" tabindex="-1" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="props.modalInfo.title" class="modal-title" id="exampleModalLabel">{{ props.modalInfo.title }}</h5>
            <button v-if="props.modalInfo.closeButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center modal-icon" v-if="props.modalInfo.icon">
              <i class="bi" :class="props.modalInfo.icon"></i>
            </div>
            <p class="text-center" v-if="props.modalInfo.desc">{{ props.modalInfo.desc }}</p>
          </div>
          <div class="modal-footer">
            <button v-if="props.modalInfo.cancelButtonText" type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('onClickNo'); closeModal;">
              {{ props.modalInfo.cancelButtonText }}
            </button>
            <button v-if="props.modalInfo.acceptButtonText" type="button" class="btn btn-primary" @click="$emit('onClickYes'); closeModal;">
              {{ props.modalInfo.acceptButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.success-icon-color{
  color: green;
  font-size: 70px;
}

.error-icon-color{
  color: #FF0000;
  font-size: 70px;
}

</style>