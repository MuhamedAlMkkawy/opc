<template>
  <div class="popup">
    <div class="content">
      <button class="pi pi-times close_btn" @click="emit('handleShowLocationPopup')"></button>
      <h4>
        {{ props ?
            $t('saved_addresses.edit_title') :
            $t('saved_addresses.add_title')  
        }}
      </h4>
      <div class="image">
        <img src="/assets/images/background.jpg" alt="image" loading="lazy">
      </div>
      <label for="address_title">
        {{$t('saved_addresses.form.title_label')}}
      </label>
      <div class="input">
        <input 
          id="address_title"
          type="text"
          :placeholder="$t('saved_addresses.form.title_placeholder')"
          v-model="body.title"
        >
      </div>
      <label for="address_details">
        {{$t('saved_addresses.form.details_label')}}
      </label>
      <div class="input">
        <input 
          id="address_details"
          type="text"
          :placeholder="$t('saved_addresses.form.details_placeholder')"
          v-model="body.details"
        >
      </div>
      <button class="main-btn" @click="handleSubmit">
        {{ $t('static_texts.save') }}
      </button>
    </div>
  </div>
</template>

<script setup>
  // handle i18n 
  const { t } = useI18n()

  // define props
  const props = defineProps({
    addressID : Number
  })

  // handle toast messages
  const{
    showErrorToast
  } = useToastMsg()

  // define api methods 
  const {
    getMethod,
    getResult,
    submitMethod,
    submitResult
  } = useApiMethods()


  // define body 
  const body = ref({
    title : props.title,
    details : props.details,
    lat : '31.08045821',
    lng : '31.3142524',
    map_desc : 'ElRyad'
  })
  
  // define emits 
  const emit = defineEmits(['handleShowLocationPopup' , 'handleAddress'])

  // define submit function
  const handleSubmit = () => {
    if(!body.value.title){
      showErrorToast(t('saved_addresses.validations.title_required'))
    }
    else if(body.value.title && body.value.title.length < 3){
      showErrorToast(t('saved_addresses.validations.title_length'))
    }
    else if(!body.value.details){
      showErrorToast(t('saved_addresses.validations.details_required'))
    }
    else if(body.value.details && body.value.details.length < 3){
      showErrorToast(t('saved_addresses.validations.details_length'))
    }
    else if(!body.value.lat && !body.value.lng){
      showErrorToast(t('saved_addresses.validations.location_required'))
    }
    else{
      emit('handleAddress', body.value)
    }
  }


  watchEffect(()=>{
    if(submitResult?.value?.data?.key == 'success'){
      emit('handleShowLocationPopup')
    }
    if(props.addressID && getResult?.value){
      body.value.title = getResult?.value?.filter((item) => item?.id == props?.addressID)[0]?.title
      body.value.details = getResult?.value?.filter((item) => item?.id == props?.addressID)[0]?.details
      body.value.lat = getResult.value.filter((item) => item.id == props.addressID)[0]?.lat
      body.value.lng = getResult.value.filter((item) => item.id == props.addressID)[0]?.lng
      body.value.map_desc = getResult.value.filter((item) => item.id == props.addressID)[0]?.map_desc
    }
  })

  onMounted(()=>{
    getMethod('addresses' , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .popup{
    .content{
      h4{
        text-align: center;
        margin-bottom: 10px;
      }
      .image{
        max-width: unset;
        height: 300px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 10px;
      }

    }
  }
</style>