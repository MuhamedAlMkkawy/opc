<template>
  <div class="page branches_page">
    <div class="container">
      <TrackOrder />
      <div class="branches">
        <h3>{{$t('branches.title')}} :</h3>
        <form action="">
          <div class="input-wrap" v-for="branch in getResult" :key="branch.id">
            <input type="radio" name="branch" :id="branch.id" @click="globalStore.orderData.branch_id = branch.id">
            <label :for="branch.id">
              <h4>{{branch.name}} :</h4>
              <p>{{branch.map_desc}}</p>
            </label>
          </div>
          <!-- <div class="input-wrap">
            <input type="radio" name="branch" id="branch_2">
            <label for="branch_2">
              <h4>Branch 2 :</h4>
              <p>Lorem ipsum dolor sit amet consectetur. A ultrices egestas molestie massa. Rutrum eu proin morbi in aliquam ut elit.Lorem ipsum dolor sit amet consectetur.</p>
            </label>
          </div> -->
        </form>
        <FlexButtons 
          @handleSubmit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  // define router
  const router = useRouter()

  // define locale route
  const localeRoute = useLocaleRoute()

  // define global store
  const globalStore = useGlobalStore()

  // define submit function
  const handleSubmit = () => {
    // globalStore.orderData.new_address = {}
    router.push(localeRoute('/check_store'))
  }

  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()

  onMounted(()=>{
    getMethod(`branches-by-nearest?lat=${JSON.parse(globalStore.orderData.new_address).lat}&lng=${JSON.parse(globalStore.orderData.new_address).lng}` , '' , true , false)
  })
</script>

<style lang="scss" scoped>
  .branches{
    margin-top: 50px;
    h3{
      font-size: clamp(18px , 4vw , 28px);
      font-weight: 500;
      color: #333333;
      margin-bottom: 24px;
    }
    form{
      .input-wrap{
        @include displayFlex($justify : flex-start , $align : flex-start);
        input{
          width: 18px;
        }
        label{
          background: rgb($mainColor , 0.2);
          padding: 14px 20px;
          border-radius: 0 0 15px 15px;
          flex-grow: 1;
          cursor: pointer;
          h4{
            font-size: clamp(20px , 4vw , 28px);
            font-weight: 500;
            color: #333333;
          }
          p{
            font-size: clamp(14px , 4vw , 18px);
            font-weight: 400;
            max-width: 900px;
            width: 100%;
          }
        }
        &:not(:last-of-type){
          margin-bottom: 20px;
        }
      }
    }
  }
</style>