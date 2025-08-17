<template>
  <div class="popup">
    <div class="content">
      <h3 class="title centered">{{$t('static_texts.filter')}}</h3>
      <form action="">
        <div class="input-wrap">
          <label for="sub_category">{{$t('subCategoryfilter_popup.sub_category')}}</label>
          <div class="input">
            <select name="sub_category" id="sub_category" v-model="subCategoryId">
              <option value="">{{$t('subCategoryfilter_popup.sub_category')}}</option>
              <option 
                v-for="subCategory in subCategories" 
                :key="subCategory.id" 
                :value="subCategory.id">
                {{subCategory.name}}
              </option>
            </select>
          </div>
        </div>
      </form>
      <div class="flex_buttons">
        <button 
          class="main-btn" 
          @click="emit('handleApplySubCategoryFilterPopup' , subCategoryId)">
          {{$t('static_texts.save')}}
        </button>
        <button 
          class="main-btn reversed" 
          @click="emit('handleShowSubCategoryFilterPopup')">
          {{$t('static_texts.back')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define emits
  const emit = defineEmits(['handleShowSubCategoryFilterPopup' , 'handleApplySubCategoryFilterPopup'])

  // define props
  const props = defineProps({
    subCategories : {
      type : Array,
      default : () => []
    }
  })

  const subCategoryId = ref('')

</script> 

<style lang="scss" scoped>
  h3.title{
    margin-top: 0;
  }
  // form{
  //   margin-top: 50px;
  // }
  // .input-wrap{
  //   @include displayFlex($justify : flex-start , $gap : 8px);
  //   input{
  //     width: 20px;
  //   }
  //   label{
  //     font-size: clamp(16px, 4vw , 24px);
  //   }
  //   &:not(:last-of-type){
  //     margin-bottom: 30px;
  //   }
  // }
  .flex_buttons{
    margin-bottom: 0;
  }
</style>