<template>
  <section class="page">
    <div class="container">
      <h3 class="title centered">
        {{$t('settings.title')}}
      </h3>
      <ul>
        <li>
          <NuxtLink to="/edit_data">{{$t('settings.edit_data')}}</NuxtLink>
          <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
        </li>
        <li @click="handleChangePhone">
          <NuxtLink to="/verification_code">{{$t('settings.edit_phone')}}</NuxtLink>
          <i :class="`pi pi-angle-${globalStore.lang == 'ar' ? 'left' : 'right'}`"></i>
        </li>
      </ul>
      <button class="main-btn danger" @click="handleShowDeleteAccountPopup">
        {{$t('settings.delete_account')}}
      </button>
    </div>
    <DeleteAccountPopup 
      v-if="showDeleteAccountPopup"
      @handleShowDeleteAccountPopup="handleShowDeleteAccountPopup"
      @handleDeleteAccount="handleDeleteAccount"
    />
  </section>
</template>

<script setup>
  // define global store
  const globalStore = useGlobalStore();

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  // define the page before the verification code to manage where to go after it .
  const handleChangePhone = () => {
    globalStore.definePageBeforeCodePage('check_phone')
    getMethod('current-phone-send-code' , '' , true , false)
  }

// handle delete account popup
  const showDeleteAccountPopup = ref(false)

  const handleShowDeleteAccountPopup = () => {
    showDeleteAccountPopup.value = !showDeleteAccountPopup.value
  }

  // handle delete account
  const handleDeleteAccount = () => {
    handleShowDeleteAccountPopup()
  }
</script>

<style lang="scss" scoped>
  ul{
    max-width: 1030px;
    margin: 30px auto 50px;
    border: 1px solid $mainColor;
    border-radius: 6px;
    padding: 0px 15px ;
    li{
      @include displayFlex($justify : space-between);
      padding: 18px 0 18px;
      border-bottom: 1px solid #CBCBCB;
      a{
        font-size: clamp(16px , 2.5vw , 20px);
        font-weight: 300;
        color: $textColor;
        display: block;
        flex-grow: 1;
      }
      &:last-of-type{
        // padding-bottom:10px;
        border-bottom: unset;
      }
    }
  }
  
  .main-btn.danger{
    background: rgba($color: $secColor, $alpha: 0.12);
    color: $secColor;
    border-color: transparent;
  }
</style>