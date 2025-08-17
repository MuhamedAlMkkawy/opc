<template>
  <section class="page profile_page">
    <div class="container">
      <h3 class="title centered">
        {{$t('settings.edit_data')}}
      </h3>
      <div class="profile_content">
        <label for="image" class="image">
          <img :src="localImage" alt="image" loading="lazy">
          <i class="pi pi-camera"></i>
        </label>
        <input 
          type="file" 
          name="image" 
          id="image" 
          hidden 
          accept="image/*" 
          @change="handleUploadImage"
        >
        <div class="info">
          <div class="info_side">
            <div class="input-wrap">
              <label for="name">{{$t('settings.labels.name')}}</label>
              <div class="input">
                <input 
                  id="name"
                  type="text"
                  v-model="body.name"
                  :placeholder="$t('settings.placeholders.name')"
                >
              </div>
            </div>
            <div class="input-wrap">
              <label for="email">{{$t('settings.labels.email')}}</label>
              <div class="input">
                <input 
                  id="email"
                  type="text"
                  v-model="body.email"
                  :placeholder="$t('settings.placeholders.email')"
                >
              </div>
            </div>
          </div>
          <!-- <hr> -->
          <div class="info_side">
            <CitiesSelect 
              :city="Number(body.city_id)"
              @handleChangeCity="handleChangeCity"
            />
            <!-- {{ profileData?.data?.city_id }} -->
          </div>
        </div>
      </div>
      <button class="main-btn" @click="handleSubmit">
        {{$t('static_texts.save_changes')}}
      </button>
    </div>
    <SuccessPopup 
      v-if="showSuccessPopup"
      :message="$t('settings.successText')"
    />
  </section>
</template>

<script setup>
   // define body
  const body = ref({
    image : '',
    name : '',
    email : '',
    city_id : ''
  })

  // define global store 
  const globalStore = useGlobalStore();

  // handle success popup
  const showSuccessPopup = ref(false)
  const handleShowSuccessPopup = () => {
    showSuccessPopup.value = !showSuccessPopup.value
  }

  // use toast msg
  const { showErrorToast } = useToastMsg()

  // handle submit form
  const { 
    submitMethod , 
    submitResult , 
    getMethod , 
    getResult 
  } = useApiMethods();

  // define upload image function
  const localImage = ref('');
  const imageChanged = ref(false)
  const handleUploadImage = (event) =>{
    const file = event.target.files[0]

    if (!file.type.startsWith("image/")) {
        showErrorToast(globalStore.lang == 'en' ?'Invalid file type. Recommended to upload images in JPG or PNG format.' : 'نوع الملف غير صالح. يوصى بتحميل الصور بتنسيق JPG أو PNG.');
    }
    else{
      imageChanged.value = true
      localImage.value = URL.createObjectURL(file)
      body.value.image = file
    }
  }

  // handle change city
  const handleChangeCity = (newCity) => {
    // console.log(newCity)
    body.value.city_id = newCity
  }

  // define language
  const lang = globalStore.lang


  // handle submit 
  const handleSubmit = () =>{
    if(!body.value.image){
      showErrorToast(lang == 'ar' ? 'يجب إضافة صورة للاستمرار.' : 'Please upload an image file to proceed.');
    }
    else if (!body.value.name) {
      showErrorToast(lang == 'ar' ? 'الاسم مطلوب' : 'Name is required');
    }
    else if (body.value.name && body.value.name.length < 2) {
      showErrorToast(lang == 'ar' ? 'يجب أن يكون الاسم مكونًا من حرفين على الأقل' : 'Name must be at least 2 characters');
    }
    else if (!body.value.city_id) {
      showErrorToast(lang == 'ar' ? 'المدينة مطلوبة' : 'City is required');
    }
    else{
      const userData = new FormData()
      if(imageChanged.value){
        userData.append('image' , body.value.image)
      }
      userData.append('name' , body.value.name)
      if (body.value.email) {
        userData.append('email', body.value.email);
      }
      userData.append('city_id' , body.value.city_id)
      submitMethod('update-profile?_method=put' , true , userData , 'POST' , '/home' , 'profile')
    }
  }

  onMounted(()=>{
    // fetch profile data 
    getMethod('profile' , '' , true , false);
  })

  watchEffect(()=>{
    if (getResult?.value) {
      // console.log(getResult?.value)
      localImage.value = getResult.value?.image
      body.value.image = getResult.value?.image
      body.value.name = getResult.value?.name
      body.value.email = getResult.value?.email
      body.value.city_id = getResult.value?.city_id
    }
    if(submitResult?.value?.key == 'success'){
      handleShowSuccessPopup()
    }
  })
</script>

<style lang="scss" scoped> 
  .profile_page .profile_content .info{
    align-items: flex-start !important;
    .info_side{
      // &:first-of-type{
      //   padding-inline-end: 0 !important;
      // }
      .input{
        select{
          width: 100%;
        }
      }
    }
  }
  a{
    .main-btn{
      display: none !important;
    }
  }
</style>