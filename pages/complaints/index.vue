<template>
  <div class="page complaints_page">
    <div class="container">
      <div class="head">
        <h3 class="title">
          {{$t('complaint.title')}}
        </h3>
        <button class="main-btn complaint_btn" @click="handleShowAddComplaintPopup">
          {{$t('static_texts.add_new')}}
        </button>
      </div>
      <div class="content">
        <div class="complaint_tab" v-for="complaint in complaintsData?.data?.data" :key="complaint.id">
          <h4>{{complaint.subject}} </h4>
          <ul class="complaint_content">
            <li>
              <span>{{$t('complaint.complaintTitle')}} :</span>
              <span class="colored">{{$t('complaint.Number')}} {{complaint.phone}}</span>
            </li>
            <li>
              <span>{{$t('complaint.From')}}</span>
              <span>{{complaint.name}}</span>
            </li>
            <li>
              <span>
                {{$t('complaint.details')}} : 
              </span>
              <p>{{complaint.details}}</p>
            </li>
          </ul>
          <button class="main-btn reversed complaint_btn" v-if="complaint.reply" @click="handleComplaint(complaint.reply)">
            {{$t('complaint.replyBtn')}}
          </button>
        </div>
      </div>
      <!-- {{complaintsData?.data?.data}} -->
    </div>
    <!-- reply of complaint popup -->
    <ComplaintPopup 
      v-if="showComplaintPopup"
      @handleShowComplaintPopup="handleShowComplaintPopup"
      :complaintReply="complaintReply"
    />
    <!-- add comlplaint popup -->
    <AddComplaintPopup 
      v-if="showAddComplaintPopup"
      @handleShowAddComplaintPopup="handleShowAddComplaintPopup"
    />
  </div>
</template>

<script setup>
  

  // define complaint reply
  const complaintReply = ref('')

  // define control of reply of complaint popup
  const showComplaintPopup = ref(false)

  const handleShowComplaintPopup = () => {
    showComplaintPopup.value = !showComplaintPopup.value
  }

  const handleComplaint = (complaint) => {
    handleShowComplaintPopup();
    complaintReply.value = complaint
  }

  // define control of add complaint popup
  const showAddComplaintPopup = ref(false)

  const handleShowAddComplaintPopup = () => {
    showAddComplaintPopup.value = !showAddComplaintPopup.value
  }


  const { data: complaintsData } = useApiFetch('complaints' , true);

</script>

<style lang="scss" scoped>
  .complaints_page{
    padding-block: 50px;
    .head{
      @include displayFlex($justify:space-between);
      margin-bottom: 30px;
      h3.title{
        color: $mainColor;
        font-size: clamp(24px , 4vw , 32px);
        font-weight: 500;
        margin: 0;
      }
    }
    .content{
      .complaint_tab{
        &:not(
          :last-of-type
        ){
          margin-bottom: 20px;
        }
        h4{
          font-size: clmap(18px , 4vw , 24px);
          font-weight: 700;
          color: $mainColor;
          margin-bottom: 8px;
        }
        ul.complaint_content{
          background: rgb(#9E9E9E , 0.2);
          border-radius: 15px;
          padding: 14px clamp(8px , 4vw , 28px);
          margin-bottom: clamp(15px , 4vw , 20px);
          li{
            @include displayFlex($justify:flex-start , $gap : 8px);
            p{
              font-size: clmap(14px , 4vw , 18px);
              font-weight: 400;
            }
            span{
              &:first-of-type{
                color: #333333;
                font-weight: 700;
                font-size: clmap(16px , 4vw , 24px);
                @include displayFlex($justify:space-between);
              }

            }
            &:first-of-type{
              justify-content: space-between;
              span:nth-of-type(2){
                color: $mainColor;
                font-weight: 700;
              }
            }
            &:last-of-type{
              flex-direction: column;
              align-items: flex-start;
              gap: 0;
              span:nth-of-type(2){
                color: $mainColor;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
    .main-btn.complaint_btn{
      max-width: 180px;
      height: clamp(40px , 4vw , 60px);
      margin: unset;
    }
  }

</style>