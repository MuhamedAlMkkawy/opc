<template>
  <div class="popup">
    <div class="content">
      <h1>{{$t('report_popup.confirm_reported')}}</h1>
      <div class="image">
        <img src="/assets/images/problem_reported.png" alt="image" loading="lazy">
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['handleShowProblemReported'])


  setTimeout(() => {
    emit('handleShowProblemReported')
  }, 1500);
</script>

<style lang="scss" scoped>
  h1{
    font-size: 45px;
    font-weight: 400;
    line-height: 1;
    max-width: 450px;
    margin: 0 auto;
    @media (max-width : 567px){
      font-size: 30px;
    }
  }
  .image{
    margin: 30px auto !important;
    @media (max-width : 567px){
      max-width: 150px !important;
    }
  }
</style>