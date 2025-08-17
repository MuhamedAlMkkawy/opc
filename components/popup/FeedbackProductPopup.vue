<template>
  <div class="popup complaint_popup rate_product_popup feedback_product_popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleFeedbackProductPopup')"></button>
      <i class="pi pi-star-fill"></i>
      <h3 class="title">{{$t('rate_product_popup.feedback_title')}}</h3>
      <div class="product">
        <div class="image">
          <img :src="getResult?.product_image" alt="image" loading="lazy">
        </div>
        <div class="info">
          <h3>{{getResult?.product_name}}</h3>
          <RatingStars :rating="getResult?.stars" />
        </div>
      </div>
      <div class="info_data">
        <div class="image">
          <img :src="getResult?.user_image" alt="image" loading="lazy">
        </div>
        <div class="text">
          {{getResult?.feedback}}
        </div>
      </div>
      <button class="main-btn" @click="emit('handleFeedbackProductPopup')">
        {{$t('static_texts.back')}}
      </button>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['handleFeedbackProductPopup'])

  // define props
  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  })

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod(`orders/view-rate/${props.id}` , '' , true , false)
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
      .product{
        @include displayFlex($justify : flex-start , $align : stretch);
        margin-block: 50px;
        .image{
          // width: 100px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          margin: 0;
        }
        .info{
          @include displayFlex($direction:column , $justify : space-between , $align : flex-start);
          h3{
            font-size: 30px;
          }
        }
      }
      .info_data{
        @include displayFlex($justify : flex-start);
        .image{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          margin: 0;
        }
        .text{
          border: 1px solid #9E9E9E;
          border-radius: 10px;
          padding: 8px 5px;
          font-size: 16px;
          text-align: start;
          flex-grow: 1;
        }
        @media (max-width : 567px){
          flex-wrap: wrap-reverse;
          gap: 5px;
          justify-content: flex-start;
          .text{
            margin-inline-start: 30px;
            border-bottom-left-radius: 0;
          }
          .image{
            width: 60px;
            height: 60px;
            margin: 0;
          }
        }
      }
      .p-rating{
        justify-content: center ;
        gap: 10px !important;
        // margin-bottom: 20px;
      }
      label{
        font-size: 24px;
        font-weight: 500;
      }
    }
  }
</style>