<template>
  <div class="popup complaint_popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowComplaintPopup')"></button>
      <h3 class="title">{{$t('complaint.reply_title')}}</h3>
      <p class="text">
        {{props.complaintReply}}
      </p>
      <button class="main-btn" @click="emit('handleShowComplaintPopup')">
        {{$t('static_texts.back')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['handleShowComplaintPopup'])

  // define props
  const props = defineProps({
    complaintReply : {
      type : String ,
      default : ''
    }
  })
</script>

<style lang="scss" scoped>

</style>