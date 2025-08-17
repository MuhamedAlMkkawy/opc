<template>
  <div class="popup complaint_popup rate_product_popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleRateProductPopup' , '')"></button>
      <i class="pi pi-star-fill"></i>
      <h3 class="title">{{$t('rate_product_popup.title')}}</h3>
      <Rating v-model="body.stars"/>
      <form action="">
        <label for="comment">{{$t('rate_product_popup.comment_placeholder')}}</label>
        <div class="input">
          <textarea 
            name="comment" 
            id="comment" 
            :placeholder="$t('rate_product_popup.comment_placeholder')"
            v-model="body.feedback"
          />
        </div>
      </form>
      <button class="main-btn" @click="handleSendFeedback">
        {{$t('rate_product_popup.send_btn')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  // define i18n library
  const  { t } = useI18n()

  // define route 
  const route = useRoute()

  // define props
  const props = defineProps({
    product_id : Number
  })

  // define emits
  const emit = defineEmits(["handleRateProductPopup" , 'handleShowSuccessPopup'])

  // define body 
  const body = ref({
    order_id : Number(route.params.id),
    product_id : props.product_id,
    stars : "",
    feedback : "",
  })
  
  // define use toast 
  const {
    showErrorToast
  } = useToastMsg()

  // define api methods
  const {
    submitMethod,
    submitResult,
  } = useApiMethods()

  // handle send feedback 
  const handleSendFeedback = () =>{
    if(!body.value.stars){
      showErrorToast(t('rate_product_popup.stars_error'))
    }else{
      submitMethod('orders/rate-product' , true , body.value , 'POST' , '' , '') 
    }
  }

  watchEffect(()=>{
    if(submitResult?.value?.data?.key == 'success'){
      emit('handleShowSuccessPopup')
      setTimeout(() => {  
        location.reload()
      }, 500);
    }
  })
</script>

<style lang="scss" scoped>
  .rate_product_popup{
    .content{
      .pi-star-fill{
        color: #FFC107;
        font-size: 80px;
        margin-bottom: 20px;
      }
      h3.title{
        font-size: 25px;
        font-weight: 500;
        margin-bottom: 20px;
      }
      .p-rating{
        justify-content: center ;
        gap: 15px !important;
        margin-bottom: 20px;
      }
      label{
        font-size: 24px;
        font-weight: 500;
      }
    }
  }
</style>