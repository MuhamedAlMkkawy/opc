<template>
  <div>
    <div class="auth_page">
      <div class="container mx-auto">
        <div class="content">
          <form action="" @submit.prevent="handleSubmit">
            <LanguageSwitch />
            <h4>{{$t('code.title')}}</h4>
            <h5>{{$t('code.text')}}</h5>
            <div class="input">
              <div class="card flex justify-content-center">
                <InputOtp 
                  v-model="body.code" 
                  integerOnly 
                  @keydown.prevent.enter="handleSubmit" 
                />
              </div>
            </div>
            <button class="main-btn" type="submit">
              {{ $t('code.submit') }}
            </button>
            <p class="resend_text">
              {{$t('code.expired_text')}} 
              <span>{{ formattedMinutes }}:{{ formattedSeconds }}</span>
              <button :disabled="isTimerRunning" :class="isTimerRunning ? 'disabled' : ''" @click="handleResendCode">{{$t('code.resend_code')}}</button>
            </p>
          </form>
          <hr>
          <div class="side_image">
            <div class="image">
              <img src="/assets/images/logo.png" alt="image" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useTimer } from '~/composables/useTimer';

  
  // for not viweing the layout here 
  definePageMeta({
    layout: false,
  });

  // define useToastMsg
  const { showErrorToast } = useToastMsg()

  // define Api Methods
  const { submitMethod , getMethod } = useApiMethods()

  // define the global store
  const globalStore = useGlobalStore()

  // define body 
  const body = ref({
    code : '',
  })


  // Use the composable
  const { 
    formattedMinutes, 
    formattedSeconds, 
    isTimerRunning, 
    startTimer, 
    stopTimer 
  } = useTimer(2, 0);


  // define submit code form
  const handleSubmit = () => {
    if(body.value.code.length < 4) {
      showErrorToast(globalStore.lang == 'ar' ? 'الرجاء ادخال الكود الصحيح' : 'Please enter the correct code')
    }else{
      const activateForm = new FormData();
      activateForm.append('code', body.value.code);
      activateForm.append('phone', globalStore.userPhone);
      activateForm.append('device_id', globalStore.device_id);
      activateForm.append('device_type', 'web');
      submitMethod('activate?_method=patch', false , activateForm  , 'POST' , '/home')
    }
  }

  // define handle resend code
  const handleResendCode = () => {
    startTimer();
    getMethod(`resend-code?phone=${globalStore.userPhone}`,'' , false , true)
  }

  // Lifecycle hooks
  onMounted(() => {
    startTimer();
  });

  onUnmounted(() => {
    stopTimer();
  });
</script>

<style lang="scss" scoped>
  .input {
    border-bottom: unset;
  }

  .auth_page .main-btn {
    margin: 10px 0;
  }
</style>
