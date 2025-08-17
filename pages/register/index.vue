<template>
  <div class="auth_page">
    <div class="container mx-auto">
      <div class="content">
        <form action="" @submit.prevent="handleSubmit">
          <LanguageSwitch />
          <h4>{{$t('register.title')}}</h4>
          <h5>{{$t('register.text')}}</h5>
          <div class="image_uploader">
            <input 
              type="file" 
              name="image" 
              id="profile_img" 
              hidden
              accept="image/*"
              @change="handleUploadImage"
            >
            <label class="icon" for="profile_img">
              <i v-if="!localImage" class="pi pi-image"></i>
              <img v-else :src="localImage" alt="image" loading="lazy">
            </label>
            <label class="uploader_img" for="profile_img">
                <h6>{{ $t('register.profile_picture_label') }}</h6>
                <p>{{ $t('register.profile_picture_text') }}</p>
            </label>
          </div>
          <label for="name">{{$t('register.name_label')}}</label>
          <div class="input">
            <input 
              id="name"
              type="text"
              v-model="globalStore.registerData.name"
              :placeholder="$t('register.name_placeholder')"
            >
          </div>
          <label for="phone">{{$t('register.phone_label')}}</label>
          <div class="input">
            <input 
              id="phone"
              type="text"
              v-model="globalStore.registerData.phone"
              :placeholder="$t('register.phone_placeholder')"
            >
          </div>
          <label for="email">{{$t('register.email_label')}}</label>
          <div class="input">
            <input 
              id="email"
              type="text"
              v-model="globalStore.registerData.email"
              :placeholder="$t('register.email_placeholder')"
            >
          </div>
          <label for="city">{{$t('register.city_label')}}</label>
          <div class="input">
            <select name="city" v-model="globalStore.registerData.city_id" id="city">
              <option value="">{{$t('register.city_placeholder')}}</option>
              <option v-for="city in getResult" :key="city.id" :value="city.id">{{city.name}}</option>
            </select>
          </div>
          <label for="commercial" v-if="globalStore.userType == 1">{{$t('register.commercial_label')}}</label>
          <div class="input" v-if="globalStore.userType == 1">
            <input 
              id="commercial"
              type="Number"
              v-model="globalStore.registerData.commercial_registration_num"
              :placeholder="$t('register.commercial_placeholder')"
            >
          </div>
          <div class="terms">
            <input v-model="globalStore.registerData.terms" type="checkbox" name="terms" id="terms">
            <label for="terms">
              {{$t('static_texts.accept')}} 
              <NuxtLink :to="localeRoute('/terms')">{{$t('register.terms')}}</NuxtLink> 
            </label>
          </div>
          <button class="main-btn">
            {{ $t('register.submit') }}
          </button>
          <p>{{$t('register.have_account')}} <NuxtLink @click="globalStore.defineAuthProcess('login')" :to="localeRoute('/')">{{$t('register.login')}}</NuxtLink></p>
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

  // define Api Methods
  const { 
    getMethod,
    getResult,
    submitMethod 
  } = useApiMethods()

  // define global store
  const globalStore = useGlobalStore()

  // define locale route 
  const localeRoute = useLocaleRoute()

  // // define body 
  // const body = ref({

  // })

  // watchEffect(()=>{
  //   if(body?.value){
  //     window?.sessionStorage?.setItem('registerData' , JSON.stringify(body.value))
  //   }
  // })


  // define lang 
  const lang = globalStore.lang

  // define handle upload image
  const localImage = ref(null)
  const handleUploadImage = (event) => {
    const file = event.target.files[0]
    if (!file.type.startsWith('image/')) {
      const errorMsg = lang == 'ar' 
        ? 'نوع الملف غير صالح. يُوصى بتحميل ملفات بصيغة JPG أو PNG.' 
        : 'Invalid file type. Recommended to upload images in JPG or PNG format.';
      showErrorToast(errorMsg);
    }else{
      localImage.value = URL.createObjectURL(file)
      globalStore.registerData.image = file
    }
  }

  // for not viewing the layout here 
  definePageMeta({
    layout: false,
  });

  // define submit function 
  const handleSubmit = async () =>{
    if(!globalStore.registerData.image){
      showErrorToast(lang == 'ar' ? 'يجب إضافة صورة للاستمرار.' : 'Please upload an image file to proceed.');
    }
    else if (!globalStore.registerData.name) {
      showErrorToast(lang == 'ar' ? 'الاسم مطلوب' : 'Name is required');
    }
    else if (globalStore.registerData.name && globalStore.registerData.name.length < 2) {
      showErrorToast(lang == 'ar' ? 'يجب أن يكون الاسم مكونًا من حرفين على الأقل' : 'Name must be at least 2 characters');
    }
    else if (!globalStore.registerData.phone) {
      showErrorToast(lang == 'ar' ? 'الهاتف مطلوب' : 'Phone is required');
    }
    else if (globalStore.registerData.phone && (globalStore.registerData.phone.length < 9 || globalStore.registerData.phone.length > 10)) {
      showErrorToast(lang == 'ar' ? 'يجب أن يكون الهاتف مكونًا من 9 إلى 10 أرقام' : 'Phone must be between 9 to 10 digits');
    }
    // else if (!globalStore.registerData.email) {
    //   showErrorToast(lang == 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required');
    // }
    else if (!globalStore.registerData.city_id) {
      showErrorToast(lang == 'ar' ? 'المدينة مطلوبة' : 'City is required');
    }
    else if (globalStore.userType == 1 && !globalStore.registerData.commercial_registration_num) {
      showErrorToast(lang == 'ar' ? 'رقم السجل التجاري مطلوب' : 'Commercial registration number is required');
    }
    else if (globalStore.userType == 1 && globalStore.registerData.commercial_registration_num && globalStore.registerData.commercial_registration_num.length < 10) {
      showErrorToast(lang == 'ar' ? 'يجب أن يكون رقم السجل التجاري مكونًا من 10 أرقام على الأقل' : 'Commercial registration number must be at least 10 digits');
    }
    else if (!globalStore.registerData.terms) {
      showErrorToast(lang == 'ar' ? 'يجب قبول الشروط والأحكام' : 'You must accept the terms and conditions');
    }else{
      const registerData = new FormData()
      registerData.append('user_type', globalStore.userType)
      registerData.append('image', globalStore.registerData.image)
      registerData.append('name', globalStore.registerData.name)
      registerData.append('phone', globalStore.registerData.phone)
      registerData.append('email', globalStore.registerData.email)
      registerData.append('city_id', globalStore.registerData.city_id)
      registerData.append('commercial_registration_num', globalStore.registerData.commercial_registration_num)
      registerData.append('terms', globalStore.registerData.terms)
      registerData.append('lang', lang)
      globalStore.setUserPhone(globalStore.registerData.phone)
      submitMethod('sign-up', false ,registerData , 'POST' ,'/activation_code')
    }
  }

  onMounted(()=>{
    getMethod('cities' , '' , false , false)
  })
</script>

<style lang="scss" scoped>
  .auth_page{
    padding-block: 150px 50px;
    .content{
      form{
        label {
          margin-bottom: -15px;
          + .input{
            margin-bottom:20px;
            &:last-of-type{
              margin-bottom: 20px !important;
            }
          }
        }
      }
    }
    label{
      a{
        color:$mainColor;
        text-decoration: underline;
        &:hover{
          text-decoration:none;
        }
      }
    }
    @media (max-width:767px){
      padding-block: 50px;
    }
  }
</style> 
