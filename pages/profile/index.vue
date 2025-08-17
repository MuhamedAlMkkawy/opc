<template>
  <section class="page profile_page">
    <div class="container">
      <h3 class="title centered">
        {{$t('profile.title')}}
      </h3>
      <div class="profile_content">
        <div class="image">
          <img :src="getResult?.image" alt="image" loading="lazy">
        </div>
        <div class="info">
          <div class="info_side">
            <div class="input-wrap">
              <label for="name">{{$t('profile.labels.name')}}</label>
              <div class="input">
                <input 
                  disabled
                  id="name"
                  type="text"
                  :value="getResult?.name"
                >
              </div>
            </div>
            <div class="input-wrap">
              <label for="email">{{$t('profile.labels.email')}}</label>
              <div class="input">
                <input 
                  disabled
                  id="email"
                  type="text"
                  :value="getResult?.email"
                  v-if="getResult?.email"
                >
                <span v-else>
                  {{ globalStore.lang === 'en' ? 'No Email Found' : 'لا يوجد بريد الكتروني' }}
                </span>
              </div>
            </div>
          </div>
          <!-- <hr> -->
          <div class="info_side">
            <div class="input-wrap">
              <label for="city">{{$t('profile.labels.city')}}</label>
              <div class="input">
                <input 
                  disabled
                  id="city"
                  type="text"
                  :value="getResult?.city"
                >
              </div>
            </div>
            <div class="input-wrap">
              <label for="phone">{{$t('profile.labels.phone')}}</label>
              <div class="input">
                <input 
                  disabled
                  id="phone"
                  type="text"
                  :value="getResult?.phone"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  // define api methods
  const {
    getMethod ,
    getResult
  } = useApiMethods()

  // define global store
  const globalStore = useGlobalStore()


  onMounted(()=>{
    getMethod('profile' , '' , true , false)
  })
</script>

<style lang="scss" scoped> 
  .image{
    cursor: unset !important;
  }
</style>