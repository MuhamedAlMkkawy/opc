<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowFatoorahPopup')"></button>
      <div class="image">
        <img src="/assets/images/logo.png" alt="image" loading="lazy" />
      </div>
      <div class="row_item">
        <ul>
          <li>
            <span>{{ $t('order_details.order_price') }}</span>
            <span class="colored">{{props?.orderData?.price}} {{props?.orderData?.currency}}</span>
          </li>
          <li>
            <span>{{$t('order_details.delivery_price')}}</span>
            <span class="colored">{{props?.orderData?.delivery_price}} {{props?.orderData?.currency}}</span>
          </li>
          <li>
            <span>{{ $t('order_details.discount_price') }}</span>
            <span class="colored">{{props?.orderData?.discount_price}} {{props?.orderData?.currency}}</span>
          </li>
          <li>
            <span>{{ $t('order_details.tax_price') }}</span>
            <span class="colored">{{props?.orderData?.vat_amount}} {{props?.orderData?.currency}}</span>
          </li>
          <li>
            <span>{{ $t('order_details.total') }}</span>
            <span class="colored">{{props?.orderData?.total}} {{props?.orderData?.currency}}</span>
          </li>
          <li>
            <span>{{$t('order_details.payment')}}</span>
            <span class="colored">{{props?.orderData?.payment}}</span>
          </li>
        </ul>
        <div class="image">
          <img :src="props.orderData?.qr_image" alt="image" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['handleShowFatoorahPopup'])

  // define props
  const props = defineProps({
    orderData : Object
  })
</script>

<style lang="scss" scoped>
.popup{
  .content{
    min-height: 450px;
  }
}
  .row_item{
    @include displayFlex($justify : space-between);
    margin-block-start: 30px;
    ul{
      @include displayFlex($direction : column , $align : flex-start);
      li{
        @include displayFlex($gap : 5px);
        text-wrap-mode: nowrap;
        span{
          font-size: 18px;
          font-weight: 600;
          &.colored{
            color: $mainColor;
          }
        }
      }
    }
    @media (max-width : 500px){
      flex-direction: column-reverse;
      margin-block-start: 0;
      gap: 0;
    }
    .image{
      flex-grow: 1;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>