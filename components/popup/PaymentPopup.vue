<template>
  <div class="popup complaint_popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowPaymentPopup')"></button>
      <h3 class="title">{{$t('payment_popup.title')}}</h3>
      <ul>
        <li>
          {{$t('payment_popup.tax_price')}} 
          <span>
            {{props.orderData.vat_amount}} {{props.orderData.currency}}
          </span>
        </li>
        <li>
          {{$t('payment_popup.total')}}  
          <span>
            {{props.orderData.total}} {{ props.orderData.currency }}
          </span>
        </li>
        <li v-if="submitResult?.data?.data?.disc_amount">
          {{$t('payment_popup.price_after_discount')}}  
          <span>
            {{props.orderData.total - submitResult?.data?.data?.disc_amount}} {{ props.orderData.currency }}
          </span>
        </li>
      </ul>
      <hr>
      <div class="discount">
        <h6>{{$t('payment_popup.discount_copon')}} </h6>
        <div class="input">
          <input 
            type="text"
            :placeholder="$t('payment_popup.discount_copon_placeholder')"
            v-model="body.coupon_num"
            :disabled="submitResult?.data?.data?.disc_amount"
          >
          <button 
            :class="['main-btn' , {'disabled' : submitResult?.data?.data?.disc_amount}]" 
            @click="checkCopoun"
            >
            {{$t('payment_popup.apply')}}
          </button>
        </div>
      </div>
      <hr>
      <div class="payment_methods">
        <h6>{{$t('payment_popup.payment_method')}}</h6>
        <div class="inputs">
          <div class="input-wrap">
            <input 
              type="radio" 
              name="payment_method" 
              id="wallet"
              value="wallet"
              v-model="paymentMethod"
            >
            <label for="wallet">{{$t('payment_popup.payment_methods.wallet')}}</label>
          </div>
          <div class="input-wrap">
            <input 
              type="radio" 
              name="payment_method" 
              id="Cash"
              value="cash"
              v-model="paymentMethod"
            >
            <label for="Cash">{{$t('payment_popup.payment_methods.cash')}}</label>
          </div>
          <div class="input-wrap">
            <input 
              type="radio" 
              name="payment_method" 
              id="Electronic"
              value="electronic"
              v-model="paymentMethod"
            >
            <label for="Electronic">{{$t('payment_popup.payment_methods.electronic')}}</label>
          </div>
        </div>
      </div>
      <div class="flex_buttons">
        <button class="main-btn reversed" @click="emit('handleShowPaymentPopup')">
          {{$t('payment_popup.back')}}
        </button>
        <button class="main-btn" @click="handlePayment">
          {{$t('payment_popup.pay')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()


  // define emits 
  const emit = defineEmits(['handleShowPaymentPopup'])

  // define props
  const props = defineProps({
    orderData : Object
  })

  const paymentMethod = ref()

  // define body
  const body = ref({
    coupon_num : '' ,
    order_id : props.orderData.order_id
  })
  
  // define toast methods
  const {
    showErrorToast
  } = useToastMsg()

  // define api methods
  const {
    submitMethod,
    submitResult
  } = useApiMethods()

  // handle apply copoun
  const checkCopoun = () => {
    const copounData = new FormData()
    copounData.append('coupon_num' , body.value.coupon_num)
    copounData.append('total_price' , props.orderData.total)
    if(!body.value.coupon_num){
      showErrorToast(
        globalStore.lang == 'ar' ?
        'يجب إضافة الكوبون أولا' : 
        'You must add the coupon first'
      )
    }else{
      submitMethod('check-coupon' , true , copounData , 'POST' , '' , '')
    }
  }


  // handle payment
  const handlePayment = () => {
    submitMethod(`orders/${paymentMethod.value}-payment` , true , body.value , 'POST' , 'reload_page' , '')
  }

  watchEffect(()=>{
    if(submitResult?.value?.endPoint.startsWith('orders/') && submitResult?.value?.data?.key == 'success'){
      emit('handleShowPaymentPopup')
    }
    // if(submitResult?.value?.endPoint == 'check-coupon' && submitResult?.value?.data?.key == 'success'){
      
    // }
  })
</script>

<style lang="scss" scoped>
  .popup{
    .content{
      padding-inline: clamp(14px , 4vw , 25px);
    }
    ul{
      text-align: start;
      li{
        font-size: clamp(16px , 4vw , 20px);
        font-weight: 500;
        @include displayFlex($justify : space-between , $gap : 0);
        width: 200px;
        span{
          font-weight: 400;
        }
        &:last-of-type{
          font-weight: 700;
          span{
            font-weight: 700;
          }
        }
        &:nth-of-type(3){
          width: fit-content !important;
        }
      }
    }
    hr{
      margin-block: clamp(14px , 4vw , 24px) clamp(14px , 4vw , 24px);
    }
    h6{
      text-align: start;
      font-size: clamp(18px , 4vw , 22px);
      font-weight: 500;
      margin-bottom: 12px;
    }
    .discount{
      .input{
        @include displayFlex($gap : 0);
        border-bottom: unset;
        margin-bottom: 0;
        height: 60px;
        border: unset !important;
        padding: 0;
        input{
          border: 1px solid #DDDDDD;
          height: 55px;
          // border-radius: 12px 0 0 12px;
          border-start-start-radius: 12px;
          border-end-start-radius: 12px;
          border-inline-end: unset;
          padding-inline-start: 10px;
          &::placeholder{
            font-size: clamp(14px , 4vw , 20px );
          }
        }
        .main-btn{
          margin-top: 0;
          max-width: 200px;
          height: 58px;
          margin-left: -6px;
          &.disabled{
            background: #DDDDDD !important;
            color: #FFFFFF !important;
            cursor: not-allowed !important;
          }
        }
      }
    }
    .payment_methods{
      margin-block-end: 40px;
      .input-wrap{
        @include displayFlex($justify:flex-start , $gap : 10px);
        input{
          width: 15px;
        }
        label{
          cursor: pointer;
          font-size: clamp(16px , 4vw , 20px);
          font-weight: 500;
        }
        &:not(:last-of-type){
          margin-bottom: 10px;
        }
      }
    }
    .flex_buttons{
      margin-block: 0;
    }
  }
</style>