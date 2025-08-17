<template>
  <div :style="{ direction: appDirection }">
    <NuxtLayout>
      <NuxtPage />
      <Toast :style="{ direction: appDirection }" />
      <Loading v-if="globalStore?.loading" />
      <ImagePopup v-if="globalStore?.showImagePopup" />
      <LoginPopup v-if="globalStore?.showLoginPopup" />
    </NuxtLayout>
  </div>
</template>

<script setup>
  import Toast  from 'primevue/toast';
  import { initializeApp } from "firebase/app";
  import { getMessaging, getToken , onMessage } from "firebase/messaging";

  // define global store
  const globalStore = useGlobalStore()

  // define router
  const router = useRouter()

  // define route 
  const route = useRoute()

  // define api methods
  const {
    getMethod,
     getResult
  } = useApiMethods()

  // define locale route
  const localeRoute = useLocaleRoute()

  // define useToast
  const{
    showErrorToast,
  } = useToastMsg()

  // define availableLocales
  const appDirection = computed(() => {
    return useCookie('i18n_redirected').value == 'ar' ? 'rtl' : 'ltr'
  })

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBlubHT4bDJNEfW4zgt9_BAN1ZO5AXP1_g",
    authDomain: "muhit-alqate-opc.firebaseapp.com",
    projectId: "muhit-alqate-opc",
    storageBucket: "muhit-alqate-opc.firebasestorage.app",
    messagingSenderId: "235109392464",
    appId: "1:235109392464:web:c9328ce1a28a0cb3fc7155",
    measurementId: "G-V1N87GHQQD"
  };


  watchEffect(()=> {
    if(getResult?.value?.notifications){
      globalStore.notifications = getResult?.value?.notifications
    }
    if(route.path.endsWith('notifications')){
      globalStore.isNotified = false
    }
  })

  onMounted(() => {
    // Initialize Firebase
    initializeApp(firebaseConfig);
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
        // console.log('Message received. ', payload);
        globalStore.isNotified = true
        getMethod('notifications?count_notifications' , 1 , true , false)
        if(payload.data.type == 'block'){
          useCookie('authStore').value = ''
          useCookie('globalStore').value = ''
          setTimeout(() => {
            router.push(localeRoute('/'))
          }, 1000)
          showErrorToast(payload.notification.body)
        }
    });

    getToken(messaging, { vapidKey: 'BMhBXhjjbzkpVIY9zimEDh1ziEjUBJVwwe0iaqsC8-aKTjKlr4FUeUp2gKjC5wwegEjy5rvpcwZQBv-ulR9HxKQ' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // console.log(currentToken)
        globalStore.handleDeviceID(currentToken)
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  })
</script>