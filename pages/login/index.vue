<template>
  <div class="auth_page">
    <div class="container mx-auto">
      <div class="content">
        <form action="" @submit.prevent="handleSubmit">
          <LanguageSwitch />
          <h4>{{$t('login.title')}}</h4>
          <h5>{{$t('login.text')}}</h5>
          <label for="phone">{{$t('login.label')}}</label>
          <div class="input">
            <input 
              type="text"
              :placeholder="$t('login.placeholder')"
              v-model="body.phone"
            >
          </div>
          <button class="main-btn" type="submit">
            {{ $t('login.submit') }}
          </button>
          <p>{{$t('login.enter')}} <NuxtLink :to="localeRoute('/home')">{{$t('login.visitor')}}</NuxtLink></p>
          <p>{{$t('login.have_account')}} <NuxtLink @click="globalStore.defineAuthProcess('register')" :to="localeRoute('/')">{{$t('login.sign_up')}}</NuxtLink></p>
        </form>
        <hr>
        <div class="side_image">
          <div class="image">
            <img src="/assets/images/logo.png" alt="image" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define useToastMsg
  const { showErrorToast } = useToastMsg()

  // define global store
  const globalStore = useGlobalStore()

  // define auth store
  const authStore = useAuthStore()

  // define Api Methods
  const { submitMethod } = useApiMethods()

  // defina locale route
  const localeRoute = useLocaleRoute()
  
  // define body
  const body = ref({
    phone : '',
    user_type : globalStore.userType
  })

  // define submit form function
  const handleSubmit = () =>{
    if(!body.value.phone){
      const errorMessage = globalStore.lang === 'en' ? 'Please enter your phone number' : 'يرجى إدخال رقم هاتفك'
      showErrorToast(errorMessage)
    }
    else if (body.value.phone && (body.value.phone.length < 9 || body.value.phone.length > 10) ){
      const errorMessage = globalStore.lang === 'en' ? 'Please enter a valid phone number' : 'يرجى إدخال رقم هاتف صحيح'
      showErrorToast(errorMessage)
    }else {
      globalStore.setUserPhone(body.value.phone)
      submitMethod('sign-in', false ,body.value , 'POST' , '/activation_code')
    }
  }


  // for not viewing the layout here 
  definePageMeta({
    layout: false,
  });
</script>

<style lang="scss" scoped>

</style>