<template>
  <div class="container">
    <section class="page notifications" v-if="notifications?.data?.length > 0">
      <div class="top">
        <h3>{{$t('notification_menu.title')}}</h3>
        <div class="button" @click="handleDeleteAllNotifications">
          <h5>{{$t('notification_menu.delete_all')}}</h5>
          <i class="pi pi-trash trash_all"></i>
        </div>
      </div>
      <ul>
        <li v-for="notification in notifications?.data" :key="notification.id">
          <div class="image">
            <img src="/assets/images/bell.png" alt="image" loading="lazy">
          </div>
          <p>{{notification?.body}}</p>
          <button class="pi pi-trash" @click="handleDeleteNotification(notification?.id)"></button>
        </li>
      </ul>
      <Pagination 
        :data="notifications?.pagination"
        :end-point="'notifications'"
      />
    </section>
    <Empty v-else />
  </div>
</template>

<script setup>
  // define api methods 
  const {
    getMethod,
    getResult,
    submitMethod
  } = useApiMethods()

  // define global store
  const globalStore = useGlobalStore()


  // handle delete notification
  const handleDeleteNotification = (id) => {
    submitMethod(`delete-notification/${id}` , true , '' , 'DELETE' , '' , 'notifications' )
  }


  // handle delete all notifications
  const handleDeleteAllNotifications = () => {
    submitMethod('delete-notifications' , true , '' , 'DELETE' , '' , 'notifications' )
  }

  const notifications = ref()

  watchEffect(()=>{
    if(getResult?.value){
      notifications.value = getResult?.value?.notifications
    }
    if(globalStore?.notifications){
      notifications.value = globalStore?.notifications
    }
  })

  onMounted(()=>{
    getMethod('notifications' , 1 , true , false)
  })
</script>

<style lang="scss" scoped>
  .button{
    @include displayFlex($justify:flex-end ,  $gap : 5px);
    color: $secColor;
    padding: 5px;
    transition: 0.6s;
    cursor: pointer;
    &:hover{
      background: $secColor;
      color: #fff;
      border-radius: 5px;
    }
  }
</style>