<template>
  <div class="popup">
    <div class="content">
      <div class="image">
        <img src="/assets/images/red_flag.png" alt="image" loading="lazy">
      </div>
      <h3 class="title">{{$t('report_popup.title')}}</h3>
      <label for="report">{{$t('report_popup.label')}}</label>
      <div class="input">
        <textarea id="report" v-model="body.report_reason" :placeholder="$t('report_popup.placeholder')"></textarea>
      </div>
      <button class="main-btn danger" @click="handleSubmit">
        {{$t('static_texts.send')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  // define route
  const route = useRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define api methods
  const {
    submitMethod,
    submitResult
  } = useApiMethods()

  // define toast methods
  const {
    showErrorToast
  } = useToastMsg()

  // define emits 
  const emit = defineEmits(['handleShowProblemReported' , 'handleShowReportProblem'])

  // define body 
  const body = ref({
    order_id : Number(route.params.id),
    report_reason : ''
  })

  // define handle submit function
  const handleSubmit = () =>{
    // emit('handleReportProblem')
    if(!body.value.report_reason){
      showErrorToast(globalStore.lang == 'ar' ? 'يجب إضافة سبب الشكوي' : 'You must add a reason for the complaint')
    }else{
      submitMethod('orders/report' , true , body.value , 'POST' , '' , '')
      // globalStore.setLoading(true)
    }
  }
  
  watchEffect(()=>{
    if(submitResult?.value?.data?.key == 'success'){
      emit('handleShowProblemReported')
      emit('handleShowReportProblem')
      // globalStore.setLoading(false)
    }
  })
</script>

<style lang="scss" scoped>
  .popup{
    .content{
      .image{
        max-width: 100px;
        margin: 0 auto 20px;
      }
      h3.title{
        font-size: clamp(20px , 4vw , 28px);
        font-weight: 500;
      }
      label{
        font-size: clamp(16px , 4vw , 20px);
        font-weight: 500;
      }
      .input{
        border-radius: 10px;
        border: 1px solid #9E9E9E;
        padding: 10px 12px;
        height: 100%;
        textarea{
          height: 170px;
          max-height: none;
        }
      }
    }
  }
</style>