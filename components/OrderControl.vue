<template>
  <div class="order_control">
    <button class="pi pi-trash" @click="handleDeleteItem(props.id)"></button>
    <div class="control_count">
      <h6>{{ $t('cart.update_text') }}</h6>
      <div class="buttons">
        <button 
          :class="['pi pi-minus' , {'disabled' : props.quantity == 1}]" 
          @click="updateItemCount(props.id , +props.quantity-1)"
        ></button>
        {{props.quantity}}
        <button 
          class="pi pi-plus"
          @click="updateItemCount(props.id , +props.quantity+1)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define props
  const props = defineProps({
    id: Number,
    quantity: String,
    refetchEndPoint: String
  })

  // define global store
  const globalStore = useGlobalStore()

  // define api mthods
  const {
    submitMethod,
  } = useApiMethods()

  // handle update item count
  const updateItemCount = (itemID , itemCount) => {
    submitMethod(`carts/${itemID}/update?_method=put&quantity=${itemCount}` , true , '' , 'POST' , '' , props.refetchEndPoint)
  }

  // handle delete from cart
  const handleDeleteItem = (itemID) => {
    submitMethod(`carts/${itemID}/delete?user_type=${globalStore.userType}` , true , '' , 'DELETE' , '' , props.refetchEndPoint)
  }
</script>

<style lang="scss" scoped>

</style>