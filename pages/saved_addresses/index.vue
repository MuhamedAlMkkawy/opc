<template>
  <section class="page saved_addresses_page">
    <div class="container">
      <h1>{{ $t('saved_addresses.title') }}</h1>
      <div class="content">
        <div 
          :class="['address_tab' , {'active' : globalStore?.orderData?.delivery_type != '' && globalStore?.orderData?.address_id == address.id}]" 
          v-for="address in getResult" 
          :key="address.id"
          :style="{ cursor: globalStore?.orderData?.delivery_type !== undefined ? 'auto' : 'pointer' }"
          @click="globalStore.orderData.address_id = address.id"
        >
          <div class="head_tab">
            <h3>{{address.title}} :</h3>
            <div class="control_btns" v-if="!globalStore?.orderData?.delivery_type">
              <button class="pi pi-pencil" @click="handleEditAddress(address.id)"></button>
              <button class="pi pi-trash" @click="handleShowDeleteAddressPopup(address.id)"></button>
            </div>
          </div>
          <p>
            {{ address.details }}
          </p>
        </div>
        <Empty v-if="getResult?.length == 0" />
      </div>
      <NuxtLink 
        :to="globalStore?.orderData?.delivery_type == ''? '' :  localeRoute('/confirm_cart')"
        class="main-btn centered reversed" 
        @click="globalStore?.orderData?.delivery_type == ''? handleShowLocationPopup() : globalStore.orderData.new_address = {}">
        {{
          globalStore?.orderData?.delivery_type == "" ? 
          $t('static_texts.add_new') : 
          $t('static_texts.choose') 
        }}
      </NuxtLink>
    </div>
    <LocationPopup 
      :addressID="addressID"
      v-if="showLocationPopup"
      @handleShowLocationPopup="handleShowLocationPopup"
      @handleAddress = "handleAddress"
    />
    <DeleteAddressPopup 
      v-if="showDeleteAddressPopup"
      @handleShowDeleteAddressPopup="handleShowDeleteAddressPopup"
      @handleDeleteAddress="handleDeleteAddress"
    />
  </section>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore()

  // define loclae route 
  const localeRoute = useLocaleRoute()

  // define api methods
  const {
    getMethod,
    getResult,
    submitMethod,
    submitResult
  } = useApiMethods()

  // define route
  const route = useRoute()

  // define addressID
  const addressID = ref(null)

  // define control location popup
  const showLocationPopup = ref(false)
  const handleShowLocationPopup = () => {
    showLocationPopup.value = !showLocationPopup.value
  }

  // handle edit address
  const handleEditAddress = (id) => {
    addressID.value = id
    handleShowLocationPopup()
  }


  // handle delete address popup
  const showDeleteAddressPopup = ref(false)
  const handleShowDeleteAddressPopup = (id) => {
    addressID.value = id
    showDeleteAddressPopup.value = !showDeleteAddressPopup.value
  }

  const handleDeleteAddress = () => {
    submitMethod(`addresses/${addressID.value}/delete`, true , '' , 'DELETE' , '/saved_addresses' , 'addresses')
  }

  watchEffect(()=>{
    if(submitResult?.value?.data?.key == 'success' && showDeleteAddressPopup.value){
      handleShowDeleteAddressPopup()
    }
  })

  watch(()=> submitResult?.value?.data?.key , (newValue) => {
    if(newValue == 'success' && showLocationPopup.value){
      handleShowLocationPopup()
    }
  })
  

  // define submit function
  const handleAddress = (addressInfo) => {
    submitMethod(addressID.value ? `addresses/${addressID.value}/update?_method=put` : 'addresses' , true , addressInfo , 'POST' , '' , 'addresses')
  }

  onMounted(()=>{
    getMethod('addresses' , '' , true , false)
  })
</script>

<style lang="scss" scoped>

</style>