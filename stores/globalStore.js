import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', () => {
  // define loading 
  const loading = ref(false);
  const setLoading = (newLoading) => {
    loading.value = newLoading;
  };

  // define language
  const lang = ref('');
  const setLang = (newLang) => {
    lang.value = newLang;
    useCookie('i18n_redirected').value = newLang; // Store the language in a cookie
  }

  // store user phone 
  const country_code = ref('966')
  const userPhone = ref('')
  const setUserPhone = (newPhone) => {
    userPhone.value = newPhone
  }
  // define user type
  const userType = ref()
  const defineUserType = (newType) => {
    userType.value = newType
  }

  // define register data
  const registerData = ref({
    image : '',
    name : '',
    phone : '',
    email : '',
    city_id : '',
    commercial_registration_num : '',
    terms : '',
  })

  // define authProcess
  const authProcess = ref('login')
  const defineAuthProcess = (newProcess) => {
    authProcess.value = newProcess
  } 

  // define page before the acivation code page 
  const pageBeforeCode = ref('login')
  const definePageBeforeCodePage = (newPage) => {
    pageBeforeCode.value = newPage
  }

  // store results data from brand filter popup
  const brand_data = ref()
  const brandFilteredData = ref()
  const storeBrandFilteredData = (data) => {
    brandFilteredData.value = data
  }
  
  // handle store search results products
  const searchEndpoint = ref()
  const searchResults = ref()
  const storeSearchResult = (data) => {
    searchResults.value = data
    window?.sessionStorage?.setItem('searchResults' , JSON.stringify(data))
  }
  

  // handle order data
  const orderData = ref({
    notes : '',
    delivery_type : '',
    new_address : {},
    address_id : '',
    branch_id : ''
  })

  // handle device id 
  const device_id = ref(null);
  const handleDeviceID = (newDeviceID) => {
    device_id.value = newDeviceID;
  };

  // handle image popup
  const imageSrc = ref('');
  const showImagePopup = ref(false);
  const handleShowImagePopup = (image) =>{
    imageSrc.value = image
    showImagePopup.value = !showImagePopup.value
  }

  // handle store categories and sub_categories
  const productInfo = ref({})
  const storeProductInfo = (category , subcategory) => {
    productInfo.value.category = category
    productInfo.value.subcategory = subcategory
  }


  // handle control login popup
  const showLoginPopup = ref(false);
  const handleShowLoginPopup = () => {
    showLoginPopup.value = !showLoginPopup.value
  }

  // define room_id
  const room_id = ref('')

  // define if there is any notifications
  const isNotified = ref(false)
  const notifications = ref()

  // Expose state and actions
  return {
    loading,
    setLoading,
    lang,
    setLang,
    country_code,
    userPhone,
    setUserPhone,
    userType,
    defineUserType,
    registerData,
    authProcess,
    defineAuthProcess,
    orderData,
    pageBeforeCode,
    definePageBeforeCodePage,
    device_id,
    handleDeviceID,
    imageSrc,
    showImagePopup,
    handleShowImagePopup,
    productInfo,
    storeProductInfo,
    showLoginPopup,
    handleShowLoginPopup,
    brand_data,
    brandFilteredData,
    storeBrandFilteredData,
    searchEndpoint,
    searchResults,
    storeSearchResult,
    room_id,
    isNotified,
    notifications
  };
}, {
  persist: {
    storage: {
      getItem: (key) => {
        const cookie = useCookie(key, { maxAge: 86400 }); // 1 day in seconds
        return cookie.value ? JSON.parse(cookie.value) : null;
      },
      setItem: (key, value) => {
        const cookie = useCookie(key, { maxAge: 86400 });
        cookie.value = JSON.stringify(value);
      },
      removeItem: (key) => {
        const cookie = useCookie(key);
        cookie.value = null;
      }
    }
  }
});
