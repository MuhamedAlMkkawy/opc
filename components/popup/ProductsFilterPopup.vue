<template>
  <div class="popup">
    <div class="content">
      <h3 class="title centered">{{$t('static_texts.filter')}}</h3>
      <form action="">
        <div class="input-wrap">
          <input 
            type="radio" 
            name="price" 
            id="lowest_price"
            value="low" 
            v-model="body.price_filter"
          >
          <label for="lowest_price">{{$t('filter_popup.lowest_price')}}</label>
        </div>
        <div class="input-wrap">
          <input 
            type="radio" 
            name="price" 
            id="highest_price"
            value="high"
            v-model="body.price_filter"
          >
          <label for="highest_price">{{$t('filter_popup.highest_price')}}</label>
        </div>
        <div class="input-wrap">
          <input 
            type="checkbox" 
            name="rate" 
            id="highest_rate"
            v-model="body.high_rate_sort"
          >
          <label for="highest_rate">{{$t('filter_popup.highest_rate')}}</label>
        </div>
      </form>
      <div class="flex_buttons">
        <button 
          class="main-btn" 
          @click="emit('handleApplyFilter' , body)">
          {{$t('static_texts.apply')}}
        </button>
        <button 
          class="main-btn reversed" 
          @click="emit('handleShowFilterPopup')">
          {{$t('static_texts.back')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define body
  const body = ref({
    price_filter : '',
    high_rate_sort : ''
  })
  // define emits
  const emit = defineEmits(['handleShowFilterPopup' , 'handleApplyFilter'])
</script> 

<style lang="scss" scoped>
  form{
    margin-top: 50px;
  }
  .input-wrap{
    @include displayFlex($justify : flex-start , $gap : 8px);
    input{
      width: 20px;
    }
    label{
      font-size: clamp(16px, 4vw , 24px);
    }
    &:not(:last-of-type){
      margin-bottom: 30px;
    }
  }
  .flex_buttons{
    margin-bottom: 0;
  }
</style>
