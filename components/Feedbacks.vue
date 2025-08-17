<template>
  <div class="feedbacks" v-if="getResult?.data?.length > 0">
    <div class="feedback" v-for="feedback in getResult?.data" :key="feedback.id">
      <div class="image">
        <img :src="feedback.user_image" alt="user_image" loading="lazy">
      </div>
      <div class="feedback_texts">
        <h3>{{feedback.user_name}}</h3>
        <RatingStars :rating="feedback.stars"/>
        <p>{{feedback.feedback}}</p>
      </div>
    </div>
  </div>
  <Empty v-else />
</template>

<script setup>
  // define route
  const route = useRoute();
  
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod(`products/${route.params.id}/feedbacks` , 1 ,false , false)
  })
</script>

<style lang="scss" scoped>
  .feedbacks{
    @include displayFlex($direction : column );
    width: 100%;
    .feedback{
      @include displayFlex($align : stretch , $justify : flex-start);
      background: rgba($color: $mainColor, $alpha: 0.12);
      padding: 10px;
      width: 100%;
      &:not(:last-of-type){
        margin-bottom: 20px;
      }
      .image{
        width: 100px;
        border-radius: 8px;
        overflow: hidden;
        flex-shrink: 0;
      }
      h3{
        font-size: clamp(16px , 4vw , 20px);
        font-weight: 500;
      }
      .p-rating{
        margin-block: 5px;
      }
      @media (max-width : 767px){
        flex-wrap: wrap;
        justify-content: flex-start;
        .image{
          width:100%;
          height: 100px;
        }
      }
    }
  }
  .empty{
    min-height: unset;
  }
</style>