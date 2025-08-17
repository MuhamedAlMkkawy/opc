<template>
  <section class="page">
    <div class="container">
      <div class="header_page">
        <h3 class="title">{{ $t('delivery_addresses.enter_new_address') }}</h3>
        <NuxtLink :to="localeRoute('/saved_addresses')" class="main-btn reversed">
          {{$t('delivery_addresses.choose_from_saved_addresses')}}
        </NuxtLink>
      </div>
      <div class="image">
        <img src="/assets/images/background.jpg" alt="image" loading="lazy" />
      </div>
      <div class="address_form">
        <div class="inputs">
          <div class="input-wrap">
            <label for="title">{{ $t('delivery_addresses.address_title') }}</label>
            <div class="input">
              <input 
                type="text"
                id="title"
                :placeholder="$t('delivery_addresses.enter_address_title')"
                v-model="body.title"
              >
            </div>
          </div>
          <div class="input-wrap">
            <label for="details">{{ $t('delivery_addresses.address_details') }}</label>
            <div class="input">
              <input 
                type="text"
                id="details"
                :placeholder="$t('delivery_addresses.enter_address_details')"
                v-model="body.details"
              >
            </div>
          </div>
        </div>
        <button class="main-btn" @click="handleSubmit">{{ $t('static_texts.save') }}</button>
      </div>
    </div>
  </section>
</template>

<script setup>
  // define router
  const router = useRouter()

  // define global store
  const globalStore = useGlobalStore()

  // define locale route 
  const localeRoute = useLocaleRoute()

  // handle toast message
  const {
    showErrorToast
  } = useToastMsg()

  // define body
  const body = ref({
    title: '',
    details: '',
    lat : '31.08045821',
    lng : '31.3142524',
    map_desc : 'ElRyad'
  })

  // define submit function
  const handleSubmit = () => {
    if(!body.value.title) {
      showErrorToast(globalStore?.lang == 'en' ? 'Please enter address title' : 'من فضلك ادخل عنوان العنوان')
    }else if(!body.value.details) {
      showErrorToast(globalStore?.lang == 'en' ? 'Please enter address details' : 'من فضلك ادخل تفاصيل العنوان')
    }else{
      globalStore.orderData.new_address = JSON.stringify(body.value)
      globalStore.orderData.address_id = ''
      router.push(localeRoute('/confirm_cart'))
    }
  }
</script> 

<style lang="scss" scoped>
  .header_page{
    @include displayFlex($justify : space-between);
    h3.title{
      margin: 0;
    }
    .main-btn{
      max-width: 300px;
      margin: 0;
    }
  }
  .image{
    height: 300px;
    margin-block: 30px;
  }
  .address_form{
    padding: clamp(10px, 4vw, 50px) clamp(0px, 2.5vw , 50px);
    border-radius: 4px;
    background: rgba($color: $mainColor, $alpha: 0.1);
    .inputs{
      @include displayFlex();
      .input-wrap{
        flex-grow: 1;
      }
    }
    .main-btn{
      max-width: 500px;
      margin: 40px auto 0;
    }
  }
  .input-wrap{
    align-items: flex-start !important;
    label{
      h3{
        font-size: 20px;
        font-weight: 500;
      }
      p{
        font-size: clamp(14px , 4vw , 18px);
      }
    }
    + .main-btn{
      max-width: 200px !important;
      margin: 0;
    }
  }
</style>