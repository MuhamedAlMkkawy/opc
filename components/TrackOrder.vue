<template>
  <div class="track_order">
    <h4>
      <span>1</span>
      <span>
        {{globalStore.orderData.delivery_type == 0 ? $t('track_order.delivery') : $t('track_order.branch')}}</span>
    </h4>
    <span>------------------------------</span>
    <h4>
      <span>2</span>
      <span>{{$t('track_order.confirm')}}</span>
    </h4>
  </div>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
  .track_order{
    @include displayFlex($gap : 8px);
    h4{
      font-size: clamp(14px, 4vw, 24px);
      font-weight: 500;
      @include displayFlex($gap : 5px);
      span{
        &:first-of-type{
          font-size: clamp(30px , 4vw , 50px);
          font-weight: 900;
        }
      }
      + span{
        font-weight: 400;
        font-size: 22px;
        color: #9E9E9E;
        letter-spacing: 1.5px;
        @media (max-width : 767px){
          width: 100px;
          height: 34px;
          overflow: hidden;
        }
      }
      &:first-of-type{
        color: $mainColor;
      }
      @media (max-width : 560px){
        flex-wrap: wrap;
        gap: 0px !important;
        text-align: center;
      }
    }
  }
</style>