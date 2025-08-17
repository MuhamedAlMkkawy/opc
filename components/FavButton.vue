<template>
  <button class="fav_btn favourite" @click="handleFavouriteProduct(props.productID)">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
      <path d="M13.8237 22.2227C13.4168 22.3643 12.7465 22.3643 12.3396 22.2227C8.86879 21.054 1.11328 16.1786 1.11328 7.91528C1.11328 4.2676 4.09341 1.31641 7.7677 1.31641C9.94594 1.31641 11.8729 2.35523 13.0817 3.96068C14.2905 2.35523 16.2293 1.31641 18.3956 1.31641C22.0699 1.31641 25.05 4.2676 25.05 7.91528C25.05 16.1786 17.2945 21.054 13.8237 22.2227Z" :stroke="isProductFavourite ? '#F41010' : '#333333'" stroke-width="1.40378" stroke-linecap="round" stroke-linejoin="round" :fill="isProductFavourite  ? '#F41010' : '#fff'"/>
    </svg>
  </button>
</template>

<script setup>
  // define route 
  const route = useRoute()


  // define props 
  const props = defineProps({
    productID : Number,
    isFavourite : Boolean
  })

  const isProductFavourite = ref(props.isFavourite)

  // define GlobalStore
  const globalStore = useGlobalStore()

  // define auth store
  const authStore = useAuthStore()

  // handle api methods
  const {
    submitMethod,
    submitResult
  } = useApiMethods()
  

  // handle favourite order
  const handleFavouriteProduct = (orderID) =>{
  const orderForm = new FormData()
    orderForm.append('device_id' , globalStore.device_id)
    orderForm.append('user_type' , globalStore.userType)
    orderForm.append('product_id' , props.productID)
    if(authStore?.userData){
      submitMethod('toggle-favourite' , true , orderForm , 'POST' , route.path.endsWith('/favourites') ? 'reload_page' : '' , globalStore.searchEndpoint ?? '')
    }else{
      globalStore.handleShowLoginPopup()
    }
  }


  watchEffect(()=>{
    if(submitResult?.value?.data?.key == 'success'){
      if(submitResult?.value?.data?.data?.is_added == 1){
        isProductFavourite.value = true
      }else{
        isProductFavourite.value = false
      }
    }
  })
</script>

<style lang="scss" scoped>

</style>