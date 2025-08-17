<template>
  <section class="page cart_page">
    <div class="container">
      <div class="delivery_method">
        <h4>{{ $t('delivery_method.title') }}</h4>
        <form action="" class="detailed_content">
          <div class="input-wrap" :class="{ 'active': globalStore.orderData.delivery_type == '0' }">
            <label for="delivery">{{ $t('delivery_method.delivery') }}</label>
            <input 
              type="radio" 
              name="receiving_way" 
              id="delivery" 
              value="0" 
              v-model="globalStore.orderData.delivery_type" 
            />
          </div>
          <div class="input-wrap":class="{ 'active': globalStore.orderData.delivery_type == '1' }">
            <label for="receiving">{{ $t('delivery_method.recieving') }}</label>
            <input 
              type="radio" 
              name="receiving_way" 
              id="receiving" 
              value="1" 
              v-model="globalStore.orderData.delivery_type" 
            />
          </div>
        </form>
      </div>
      <button class="main-btn" @click="handleSubmit">
        {{ $t('delivery_method.submit_btn') }}
      </button>
    </div>
  </section>
</template>


<script setup>
  // define locale route
  const localeRoute = useLocaleRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define router
  const router = useRouter()

  // define use toast 
  const {
    showErrorToast
  } = useToastMsg()

  // define submit functon
  const handleSubmit = () => {
    // globalStore.handleDeliveryMethod(body.value.delivery_method)
    if(globalStore.orderData.delivery_type == 0){
      router.push(localeRoute('/delivery_addresses'))
    }else if(globalStore.orderData.delivery_type == 1){
      router.push(localeRoute('/current_location'))
    }else{
      showErrorToast('info' , globalStore.lang == 'ar' ? 'يجب تحدد طريقة استلام الطلب أولا ' :'You must select receiving way first')
    }
  }

  onMounted(()=>{
    globalStore.orderData= {}
  })
</script>

<style lang="scss" scoped>

</style>