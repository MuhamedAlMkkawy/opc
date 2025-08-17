<template>
  <div class="auth_page">
    <div class="container mx-auto">
      <div class="content">
        <form action="" @submit.prevent="handleSubmit">
          <h4>{{$t('new_phone.title')}}</h4>
          <h5>{{$t('new_phone.text')}}</h5>
          <label for="phone">{{$t('new_phone.label')}}</label>
          <div class="input">
            <input 
              type="text"
              :placeholder="$t('new_phone.placeholder')"
              v-model="body.phone"
            >
          </div>
          <button class="main-btn">
            {{ $t('static_texts.save') }}
          </button>
        </form>
        <!-- <hr> -->
        <div class="side_image">
          <div class="image">
            <img src="/assets/images/contact_img.jpeg" alt="image" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define api methods
  const { submitMethod } = useApiMethods();

  // define global Store
  const globalStore = useGlobalStore()

  // define body 
  const body = ref({
    country_code : globalStore.country_code,
    phone : '',
  })


  const handleSubmit = () =>{
    globalStore.setUserPhone(body.value.phone)
    globalStore.definePageBeforeCodePage('new_phone')
    
    submitMethod('change-phone-send-code' , true , body.value , 'POST' , '/verification_code')
  }
</script>

<style lang="scss" scoped>
  .input {
    // border-bottom: unset;
    max-width: 700px;
  }
  .auth_page .content {
    justify-content: center;
    form{
      max-width: clamp(300px, 100%, 50%);
    }
    .side_image{
      max-width: 50%;
      flex-shrink: 0;
    }
  }
  .auth_page .main-btn {
    margin: 10px 0;
  }
</style>