<template>
  <div>
    <div class="auth_page">
      <div class="container mx-auto">
        <!-- {{ globalStore.pageBeforeCode }} -->
        <div class="content">
          <form action="" @submit.prevent="handleSubmit">
            <h4>{{$t('code.title')}}</h4>
            <h5>{{$t('code.text')}}</h5>
            <div class="input">
              <div class="card flex justify-content-center">
                <InputOtp 
                  v-model="codeValue" 
                  integerOnly 
                  @keydown.prevent.enter="handleSubmit" 
                />
              </div>
            </div>
            <button class="main-btn">
              {{ $t('code.submit') }}
            </button>
            <p class="resend_text">
              {{$t('code.expired_text')}} 
              <span>{{ formattedMinutes }}:{{ formattedSeconds }}</span>
              <button :class="{'disabled' : isTimerRunning}" :disabled="isTimerRunning" @click="handleResendCode">{{$t('code.resend_code')}}</button>
            </p>
          </form>
          <!-- <hr> -->
          <div class="side_image">
            <div class="image">
              <img src="/assets/images/contact_img.jpeg" alt="image" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </div>
    <SuccessPopup 
      v-if="showSuccessPopup"
      :message="$t('success_popup.change_phone')"
    />
  </div>
</template>

<script setup>
  // define global Store
  const globalStore = useGlobalStore()
  
  // define api methods
  const {
    getMethod ,
    submitMethod,
    submitResult
  } = useApiMethods()

  // Define OTP Code Value 
  const codeValue = ref(null);

  // Use the composable
  const { 
    formattedMinutes, 
    formattedSeconds, 
    isTimerRunning, 
    startTimer, 
    stopTimer 
  } = useTimer(2, 0);


  // handle success popup
  const showSuccessPopup = ref(false)
  const handleShowSuccessPopup = () =>{
    showSuccessPopup.value = !showSuccessPopup.value
  }

  // define submit code form
  const handleSubmit = () => {     
    globalStore.pageBeforeCode == 'check_phone' ? 
    submitMethod('current-phone-confirm-code' , true ,{ code : codeValue.value } , 'POST' , '/new_phone')
    : 
    submitMethod('change-phone-check-code' , true , { code : codeValue.value , phone : globalStore.userPhone } , 'POST' , '/home')
  }
  
  
  // handle resend code 
  const handleResendCode = () => {
    startTimer();
    getMethod('current-phone-send-code' , '' , true , true) 
    // getMethod('change-phone-check-code' , true , true)  
  }


  watchEffect(()=> {
    if(submitResult?.value?.data?.key == 'success' && submitResult?.value?.formApi == 'change-phone-check-code'){
      // console.log(submitResult?.value)
      handleShowSuccessPopup()
    }
  })

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
  .auth_page .content {
    justify-content: center;
    form{
      max-width: clamp(300px, 100%, 50%);
    }
    .side_image{
      max-width: 50%;
      flex-shrink: 0;
    }
  }
  .auth_page .main-btn {
    margin: 10px 0;
  }
</style>
