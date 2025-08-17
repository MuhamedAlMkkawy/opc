<template>
  <div class="variant_types">
    <div class="image">
      <img src="~/assets/images/logo.png" alt="img" loading="lazy">
    </div>
    <LanguageSwitch />
    <h2>{{ $t('user_type.ask_type') }}</h2>
    <ul class="visitors_type">
      <li @click="handleUserType(0)">
        {{ $t('user_type.individual') }}
      </li>
      <li @click="handleUserType(1)">
        {{ $t('user_type.company') }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  // define router
  const router = useRouter()

  // define local route
  const localeRoute = useLocaleRoute()

  // handle global store
  const globalStore = useGlobalStore()


  // define handle user type 
  const handleUserType = (userType) =>{
    globalStore.defineUserType(userType)
    if(globalStore.authProcess === 'login'){
      router.push(localeRoute('/login'))
    }else if(globalStore.authProcess === 'register'){
      router.push(localeRoute('/register'))
    }
  }
  // for not viweing the layout here 
  definePageMeta({
    layout: false,
  });
</script>

<style lang="scss" scoped>
  .variant_types{
    max-width: 600px;
    margin: 0 auto;
    @include displayFlex($direction:column , $gap : clamp(10px , 4vw , 40px) );
    height: 100vh;
    .image{
      max-width: 250px;
      margin: 0 auto;
      img{
        object-fit: contain;
      }
    }
    h2{
      font-size: clamp(20px, 4vw , 30px);
      font-weight: 500;
    }
    .visitors_type{
      @include displayFlex($gap : 10px clamp(10px , 4vw , 80px));
      li{
        width: 300px;
        height:300px;
        border-radius: 25px;
        border: 3px solid ;
        background: #efefef;
        font-size: clamp(25px , 4vw , 45px);
        font-weight: 500;
        @include displayFlex();
        transition:0.3s;
        cursor: pointer;
        &:hover{
          background: transparent;
        }
        &:first-of-type{
          color: $mainColor;
          border-color: rgb($mainColor , 0.4);
        }
        &:last-of-type{
          color: $secColor;
          border-color: rgb($secColor , 0.4);
        }
      }
      @media (max-width:767px){
        flex-wrap: wrap;
        li{
          width: 160px;
          height: 160px;
        }
      }
      @media (max-width:350px){
        li{
          width: 100%;
          height: 160px;
        }
      }
    }
  }
</style>