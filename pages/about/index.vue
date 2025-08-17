<template>
  <div class="page static_page">
    <div class="container">
      <div class="content">
        <div class="page_text">
          <h2>{{ $t('about.title') }}</h2>
          <p>
            {{getResult}}
          </p>
        </div>
        <div class="image">
          <img src="/assets/images/logo.png" alt="image" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod('about' , '' , false , false)
  })
</script>

<style lang="scss" scoped>

</style>