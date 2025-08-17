<template>
  <div>
    <div class="popup complaint_popup">
      <div class="content">
        <button class="pi pi-times close_btn" @click="emit('handleShowAddComplaintPopup')"></button>
        <h3 class="title">{{ $t('static_texts.add_new') }}</h3>
        <form class="page_text" @submit.prevent="handleSubmit">
          <label for="Name">{{ $t('complaint.name_label') }}</label>
          <div class="input">
            <input 
              type="text" 
              id="Name" 
              :placeholder="$t('complaint.name_placeholder')" 
              v-model="body.name"
            />
          </div>

          <label for="Phone">{{ $t('complaint.phone_label') }}</label>
          <div class="input">
            <input 
              type="text" 
              id="Phone" 
              :placeholder="$t('complaint.phone_placeholder')" 
              v-model="body.phone"
            />
          </div>

          <label for="MessageSubject">{{ $t('complaint.msgSubject_label') }}</label>
          <div class="input">
            <input 
              type="text" 
              id="MessageSubject" 
              :placeholder="$t('complaint.msgSubject_placeholder')" 
              v-model="body.subject"
            />
          </div>

          <label for="MessageText">{{ $t('complaint.msgText_label') }}</label>
          <div class="input">
            <textarea 
              id="MessageText" 
              :placeholder="$t('complaint.msgText_placeholder')"
              v-model="body.details"
            ></textarea>
          </div>
          <button type="submit" class="main-btn">
            {{ $t('complaint.send_btn') }}
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
    phone : '' ,
    subject : '' ,
    details : ''
  })


  // define global store
  const globalStore = useGlobalStore()


  // handle use Toast
  const { showErrorToast } = useToastMsg()

  // define useAPi Methods
  const { submitMethod } = useApiMethods();

  // define emits 
  const emit = defineEmits(['handleShowAddComplaintPopup'])

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
      showErrorToast(globalStore.lang == 'ar' ? 'الموضوع مطلوب' : 'Subject is required');
    }
    else if(body.value.subject && body.value.subject.length < 2) {
      showErrorToast(globalStore.lang == 'ar' ? 'يجب أن يكون الموضوع مكونًا من حرفين على الأقل' : 'Subject must be at least 2 characters');
    }
    else if (!body.value.details) {
      showErrorToast(globalStore.lang == 'ar' ? 'التفاصيل مطلوبة' : 'Details are required');
    }else if (body.value.details && body.value.details.length < 10) {
      showErrorToast(globalStore.lang == 'ar' ? 'يجب أن يكون التفاصيل مكونًا من 10 حروف على الأقل' : 'Details must be at least 10 characters');
    }else {
      submitMethod('new-complaint', true , body.value, 'POST', '' ,'reload_page');
      emit('handleShowAddComplaintPopup')
    }
  }
</script>

<style lang="scss" scoped>

</style>