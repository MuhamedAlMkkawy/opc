<template>
  <section class="page">
    <div class="container">
      <div class="image">
        <img src="/assets/images/background.jpg" alt="image" loading="lazy">
      </div>
      <button class="main-btn" @click="handleSubmit">
        {{ $t('static_texts.save') }}
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


  const handleSubmit = () => {
    globalStore.orderData.new_address = JSON.stringify({
      lat: '31.08045821',
      lng: '31.3142524',
      map_desc: 'ElRyad',
      title: 'ElRyad',
      details: 'ElRyad City'
    })
    router.push(localeRoute('/current_location'))
  }

</script>

<style lang="scss" scoped>
  .main-btn{
    max-width: 700px;
    margin: 20px auto 0;
  }
</style>