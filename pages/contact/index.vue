<template>
  <div class="static_page contact">
    <div class="container">
      <div class="content">
        <div class="image">
          <img src="/assets/images/contact_img.jpeg" alt="Contact Image" loading="lazy" />
        </div>
        <form class="page_text" @submit.prevent="handleSubmit">
          <h2>{{ $t('contact.title') }}</h2>

          <label for="Name">{{ $t('contact.name_label') }}</label>
          <div class="input">
            <input 
              type="text" 
              id="Name" 
              :placeholder="$t('contact.name_placeholder')" 
              v-model="body.name"
            />
          </div>

          <label for="Phone">{{ $t('contact.phone_label') }}</label>
          <div class="input">
            <input 
              type="text" 
              id="Phone" 
              :placeholder="$t('contact.phone_placeholder')"
              v-model="body.phone" 
            />
          </div>

          <label for="detailsSubject">{{ $t('contact.msgSubject_label') }}</label>
          <div class="input">
            <input 
              type="text" 
              id="detailsSubject" 
              :placeholder="$t('contact.msgSubject_placeholder')"
              v-model="body.subject" 
            />
          </div>

          <label for="detailsText">{{ $t('contact.msgText_label') }}</label>
          <div class="input">
            <textarea 
              id="detailsText" 
              :placeholder="$t('contact.msgText_placeholder')"
              v-model="body.details"
              @key.enter="handleSubmit"
            ></textarea>
          </div>

          <button type="submit" class="main-btn">
            {{ $t('contact.send_btn') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>

  // define body 
  const body = ref({
    name : '',
    phone : '',
    subject : '',
    details : ''
  })

  // define global store
  const globalStore = useGlobalStore()


  // handle use Toast
  const { showErrorToast } = useToastMsg()

  // define useAPi Methods
  const { submitMethod } = useApiMethods();

  // define submit form function
  const handleSubmit = () => {
    if(!body.value.name){
      showErrorToast(globalStore.lang == 'ar' ? 'يجب إضافة الإسم' : 'Please Enter Your Name')
    }
    else if (body.value.name && body.value.name.length < 2) {
      showErrorToast(globalStore.lang == 'ar' ? 'يجب أن يكون الاسم مكونًا من حرفين على الأقل' : 'Name must be at least 2 characters');
    }
    else if (!body.value.phone) {
      showErrorToast(globalStore.lang == 'ar' ? 'الهاتف مطلوب' : 'Phone is required');
    }
    else if (body.value.phone && (body.value.phone.length < 9 || body.value.phone.length > 10)) {
      showErrorToast(globalStore.lang == 'ar' ? 'يجب أن يكون الهاتف مكونًا من 9 إلى 10 أرقام' : 'Phone must be between 9 to 10 digits');
    }
    else if (!body.value.subject) {
      showErrorToast(globalStore.lang == 'ar' ? 'عنوان الرسالة مطلوب' : 'Subject is required');
    }
    else if(body.value.subject && body.value.subject.length < 2) {
      showErrorToast(globalStore.lang == 'ar' ? 'يجب أن يكون عنوان الرسالة مكونًا من حرفين على الأقل' : 'Subject must be at least 2 characters');
    }
    else if (!body.value.details) {
      showErrorToast(globalStore.lang == 'ar' ? 'نص الرسالة مطلوب' : 'details Text is required');
    }else if (body.value.details && body.value.details.length < 10) {
      showErrorToast(globalStore.lang == 'ar' ? 'يجب أن يكون نص الرسالة مكونًا من 10 حروف على الأقل' : 'details Text must be at least 10 characters');
    }else {
      submitMethod('new-complaint' , true , body.value , 'POST' , '/home' , '');
    }
  }
</script>

<style lang="scss" scoped>

</style>