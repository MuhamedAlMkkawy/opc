<template>
  <div>
    <div class="upper_bar">
      <div class="container">
        <div class="content">
          <NuxtLink :to="localeRoute('/profile')" class="info" v-if="userInfo">
            <div class="image">
              <img :src="userInfo?.image" alt="img" loading="lazy">
            </div>
            <h3>{{userInfo?.name}}</h3>
          </NuxtLink>
          <NuxtLink :to="localeRoute('/')" class="join_link" v-else>
            <i class="pi pi-user"></i>
            <span>{{ $t('signText_header') }}</span>
          </NuxtLink>
          <button @click="!authStore.userData ? globalStore.handleShowLoginPopup() : handleShowNotificationMenu()" class="notification image">
            <div class="notification_badge" v-if="globalStore?.isNotified">
              <!-- {{ countNotifications }} -->
            </div>
            <img src="/assets/images/bell.png" alt="image" loading="lazy">
          </button>
          <LanguageSwitch />
        </div>
      </div>
      <div class="notification_menu" v-if="showNotificationMenu">
        <div class="top">
          <h3>{{$t('notification_menu.title')}}</h3>
          <NuxtLink :to="localeRoute('/notifications')" @click="showNotificationMenu = false">{{$t('notification_menu.view_all')}}</NuxtLink>
        </div>
        <ul v-if="notifications?.data?.length > 0">
          <li v-for="notification in notifications?.data" :key="notification?.id">
            <div class="image">
              <img src="/assets/images/bell.png" alt="image" loading="lazy">
            </div>
            <p>{{notification?.body}}</p>
            <button class="pi pi-trash" @click="handleDeleteNotification(notification?.id)"></button>
          </li>
        </ul>
        <Empty v-else />
      </div>
    </div>
    <div class="navbar">
      <div class="container">
        <div class="content">
          <NuxtLink :to="localeRoute('/home')" class="image">
            <img src="/assets/images/logo.png" alt="image" loading="lazy">
          </NuxtLink>
          <div class="buttons">
            <NuxtLink class="favourites" :to="localeRoute('/favourites')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 24" fill="none">
                <path d="M13.8237 22.2227C13.4168 22.3643 12.7465 22.3643 12.3396 22.2227C8.86879 21.054 1.11328 16.1786 1.11328 7.91528C1.11328 4.2676 4.09341 1.31641 7.7677 1.31641C9.94594 1.31641 11.8729 2.35523 13.0817 3.96068C14.2905 2.35523 16.2293 1.31641 18.3956 1.31641C22.0699 1.31641 25.05 4.2676 25.05 7.91528C25.05 16.1786 17.2945 21.054 13.8237 22.2227Z" stroke="#333333" stroke-width="1.40378" stroke-linecap="round" stroke-linejoin="round" fill="#fff"/>
              </svg>
            </NuxtLink>
            <NuxtLink :to="localeRoute('/cart')">
              <img src="/assets/images/cart.svg" alt="image" loading="lazy">
            </NuxtLink>
            <button @click="handleShowMainMenu" class="pi pi-bars menu_btn"></button>
          </div>
        </div>
      </div>
    </div>
    <div :class="['main-menu' , {active : showMainMenu}]">
      <div class="top">
        <button class="pi pi-times menu_btn sidebar_btn" @click="handleShowMainMenu"></button>
        <h3>{{$t('menu.title')}}</h3>
      </div>
      <ul class="app_links">
        <li>
          <NuxtLink :to="authStore?.userData ? localeRoute('/home') : ''">{{$t('menu.home')}}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="authStore?.userData ? localeRoute('/orders') : ''">{{$t('menu.orders')}}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="authStore?.userData ? localeRoute('/profile') : ''">{{$t('menu.profile')}}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="authStore?.userData ? localeRoute('/settings') : ''">{{$t('menu.settings')}}</NuxtLink>
        </li>
        <li @click="globalStore.orderData.delivery_type = ''">
          <NuxtLink :to="authStore?.userData ? localeRoute('/saved_addresses') : ''">{{$t('menu.addresses')}}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="authStore?.userData ? localeRoute('/wallet') : ''">{{$t('menu.wallet')}}</NuxtLink>
        </li>
        <li>
          <button v-if="authStore?.userData" @click="handleShowLogoutPopup" class="logout">{{$t('menu.logout')}}</button>
          <NuxtLink :to="localeRoute('/')" v-else >{{$t('menu.login')}}</NuxtLink>
        </li>
      </ul>
    </div>
    <!--####################### Logout Popup #######################-->
    <LogoutPopup 
      v-if="showLogoutPopup"
      @handleShowLogoutPopup = "handleShowLogoutPopup"
    />
  </div>
</template>

<script setup>
  // define locale route
  const localeRoute = useLocaleRoute();

  // define route
  const route = useRoute()

  // define global store
  const authStore = useAuthStore()

  // define global store
  const globalStore = useGlobalStore()

  // define user info
  const userInfo = ref()

  // handle api methods
  const { 
    getMethod , 
    getResult ,
    submitMethod
  } = useApiMethods()

  // define show main menu
  const showMainMenu = ref(false)
  const handleShowMainMenu = () => {
    showMainMenu.value = !showMainMenu.value
  }

  // define show Notification Menu
  const showNotificationMenu = ref(false)
  const handleShowNotificationMenu = () => {
    showNotificationMenu.value = !showNotificationMenu.value
  }


  // handle logout popup
  const showLogoutPopup = ref(false)
  const handleShowLogoutPopup = () =>{
    showLogoutPopup.value = !showLogoutPopup.value
  }


  // handle delete notification
  const handleDeleteNotification = (id) => {
    submitMethod(`delete-notification/${id}` , true , '' , 'DELETE' , '' , 'notifications' )
  }

  // define notifications
  const notifications = ref()

  onMounted(()=>{
    if (useCookie('authStore')?.value) {
      getMethod('notifications?count_notifications' , 1 , true , false)
    } 
    userInfo.value = authStore?.userData
  })

  // make this wather on the path route to close the main header if it changed.
  watchEffect(()=>{
    if(route.path){
      showMainMenu.value = false
    }
    if(getResult?.value){
      notifications.value = getResult?.value?.notifications
    }
    if(globalStore?.notifications){
      notifications.value = globalStore?.notifications
    }
  })

</script>


<style lang="scss" scoped>
  .navbar {
    box-shadow: 0px 3px 4px 0px #0000000d;
    padding-block: 15px;
    margin-block-end: 20px;
    position: relative;
    .content {
      @include displayFlex($justify: space-between);
      @media (max-width : 400px){
        flex-wrap:wrap;
        gap:15px;
        justify-content: center;
      }
      .image {
        max-width: 200px;
        position: relative;
      }

      .buttons {
        @include displayFlex($align: stretch, $gap: clamp(20px, 4vw, 50px));
        position: relative;

        a {
          @include displayFlex();
          &.favourites {
            svg{
              width: 35px;
            }
            &:hover {
              svg{
                path{
                  stroke: #F41010;
                  fill: #F41010;
                }
              }
            }
          }

          &:nth-of-type(2) {
            &:hover {
              filter: invert(50%) sepia(19%) saturate(1480%) hue-rotate(80deg) brightness(99%) contrast(84%);
            }
          }

          .pi {
            font-size: 30px;

            &.pi-heart-fill {
              font-weight: 300;
              color: $secColor;
              display: none;
            }
          }
        }
      }
    }
  }

  .main-menu {
    position: fixed;
    inset-inline-end: -100%;
    top: 0;
    background: #fff;
    height: 100vh;
    max-width: 600px;
    width: 100%;
    padding: 20px 20px;
    z-index: 999;
    box-shadow: 0 0 5px #717171;
    transition:1s;
    &.active{
      inset-inline-end:0;
    }
    .top {
      @include displayFlex($justify: flex-start, $gap: 8px);
      margin-bottom: 40px;

      h3 {
        font-size: clamp(18px, 4vw, 24px);
      }
    }

    ul.app_links {
      @include displayFlex($direction: column, $align: flex-start, $gap: 0px);

      li {
        font-size: 22px;
        font-weight: 500;
        width: 100%;
        padding-inline-start: 50px;
        position: relative;
        z-index: 3;
        transition: 0.3s;
        height: 65px;
        a {
          display: block;
          height: 100%;
          width: 100%;
          padding-block: 15px;
          cursor: pointer;
        }
        
        button.logout{
          padding-block: 20px;
        }

        &:not(:last-of-type) {
          border-bottom: 2px solid #e4e4e4;
        }

        // &::after {
        //   content: '';
        //   position: absolute;
        //   inset-inline-start: 0;
        //   top: 0;
        //   width: 0;
        //   height: 100%;
        //   background: $mainColor;
        //   z-index: -1;
        //   transition: 1s;
        // }

        &:hover {
          color: $mainColor;
          font-size: 25px;
          // transform: scale(1.04);
          // &::after {
          //   width: 100%;
          // }
        }
      }
    }
  }

  button.menu_btn {
    background: $mainColor;
    min-height: 35px;
    width: 40px;
    color: #fff;
    border-radius: 4px;
    font-size: 24px;
    border: 1px solid;
    &.sidebar_btn{
      min-height: 50px;
      font-size: 30px;
    }
    &:hover {
      background: #fff;
      color: $mainColor;
      border: 1px solid $mainColor;
    }
  }
</style>