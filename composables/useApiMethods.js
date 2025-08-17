import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/globalStore';
import { useAuthStore } from '@/stores/authStore';
import { useToastMsg } from '@/composables/useToastMsg';
import { fetchApiData , submitApiForm } from '@/composables/useApiFetch';
import { ref } from 'vue';

export function useApiMethods() {
  // define global store
  const globalStore = useGlobalStore();

  // define auth store
  const authStore = useAuthStore();

  // define route
  const route = useRoute();

  // define router
  const router = useRouter();

  // define local route
  const localeRoute = useLocaleRoute()

  // define useToastMsg
  const { 
    showErrorToast, 
    showSuccessToast,
    showInfoToast,
    showWarnToast 
  } = useToastMsg();


  // define handle the next route 
  const handleNextRoute = (nextRoute) => {
    setTimeout(()=>{
      if(nextRoute == 'reload_page'){
        router.go(0);
      }else{
        router.push(localeRoute(nextRoute));
      }
    } , 500)
  }


  // define handle the toast message and its type
  const handleToastMsg = (type , message) => {
    // to stop the loading while showing the message
    globalStore.setLoading(false);
    if(type == 'success'){
      showSuccessToast(message);
    }else if(type == 'info'){
      showInfoToast(message);
    }else if(type == 'warn'){
      showWarnToast(message);
    }else{
      showErrorToast(message);
    }
  }

  // Fetch Data 
  const getResult = ref(null);
  const getMethod = async (apiUrl , pageNumber ,authed , showToast) => {
    if(!route.path.startsWith('/products/') && !apiUrl.endsWith('feedbacks')){
      globalStore.setLoading(true);
    }
    getResult.value = null
    const { data, error } = await fetchApiData(`${apiUrl}${apiUrl.includes('?') ? '&' : '?'}device_id=${globalStore.device_id}&user_type=${globalStore.userType ?? 0}${pageNumber ? `&page=${pageNumber}` : ''}`, authed);

    // ${authStore?.userData ? `?device_id=${globalStore.device_id}&` : apiUrl.startsWith('search?') ? '&' : '?' }
    if (error) {
      globalStore.setLoading(false)
      handleToastMsg('error' , error?.response?.data?.message)
    } else {
      if (data.key == 'success') {
        getResult.value = data?.data;
        if(apiUrl.startsWith('search?')){
          globalStore.storeSearchResult(data?.data)
        }
        if(apiUrl.startsWith('orders/') && apiUrl.endsWith('/change-status')){
          handleNextRoute('reload_page')
        }
      }
      else if(
        data?.key == 'unauthenticated' && !apiUrl?.startsWith('home') ||
        data?.key == 'needActive' || 
        data?.key == 'not_approved' ||
        data?.key == 'blocked'
      ){
        handleToastMsg('error' , data?.msg)
        setTimeout(() => {
          handleNextRoute('/')
        }, 500);
        useCookie('authStore').value = ''
      }
      if(showToast){
        handleToastMsg(data?.key , data?.msg)
      }
      globalStore.setLoading(false)
    }
  }


  // submit form function
  const submitResult = ref(null)
  const submitMethod = async (endPoint, authed , payload , method  , nextRoute , refetchApi) => {
    globalStore.setLoading(true);
    const {data , error} = await submitApiForm(endPoint, authed ,  payload , method);
    
    if (error) {
      handleToastMsg('error' , error?.response?.data?.message)
      globalStore.setLoading(false)
    } else {
      if (data.key == 'success') {
        handleNextRoute(nextRoute);
        if (refetchApi) {
          getMethod(refetchApi , '' ,authStore ? true : false , false)
        }
        if(
          endPoint == 'activate?_method=patch' || 
          endPoint == 'update-profile?_method=put'
        ){
          authStore.handleUserData(data?.data);
        }
      }else if (
        data.key == 'unauthenticated' || 
        data.key == 'needActive' || 
        data.key == 'not_approved'
      ){
        handleNextRoute('/')
        useCookie('authStore').value = ''
      }
      submitResult.value = {data , endPoint};
      if(endPoint != 'orders'){
        handleToastMsg(data?.key , data?.msg)
      }
      globalStore.setLoading(false)
    }
  };  

  return {
    getMethod,
    getResult,
    submitMethod,
    submitResult,
    handleNextRoute
  };
}