<template>
  <div class="page">
    <div class="container">
      <TrackOrder />
      <div class="order_page">
        <div class="order_item row_order_item" v-for="item in submitResult?.data?.data?.items" :key="item.id">
          <div class="order_info">
            <div class="image">
              <img :src="item.image" alt="Order Item Image" loading="lazy" />
            </div>
            <div class="order_text">
              <h3>{{ item.product_name }}</h3>
              <div class="price">
                <h4 v-if="item.price_after_discount">{{ item.price_after_discount }} {{ item.currency }}</h4>
                <h4 v-else>{{ item.price }} {{ item.currency }}</h4>
                <del v-if="item.price_after_discount">{{ item.price }} {{ item.currency }}</del>
              </div>
              <ul class="themes">
                <li>
                  {{ item.variant_name }}
                </li>
              </ul>
              <p>
                {{ item.product_description }}
              </p>
            </div>
          </div>
        </div>
        <div class="order_details">
          <h3>{{ $t('cart.confirm_page.title') }} :</h3>
          <div class="data">
            <ul>
              <li>
                <span>{{ $t('cart.confirm_page.product_price') }}</span>
                <span class="colored">{{submitResult?.data?.data?.price}} {{submitResult?.data?.data?.currency}}</span>
              </li>
              <li v-if="submitResult?.data?.data?.discount_price">
                <span>{{ $t('cart.confirm_page.discount_price') }}</span>
                <span class="colored">{{submitResult?.data?.data?.discount_price}} {{submitResult?.data?.data?.currency}}</span>
              </li>
              <li>
                <span>{{ $t('cart.confirm_page.tax_price') }}</span>
                <span class="colored">{{submitResult?.data?.data?.vat_amount}} {{submitResult?.data?.data?.currency}}</span>
              </li>
              <li>
                <span>{{ $t('cart.confirm_page.total_price') }}</span>
                <span class="colored">{{submitResult?.data?.data?.total}} {{submitResult?.data?.data?.currency}}</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>{{ $t('cart.confirm_page.order_number') }}</span>
                <span class="colored">{{submitResult?.data?.data?.order_num}}</span>
              </li>
              <li>
                <span>{{ $t('cart.confirm_page.order_date') }}</span>
                <span class="colored">{{submitResult?.data?.data?.order_date}}</span>
              </li>
              <!-- <li>
                <span>{{ $t('cart.confirm_page.delivery_time') }}</span>
                <span class="colored">{{submitResult?.data?.data?.delivery_time}}</span>
              </li> -->
              <li v-if="submitResult?.data?.data?.delivery_type == 1">
                <span>{{ $t('order_details.branch_time') }}</span>
                <span class="colored">{{submitResult?.data?.data?.delivery_time}}</span>
              </li>
              <li v-if="submitResult?.data?.data?.delivery_type == 0">
                <span>{{ $t('order_details.delivery_time') }}</span>
                <span class="colored">{{submitResult?.data?.data?.delivery_time}}</span>
              </li>
              <li v-if="submitResult?.data?.data?.delivery_type == 1">
                <span>{{ $t('order_details.branch_address') }}</span>
                <span class="colored address">{{submitResult?.data?.data?.branch_details}}</span>
              </li>
              <li v-if="submitResult?.data?.data?.delivery_type == 0">
                <span>{{ $t('order_details.delivery_address') }}</span>
                <span class="colored address">{{submitResult?.data?.data?.delivery_address}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="notes" v-if="submitResult?.data?.data?.notes">
          <h3>{{ $t('cart.confirm_page.notes_on_order') }}</h3>
          <p>{{ submitResult?.data?.data?.notes }}</p>
        </div>
      </div>
      <FlexButtons 
        @handleSubmit="handleSubmit"
        :submitBtnText="$t('cart.confirm_page.confirm_order')"
      />
    </div>
    <SuccessPopup 
      v-if="showSuccessPopup"
      :id="submitResult?.data?.data?.order_id"
      :message="$t('success_popup.confirm_order')"
    />
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // 

  // define toast message
  const {
    showErrorToast,
  } = useToastMsg()

  // define show success popup
  const showSuccessPopup = ref(false)

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    submitResult,
    handleNextRoute
  } = useApiMethods()

  // define submit function
  const handleSubmit = () => {
    getMethod(`orders/${submitResult?.value.data?.data?.order_id}/confirm` , '' , true , true)
    // showSuccessPopup.value = true
  }

  watchEffect(()=>{
    if(getResult?.value){
      showSuccessPopup.value = true
    }
    if(submitResult?.value?.data?.key == 'fail' && (submitResult?.value?.data?.msg == 'There are no items in the cart' || submitResult?.value?.data?.msg == 'لا يوجد منتجات في السلة')){
      showErrorToast('error' , submitResult?.value?.data?.msg)
      handleNextRoute('/home')
    }
  })

  onMounted(()=>{
    submitMethod('orders' , true , globalStore.orderData , 'POST' , '' , '')
  })

</script>

<style lang="scss" scoped>
  .track_order{
    color: $mainColor !important;
  }
  .order_page .order_details .data ul:first-of-type li{
    justify-content: flex-start;
  }
  .order_item .order_info {
    .image{
      max-width: 190px;
      width: 100%;
      height: 150px;
    }
  }
  @media (max-width : 991px){
    .order_item .order_control .control_count{
      position: static !important;
    }
  }
  @media (max-width : 767px){
    .order_page {
      .order_details{
        margin-block: 15px;
        .data{
          flex-grow: 1;
          ul{
            li{
              text-align: start;
            }
          }
        }
      }
      .order_item{
        flex-direction: column;
        .order_info {
          .image{
            max-width: unset;
            height: 150px;
          }
        }
      } 
    }
    .order_item .order_control{
      flex-direction: row;
      padding-block: 10px 0;
    }
    
  }
</style>