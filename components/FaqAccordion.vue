<template>
  <div class="accordion-container">
    <div 
      class="accordion" 
      v-for="(item, index) in getResult" 
      :key="index" 
      :class="{ active: activeIndex === index }"
      @click="toggle(index)"
    >
      <div class="title">
        <span>{{ item.question }}</span>
        <i class="pi pi-angle-down"></i>
      </div>
      <div class="content">
        <span>{{ item.answer }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  // define api methods
  const {
    getMethod,
    getResult
  } = useApiMethods()


  onMounted(()=>{
    getMethod('fqss' , '' , false , false)
  })

const activeIndex = ref(0);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  margin-bottom: 27px;

  .title {
    border: 0.5px solid #4c637f;
    padding: 15px 18px;
    border-radius: 15px;
    background: rgb($mainColor , 0.1);
    color: #333333;
    position: relative;
    cursor: pointer;

    i.pi-angle-down {
      position: absolute;
      inset-block-start: 50%;
      inset-inline-end: 17px;
      transform: translateY(-50%);
      transition: 0.6s;
      color: $mainColor;
    }
  }

  .content {
    max-height: 0;
    height: fit-content;
    overflow: hidden;
    // transition: 0.5s;
    padding-inline-start: 15px;
  }

  &.active {
    .title {
      margin-bottom: 20px;

      i.pi-angle-down {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    .content {
      max-height: 500px;
      overflow-y: scroll;
    }
  }
}
</style>
