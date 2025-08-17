<template>
  <section class="page cart_page">
    <div class="container" v-if="!showLocationMap">
      <TrackOrder />
      <div class="delivery_method">
        <h4>{{ $t('current_location.title') }}</h4>
        <form @submit.prevent>
          <label for="location">{{ $t('current_location.label') }}</label>
          <div class="input" @click="router.push(localeRoute('/map'))">
            <input 
              id="location"
              type="text"
              :placeholder="$t('current_location.placeholder')"
              :value="newAddress?.map_desc || ''"
              readonly
            >
            <i class="pi pi-image"></i>
          </div>
        </form>
        <button 
          class="main-btn" 
          @click="handleBranches"  
          v-if="newAddress?.lat && newAddress?.lng"
          :disabled="!newAddress?.lat || !newAddress?.lng"
        >
          {{ $t('current_location.button.view_nearest_branches') }}
        </button>
      </div>
      <div class="flex_buttons">
        <button class="main-btn reversed" @click="router.back()">
          {{ $t('static_texts.back') }}
        </button>
        <button 
          class="main-btn" 
          @click="handleSubmit" 
          v-if="globalStore?.orderData?.branch_id"
          :disabled="!globalStore?.orderData?.branch_id"
        >
          {{ $t('static_texts.next') }}
        </button>
      </div>
    </div>
    <div class="detect_location" v-else>
      <div class="image">
        <img src="/assets/images/background.jpg" alt="location image" loading="lazy">
      </div>
    </div>
  </section>
</template>

<script setup>
  // define locale route
  const localeRoute = useLocaleRoute();

  // define global store
  const globalStore = useGlobalStore();

  // define router
  const router = useRouter();

  const newAddress = ref();

  // define show location map
  const showLocationMap = ref(false);

  // define handle Nearest branches function
  const handleBranches = () => {
    router.push(localeRoute('/nearest_branches'));
  };

  // handle select location
  const handleSubmit = () => {
    router.push(localeRoute('/select_location'));
};

onMounted(()=>{
  newAddress.value = JSON.parse(globalStore?.orderData?.new_address || '{}')
})
</script>

<style lang="scss" scoped>
  form{
    margin-bottom: 40px;
    padding: 30px;
    background: #fff;
    border-radius: 5px;
    .input{
      max-width: 600px;
      @include displayFlex($justify : space-between);
      cursor: pointer;
      input{
        cursor: pointer;
      }
      i.pi-image{
        color: $mainColor;
      }
    }
    + .main-btn{
      max-width: 700px;
      margin: 0 auto;
      @include displayFlex();
    }
  }
</style>