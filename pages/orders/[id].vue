<template>
  <section class="page order_details_page">
    <div class="container">
      <h3 class="title">{{$t('order_details.title')}}</h3>
      <ul class="order_statuses">
        <li 
          v-for="(status, index) in orderStatuses.filter((status) => {
            if (getResult?.status == 6) {
              return [2, 3, 4].includes(status.id);
            } else if (getResult?.status >= 5 && getResult?.status != 6) {
              if (globalStore.userType == 1) {
                return status.id <= 5;
              } else if (globalStore.userType == 0) {
                return status.id <= 5 && status.id != 0;
              }
            } else {
              if (globalStore.userType == 1) {
                return status.id >= 0 ;
              } else if (globalStore.userType == 0) {
                return status.id >= 1 ;
              }
            }
            return false;
          })" 
          :key="index" 
          :class="{ 'active': getResult?.status != 6 && getResult?.status >= status.id }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3836 3.60064C17.8153 4.09353 17.5312 4.33999 17.2278 4.547C16.5322 5.02154 15.751 5.35088 14.9295 5.51597C14.5712 5.58798 14.199 5.61821 13.4548 5.67866C11.5849 5.83054 10.65 5.90648 9.86995 6.18692C8.06582 6.83553 6.64674 8.27996 6.0095 10.1163C5.73399 10.9103 5.65938 11.8619 5.51016 13.7652C5.45077 14.5227 5.42108 14.9015 5.35032 15.2662C5.18814 16.1024 4.86457 16.8975 4.39836 17.6055C4.19498 17.9144 3.95285 18.2036 3.4686 18.782C2.25192 20.2352 1.64355 20.9618 1.28681 21.7215C0.46169 23.4786 0.46169 25.5214 1.28681 27.2785C1.64355 28.0382 2.2519 28.7648 3.4686 30.218C3.9528 30.7964 4.19499 31.0856 4.39836 31.3945C4.86457 32.1025 5.18814 32.8976 5.35032 33.7338C5.42108 34.0985 5.45077 34.4773 5.51016 35.2348C5.65938 37.1381 5.73399 38.0897 6.0095 38.8837C6.64674 40.72 8.06582 42.1645 9.86995 42.8131C10.65 43.0935 11.5849 43.1695 13.4548 43.3213C14.199 43.3818 14.5712 43.412 14.9295 43.484C15.751 43.6491 16.5322 43.9785 17.2278 44.453C17.5312 44.66 17.8153 44.9065 18.3836 45.3993C19.8113 46.6378 20.5252 47.257 21.2716 47.6201C22.9979 48.46 25.0047 48.46 26.7311 47.6201C27.4774 47.257 28.1913 46.6378 29.619 45.3993C30.1873 44.9065 30.4714 44.66 30.7748 44.453C31.4704 43.9785 32.2516 43.6491 33.0731 43.484C33.4314 43.412 33.8036 43.3818 34.5478 43.3213C36.4177 43.1695 37.3526 43.0935 38.1327 42.8131C39.9368 42.1645 41.3559 40.72 41.9931 38.8837C42.2686 38.0897 42.3432 37.1381 42.4924 35.2348C42.5518 34.4773 42.5815 34.0985 42.6523 33.7338C42.8145 32.8976 43.138 32.1025 43.6042 31.3945C43.8076 31.0856 44.0498 30.7964 44.534 30.218C45.7507 28.7648 46.3591 28.0382 46.7158 27.2785C47.5409 25.5214 47.5409 23.4786 46.7158 21.7215C46.3591 20.9618 45.7507 20.2352 44.534 18.782C44.0498 18.2036 43.8076 17.9144 43.6042 17.6055C43.138 16.8975 42.8145 16.1024 42.6523 15.2662C42.5815 14.9015 42.5518 14.5227 42.4924 13.7652C42.3432 11.8619 42.2686 10.9103 41.9931 10.1163C41.3559 8.27996 39.9368 6.83553 38.1327 6.18692C37.3526 5.90648 36.4177 5.83054 34.5478 5.67866C33.8036 5.61821 33.4314 5.58798 33.0731 5.51597C32.2516 5.35088 31.4704 5.02154 30.7748 4.547C30.4714 4.33999 30.1873 4.09354 29.619 3.60065C28.1913 2.36222 27.4774 1.743 26.7311 1.37989C25.0047 0.540038 22.9979 0.540038 21.2716 1.37989C20.5252 1.743 19.8113 2.36223 18.3836 3.60064ZM34.2061 19.4249C34.9477 18.6701 34.9477 17.4462 34.2061 16.6914C33.4645 15.9365 32.2621 15.9365 31.5205 16.6914L20.2033 28.2107L16.482 24.4231C15.7404 23.6682 14.538 23.6682 13.7964 24.4231C13.0548 25.1779 13.0548 26.4018 13.7964 27.1566L18.8605 32.3111C19.6021 33.0659 20.8044 33.0659 21.5461 32.3111L34.2061 19.4249Z"/>
          </svg>
          {{ status.label }}
        </li>
        <li v-if="getResult?.status == 6" class="canceled">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3836 3.60064C17.8153 4.09353 17.5312 4.33999 17.2278 4.547C16.5322 5.02154 15.751 5.35088 14.9295 5.51597C14.5712 5.58798 14.199 5.61821 13.4548 5.67866C11.5849 5.83054 10.65 5.90648 9.86995 6.18692C8.06582 6.83553 6.64674 8.27996 6.0095 10.1163C5.73399 10.9103 5.65938 11.8619 5.51016 13.7652C5.45077 14.5227 5.42108 14.9015 5.35032 15.2662C5.18814 16.1024 4.86457 16.8975 4.39836 17.6055C4.19498 17.9144 3.95285 18.2036 3.4686 18.782C2.25192 20.2352 1.64355 20.9618 1.28681 21.7215C0.46169 23.4786 0.46169 25.5214 1.28681 27.2785C1.64355 28.0382 2.2519 28.7648 3.4686 30.218C3.9528 30.7964 4.19499 31.0856 4.39836 31.3945C4.86457 32.1025 5.18814 32.8976 5.35032 33.7338C5.42108 34.0985 5.45077 34.4773 5.51016 35.2348C5.65938 37.1381 5.73399 38.0897 6.0095 38.8837C6.64674 40.72 8.06582 42.1645 9.86995 42.8131C10.65 43.0935 11.5849 43.1695 13.4548 43.3213C14.199 43.3818 14.5712 43.412 14.9295 43.484C15.751 43.6491 16.5322 43.9785 17.2278 44.453C17.5312 44.66 17.8153 44.9065 18.3836 45.3993C19.8113 46.6378 20.5252 47.257 21.2716 47.6201C22.9979 48.46 25.0047 48.46 26.7311 47.6201C27.4774 47.257 28.1913 46.6378 29.619 45.3993C30.1873 44.9065 30.4714 44.66 30.7748 44.453C31.4704 43.9785 32.2516 43.6491 33.0731 43.484C33.4314 43.412 33.8036 43.3818 34.5478 43.3213C36.4177 43.1695 37.3526 43.0935 38.1327 42.8131C39.9368 42.1645 41.3559 40.72 41.9931 38.8837C42.2686 38.0897 42.3432 37.1381 42.4924 35.2348C42.5518 34.4773 42.5815 34.0985 42.6523 33.7338C42.8145 32.8976 43.138 32.1025 43.6042 31.3945C43.8076 31.0856 44.0498 30.7964 44.534 30.218C45.7507 28.7648 46.3591 28.0382 46.7158 27.2785C47.5409 25.5214 47.5409 23.4786 46.7158 21.7215C46.3591 20.9618 45.7507 20.2352 44.534 18.782C44.0498 18.2036 43.8076 17.9144 43.6042 17.6055C43.138 16.8975 42.8145 16.1024 42.6523 15.2662C42.5815 14.9015 42.5518 14.5227 42.4924 13.7652C42.3432 11.8619 42.2686 10.9103 41.9931 10.1163C41.3559 8.27996 39.9368 6.83553 38.1327 6.18692C37.3526 5.90648 36.4177 5.83054 34.5478 5.67866C33.8036 5.61821 33.4314 5.58798 33.0731 5.51597C32.2516 5.35088 31.4704 5.02154 30.7748 4.547C30.4714 4.33999 30.1873 4.09354 29.619 3.60065C28.1913 2.36222 27.4774 1.743 26.7311 1.37989C25.0047 0.540038 22.9979 0.540038 21.2716 1.37989C20.5252 1.743 19.8113 2.36223 18.3836 3.60064ZM34.2061 19.4249C34.9477 18.6701 34.9477 17.4462 34.2061 16.6914C33.4645 15.9365 32.2621 15.9365 31.5205 16.6914L20.2033 28.2107L16.482 24.4231C15.7404 23.6682 14.538 23.6682 13.7964 24.4231C13.0548 25.1779 13.0548 26.4018 13.7964 27.1566L18.8605 32.3111C19.6021 33.0659 20.8044 33.0659 21.5461 32.3111L34.2061 19.4249Z"/>
          </svg>
          {{ $t('order_details.order_statuses.canceled') }}
        </li>
      </ul>
      <div class="flex_buttons" v-if="getResult?.status != 6">
        <button 
          class="main-btn" 
          @click="handleShowPaymentPopup" 
          v-if="getResult?.status == 1">
          {{ $t('order_details.buttons.pay') }}
        </button>
        <button 
          class="main-btn danger reversed" 
          @click="handleShowReportProblemPopup"
          v-if="getResult?.status >= 4 && getResult?.status < 7 && !getResult?.is_reported">
          {{ $t('order_details.buttons.report') }}
        </button>
        <NuxtLink 
          v-if="getResult?.room_id"
          :to="localeRoute('/chats?id='+getResult?.room_id)" 
          class="main-btn reversed"
          @click="globalStore.room_id = getResult?.room_id" 
        >
          {{ getResult?.status >= 7 ? $t('order_details.buttons.read') : $t('order_details.buttons.chat') }}
        </NuxtLink>
      </div>
      <div class="order_page">
        <div class="order_details">
          <h3>{{ $t('order_details.title') }} :</h3>
          <div class="data">
            <ul>
              <li :style="getResult?.status >= 5 ? 'justify-content:space-between' : ''">
                <div class="tab">
                  <span>{{ $t('order_details.order_price') }}</span>
                  <span class="colored">{{getResult?.price}} {{getResult?.currency}}</span>
                </div>
                <div class="tab" v-if="getResult?.status >= 5">
                  <span>{{$t('order_details.delivery_price')}}</span>
                  <span class="colored">{{getResult?.delivery_price}} {{getResult?.currency}}</span>
                </div>
              </li>
              <li :style="getResult?.status >= 5 ? 'justify-content:space-between' : ''">
                <div class="tab">
                  <span>{{ $t('order_details.discount_price') }}</span>
                  <span class="colored">{{getResult?.discount_price}} {{getResult?.currency}}</span>
                </div>
                <div class="tab" v-if="getResult?.status >= 5 && getResult?.vat_amount > 0">
                  <span>{{ $t('order_details.tax_price') }}</span>
                  <span class="colored">{{getResult?.vat_amount}} {{getResult?.currency}}</span>
                </div>
              </li>
              <li :style="getResult?.status >= 5 ? 'justify-content:space-between' : ''" v-if="getResult?.status < 5">
                <div class="tab" v-if="getResult?.total > 0">
                  <span>{{ $t('order_details.total') }}</span>
                  <span class="colored">{{getResult?.total}} {{getResult?.currency}}</span>
                </div>
                <div class="tab" v-if="getResult?.discount_price > 0">
                  <span>{{ $t('order_details.discount_price') }}</span>
                  <span class="colored">{{getResult?.discount_price}} {{getResult?.currency}}</span>
                </div>
              </li>
              <li v-if="getResult?.status < 5 && getResult?.delivery_price > 0">
                <div class="tab">
                  <span>{{$t('order_details.delivery_price')}}</span>
                  <span class="colored">{{getResult?.delivery_price}} {{getResult?.currency}}</span>
                </div>
              </li>
              <li :style="getResult?.status >= 5 ? 'justify-content:space-between' : ''">
                <div class="tab" v-if="getResult?.total > 0">
                  <span>{{ $t('order_details.total') }}</span>
                  <span class="colored">{{getResult?.total}} {{getResult?.currency}}</span>
                </div>
                <div class="tab" v-if="getResult?.status >= 5">
                  <span>{{$t('order_details.payment')}}</span>
                  <span class="colored">{{getResult?.payment}}</span>
                </div>
              </li>
              <li  v-if="getResult?.status >= 5 && getResult?.status != 6" :style="getResult?.status >= 5 ? 'justify-content:space-between' : ''">
                <a :href="getResult?.file_link" class="main-btn reversed bill_btn" download target="_blank">
                  {{$t('order_details.buttons.download')}}
                </a>
                <div class="image qr_image" @click="handleShowQrPopup">
                  <img :src="getResult?.qr_image" alt="image" loading="lazy">
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <span>{{ $t('order_details.order_number') }}</span>
                <span class="colored">{{getResult?.order_num}}</span>
              </li>
              <li>
                <span>{{ $t('order_details.order_date') }}</span>
                <span class="colored">{{getResult?.order_date}}</span>
              </li>
              <li v-if="getResult?.delivery_type == 1">
                <span>{{ $t('order_details.branch_time') }}</span>
                <span class="colored">{{getResult?.delivery_time}}</span>
              </li>
              <li v-if="getResult?.delivery_type == 0">
                <span>{{ $t('order_details.delivery_time') }}</span>
                <span class="colored">{{getResult?.delivery_time}}</span>
              </li>
              <li v-if="getResult?.delivery_type == 1">
                <span>{{ $t('order_details.branch_address') }}</span>
                <span class="colored address">{{getResult?.branch_details}}</span>
              </li>
              <li v-if="getResult?.delivery_type == 0">
                <span>{{ $t('order_details.delivery_address') }}</span>
                <span class="colored address">{{getResult?.delivery_address}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="notes" v-if="getResult?.notes || getResult?.cancelled_reason">
          <h3>{{ getResult?.status == 6 ? $t('order_details.cancel_reason') : $t('order_details.notes_on_order') }}</h3>
          <p>{{getResult?.status == 6 ? getResult?.cancelled_reason : getResult?.notes}}</p>
        </div>
        <div>
          <div class="order_info">
            <h3>{{ $t('order_details.order_products') }}</h3>
            <ul>
              <li 
                class="order_item row_order_item" 
                v-for="item in getResult?.items" 
                :key="item.id"
              >
                <h6>{{item.quantity}}</h6>
                <i class="pi pi-times"></i>
                <div class="order_tab order_info">
                  <div class="image">
                    <img :src="item.image" alt="image" loading="lazy">
                  </div>
                  <div class="order_text">
                    <h3>{{item.product_name}}</h3>
                    <ul class="themes">
                      <li>
                        {{item.variant_name}}
                      </li>
                    </ul>
                    <div class="price">
                      <h4 v-if="item?.price_after_discount">{{item.price_after_discount}} {{ item.currency }}</h4>
                      <del v-if="item?.price_after_discount">{{item.price}} {{ item.currency }}</del>
                      <h4 v-else>{{item.price}} {{ item.currency }}</h4>
                    </div>
                  </div>
                </div>
                <button 
                  class="main-btn reversed rate_btn" 
                  v-if="getResult?.status == 7"
                  @click="handleRateProductPopup(item.is_rated ? item.id : item.product_id , item.is_rated)"
                >
                  {{ 
                    item.is_rated ? 
                    $t('order_details.buttons.rated') : 
                    $t('order_details.buttons.rate') 
                  }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cancel_reseaon" v-if="showCancelForm">
        <h3 class="cancel">{{ $t('order_details.cancel_reason') }} :</h3>
        <div class="input">
          <textarea 
            id="cancel_order"
            v-model="cancelBody.cancelled_reason"
            :placeholder="$t('order_details.cancel_reason')"
            ></textarea>
        </div>
      </div>
      <button class="main-btn danger" v-if="getResult?.status == 1" @click="handleCancelOrder">
        {{ $t('order_details.buttons.cancel') }}
      </button>
      <button class="main-btn" v-if="getResult?.status == 4" @click="handleRecieveOrder">
        {{ $t('order_details.buttons.recieved') }}
      </button>
    </div>
    <PaymentPopup 
      v-if="showPaymentPopup"
      :orderData="getResult"
      @handleShowPaymentPopup="handleShowPaymentPopup"
    />
    <SuccessPopup 
      v-if="showSuccessPopup"
      :message="$t('rate_product_popup.feedback_sent')"
    />
    <ReportProblem 
      v-if="showReportProblem"
      @handleShowReportProblemPopup = "handleShowReportProblemPopup"
      @handleShowProblemReported = "handleShowProblemReported"
    />
    <ProblemReported 
      v-if="showProblemReported"
      @handleShowProblemReported = "handleShowProblemReported"
    />
    <RateProductPopup 
      v-if="showRateProductPopup"
      :product_id="product_id"
      @handleRateProductPopup="handleRateProductPopup"
      @handleShowSuccessPopup="handleShowSuccessPopup"
    />
    <FeedbackProductPopup 
      :id="product_id"
      v-if="showFeedbackProductPopup"
      @handleFeedbackProductPopup="handleFeedbackProductPopup"
    />
    <FatoorahPopup 
      v-if="showFatoorahPopup"
      :orderData="getResult"
      @handleShowFatoorahPopup = "handleShowFatoorahPopup"
    />
  </section>
</template>

<script setup>
  // define i18n library
  const {t} = useI18n()

  // define route 
  const route = useRoute()

  // define api methods
  const {
    getMethod ,
    getResult ,
    submitMethod
  } = useApiMethods()

  // define global store
  const globalStore = useGlobalStore()

  // Reactive data for order statuses
  const orderStatuses = ref([
    { 
      id : 0 ,
      name: "waitingForApprove", 
      label: t('order_details.order_statuses.waitingForApprove') 
    },
    { 
      id : 1 ,
      name: "onPayment", 
      label: t('order_details.order_statuses.onPayment') 
    },
    { 
      id : 2 ,
      name: "preparing", 
      label: t('order_details.order_statuses.preparing') 
    },
    { 
      id : 3 ,
      name: "prepared ", 
      label: t('order_details.order_statuses.prepared') 
    },
    { 
      id : 4 ,
      name: "onDelivery", 
      label: t('order_details.order_statuses.onDelivery')
    },
    { 
      id : 5 ,
      name: "delivered", 
      label: t('order_details.order_statuses.delivered') 
      // name: getResult?.value?.status == 6 ? 'canceled' : "delivered", 
      // label: getResult?.value?.status == 6 ?
      //   t('order_details.order_statuses.canceled') : t('order_details.order_statuses.delivered') 
    },
    // { id : 7 ,name: "finished", label: "Finished" },

  ]);

  // Reactive data for the current status
  const localeRoute = useLocaleRoute()
  

  // success popup 
  const showSuccessPopup = ref(false);

  const handleShowSuccessPopup = () => {
    showSuccessPopup.value = !showSuccessPopup.value
  }

  // payment popup 
  const showPaymentPopup = ref(false);
  const handleShowPaymentPopup = () =>{
    showPaymentPopup.value = !showPaymentPopup.value
  }
  
  // report popup
  const showReportProblem = ref(false);
  const handleShowReportProblemPopup = () => {
    showReportProblem.value = !showReportProblem.value
  }
  

  // handle show the popup that notify the problem reported
  const showProblemReported = ref(false)
  const handleShowProblemReported = () =>{
    showProblemReported.value = !showProblemReported.value
    showReportProblem.value = false
    setTimeout(() => {
      showProblemReported.value = !showProblemReported.value
    }, 1000);
  }

  // rate proudct popup
  const product_id = ref()

  // feedback popup
  const showFeedbackProductPopup = ref(false)
  const handleFeedbackProductPopup = () => {
    showFeedbackProductPopup.value = !showFeedbackProductPopup.value
  }

  // rate product popup
  const showRateProductPopup = ref(false)
  const handleShowRateProductPopup = () => {
    showRateProductPopup.value = !showRateProductPopup.value
  }

  // handle rate product 
  const handleRateProductPopup = (id , is_rated) => {
    if(is_rated){
      product_id.value = id
      handleFeedbackProductPopup()
    }else{
      product_id.value = id
      handleShowRateProductPopup()
    }
  }


  // handle cancel order
  const showCancelForm = ref(false)
  const cancelBody = ref({
    order_id : route.params.id,
    cancelled_reason: ''
  })


  const handleCancelOrder = () => {
    if(!showCancelForm.value){
      showCancelForm.value = true
    }else{
      submitMethod('orders/cancel' , true , cancelBody.value , 'POST' , 'reload_page' , '')
    }
  }


  // handle recieve order
  const handleRecieveOrder = () => {
    if(getResult?.value?.delivery_type == 1){
      getMethod(`orders/${route.params.id}/change-status` , '' , true , true )
    }else{
      getMethod(`orders/${route.params.id}/finish` , '' , true , true )
    }
  }

  // handle fatoorah popup
  const showFatoorahPopup = ref(false)
  const handleShowFatoorahPopup = () => {
    showFatoorahPopup.value = !showFatoorahPopup.value
  }

  onMounted(()=>{
    globalStore.room_id = ''
    getMethod(`orders/${route.params.id}/details` , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .order_details_page{
    h3.title{
      text-align: start;
      margin-bottom: 40px;
      font-size: clamp(28px , 4vw , 32px);
    }
    .order_statuses{
      @include displayFlex();
      margin-bottom: 30px;
      li{
        // flex-grow: 1;
        @include displayFlex();
        border-radius: 15px;
        border: 2px solid #9E9E9E;
        color: #C9C9C9;
        // padding: clamp(15px , 4vw , 47px) 10px clamp(15px , 4vw , 47px);
        font-size: clamp(14px , 4vw , 22px);
        font-weight: 500;
        width: clamp(150px , 100% , 300px);
        height: 120px;
        text-align: center;
        position: relative;
        z-index: 3;
        line-height: 1.3;
        padding: 25px 4px 15px;
        svg{
          fill: #C9C9C9;
          position: absolute;
          // top: -35px;
          top: -25px;
          z-index: 3;
        }
        &.active{
          color: #000;
          background: rgba($mainColor , 0.3);
          border-color: transparent;
          svg{
            fill: $mainColor;
          }
        }
        &.canceled{
          color: #000;
          background: rgb($secColor , 0.3);
          border-color: rgb($secColor , 0.3);
          svg{
            fill: $secColor;
          }
        }
        // &:not(:last-of-type){
        //   &::after{
        //     content: '';
        //     position: absolute;
        //     inset-inline-end: -50%;
        //     top: 50%;
        //     transform:translateY(-50%);
        //     z-index: -1;
        //     color: rgba(128, 128, 128, 0.515);
        //     letter-spacing: 1.6px;
        //     border: 0.5px dashed grey;
        //     width: 100%;
        //   }
        // }
      }
      @media (max-width : 902px){
        flex-wrap: wrap;
        gap: 40px 10px;
        li{
          // width: fit-content;
          padding-inline: 10px;
          height: fit-content;
          font-size: 20px;
          padding-block: 20px 14px;
          width: 200px;
          flex-grow: 1;
          svg{
            width: 30px;
          }
          &::after{
            display:none;
          }
        }
      }
      @media (max-width : 767px){
        li{
          flex-grow: 1;
        }
      }
    }
    .flex_buttons{
      max-width: 992px;
      margin: 0 auto 30px;
      .main-btn{
        max-width: 600px;
        @include displayFlex();
      }
      @media (max-width : 767px){
        flex-wrap:wrap;
        gap: 15px;
        .main-btn{
          margin-top:0;
        }
      }
    }
    .order_page{
      padding-bottom: 20px;
      .order_info{
        gap: 12px;
        h3{
          font-size: clamp(16px, 4vw, 24px);
          font-weight: 500;
        }
        @media(max-width: 991px){
          flex-direction: row !important;
        }
        @media(max-width: 567px){
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }
      .order_item{
        // background: #fff;
        // padding: 15px 12px;
        border-radius: 8px;
        border: unset;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        &:not(:last-of-type){
          margin-bottom: 20px;
        }
        h6{
          font-size: clamp(50px , 4vw , 60px);
          font-weight: 600;
          + .pi-times{
            margin-block-start: 16px;
            font-weight: 700;
          }
        }
        .image{
          width: 100px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
        }
        .price{
          justify-content: flex-end;
          flex-direction: row-reverse;
          // h4 , del{
          //   font-weight: 600;
          // }
        }
      }
    }
    .main-btn{
      max-width: 700px;
      @include displayFlex();
    }
  }

  .order_page .order_details .data {
    align-items: start;
    ul{
      height: fit-content;
      li{
        justify-content: flex-start;
        gap: 10px;
        // white-space: normal;  /* Allows text to wrap */
        // word-wrap: break-word;  /* Breaks long words if needed */
        // overflow-wrap: break-word;  /* Ensures compatibility */
        span{
          text-wrap-mode: nowrap;
          &.address{
            text-wrap-mode: wrap;
          }
        }
        .tab{
          width:40%;
          flex-grow: 1;
        }
        &:not(:last-of-type){
          margin-bottom: 10px !important;
        }
        @media (max-width : 1100px){
          flex-direction: column;
          align-items: flex-start !important;
        }
      }
    }
    @media (max-width : 767px){
      flex-wrap : wrap ;
    }
  }
  .order_details ,
  .notes{
    margin-bottom: 0 !important;
  }
  .qr_image{
    width: 50%;
    img{
      width: 60px !important;
      height: 60px;
      cursor: pointer;
      object-fit: contain;
    }
  }
  .bill_btn , 
  .rate_btn{
    max-width: 200px !important;
    height: 50px;
    margin: 0;
  }
  .rate_btn{
    margin-inline-start: auto;
    @media (max-width : 767px){
      margin-inline: auto;
    }
  }

  .cancel_reseaon{
    h3{
      font-size: 20px;
      font-weight: 500;
    }
    .input{
      border: 1px solid #9E9E9E;
      border-radius: 5px;
      height: 100px;
      padding: 10px;
    }
  }
</style>