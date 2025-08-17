<template>
  <div class="page">
    <div class="container">
      <div class="chats_content">
        <div ref="contentEl" class="content">
          <div 
            v-for="message in messages?.data?.slice()?.reverse()"
            :key="message.id"
            v-if="messages?.data?.length > 0"
            :class="['message', message.is_sender == 1 ? 'sender' : 'reciever']">
              <div class="image" v-if="message.is_sender == 0">
                <img :src="getResult?.members[0]?.image" alt="image" loading="lazy">
              </div>
              <div class="message">
                {{ message.body }}
                <p class="time">{{ message.created_at }}</p>
              </div>
          </div>
          <div class="image empty_image" v-else>
            <img src="/assets/images/empty_box.png" alt="image" loading="lazy">
          </div>
        </div>
        <form 
        v-if="getResult?.room?.is_available"
          action="" 
          class="chat_control input" 
          @submit.prevent="sendMessage"
        >
          <button 
            class="main-btn"
            :style="buttonStyle">
            <i class="pi pi-send"></i>
          </button>
          <input 
            type="text" 
            name="chat_message" 
            v-model="inputMessage" 
            :placeholder="$t('chat.placeholder')"
            @keydown.enter="sendMessage"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { io } from 'socket.io-client';

// define api methods
const { getMethod, getResult } = useApiMethods()

// intial states
const messages = ref({ data: [] });
const inputMessage = ref('');
const socket = ref(null);
const contentEl = ref(null); // Template ref for content div

// define route to get params of room
const route = useRoute()

// define global store 
const globalStore = useGlobalStore()

// define auth store
const authStore = useAuthStore()

// Computed for button style
const buttonStyle = computed(() => ({
  transform: globalStore?.lang === 'en' ? 'rotate(40deg)' : 'rotate(225deg)'
}));

//######################################################################################
//##################################### Handle Send Message ############################
//###################################################################################### 
const sendMessage = () => {
  if (inputMessage.value.trim().length > 0) {
    sendMessageTosocket('text', inputMessage?.value)
  }
};

//######################################################################################
// ############################## SOCKET SEND FUNCTION #################################
//###################################################################################### 
function sendMessageTosocket(newType, newResponse) {
  if (socket.value) {
    socket.value.emit("sendMessage", {
      receiver_id: getResult?.value?.members[0]?.id,
      receiver_type: 'Admin',
      room_id: globalStore.room_id,
      type: newType,
      body: newResponse,
    });
    inputMessage.value = ''
  }
}

// handle scroll to bottom 
const handleScrollToBottom = () => {
  if (contentEl.value) {
    setTimeout(() => {
      contentEl.value.scrollTo({
        top: contentEl.value.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }
}

//######################################################################################
//###################### Watch Result Of Fetching Messages #############################
//###################################################################################### 
watch(() => getResult?.value, (newValue) => {
  if (newValue) {
    messages.value = newValue?.messages || { data: [] }
    handleScrollToBottom()
  }
})

//###################################################################################### 
//############################## Socket Connection ##################################### 
//###################################################################################### 
if (import.meta.prerender) {
  // Mock data for prerendering
  messages.value = { data: [
    { id: 1, body: "Sample message 1", created_at: "2023-01-01" },
    { id: 2, body: "Sample message 2", created_at: "2023-01-02" }
  ] };
} else {
  // Client-side only code
  onMounted(() => {
    // Initialize socket
    socket.value = io("https://opc.aait-sa.com:4828", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket"],
      query: {
        sender_id: authStore?.userData?.id,
        sender_type: 'User',
        sender_name: authStore?.userData?.name,
        avatar: authStore?.userData?.image,
        lang: globalStore?.lang || 'ar',
      },
    });

    // Socket listeners
    socket.value.on('sendMessageRes', function (data) {
      if (messages.value?.data) {
        messages.value.data.unshift(data);
        handleScrollToBottom();
      }
    });

    // Fetch messages and enter chat
    getMethod(`get-room-messages/${globalStore.room_id}`, 1, true, false);
    socket.value.emit("enterChat", {
      room_id: globalStore.room_id,
    });

    handleScrollToBottom();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
    }
  });
}
</script>

<style lang="scss" scoped>
  .page {
    padding-block: 0;
  }

  .chats_content {
    height: 78vh;
    position: relative;
    background: rgba(#C9C9C9, 0.1);
    border-radius: 20px;
    border: 1px solid rgba(#C9C9C9, 0.1);
    padding: clamp(15px, 4vw, 40px) 20px 10px;

    .content {
      height: 65vh;
      overflow-y: scroll;
      direction: rtl;
      @include displayFlex($direction: column, $justify: flex-start, $gap: 8px);
      padding-inline-end: 8px;

      &::-webkit-scrollbar-thumb {
        background: $mainColor;
      }

      .message {
        width: 100%;
        border-radius: 10px;
        padding-inline-start: 12px;
        width: fit-content;
        min-width: 150px;
        margin-inline-end: auto;
        position: relative;
        

        &.sender {
          direction: ltr;
          border-bottom-right-radius: 0;
          background: #F1A23C33;
          padding: 14px 14px 30px;
          .message{
            padding-inline-start: 0;
          }
        }
        
        &.reciever {
          direction: rtl;
          background: rgb($mainColor, 0.1);
          padding: 14px 14px 30px;
          border-bottom-left-radius: 0;
          margin-inline-start: 70px;
          @include displayFlex();
          .message{
            padding-inline-start: 0;
          }
          .image{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            inset-inline-start: -70px;
            bottom: 0;
          }
        }

        .time {
          position: absolute;
          bottom: -25px;
          right: 10px;
          color: $mainColor;
        }
      }
      .empty_image{
        max-width: 300px;
        margin: auto;
      }
    }

    form.chat_control {
      position: absolute;
      bottom: 0;
      width: 95%;
      @include displayFlex($justify: space-between, $direction: row-reverse);
      border-bottom: unset;
      flex-grow: 1;
      background: #fff;
      padding: 5px 15px 5px 5px;
      margin-bottom: 10px;
      border-radius: 30px;

      input {
        text-align: start;
        flex-grow: 1;
        width: unset;
      }

      .main-btn {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        transform: rotate(225deg);
        margin: 0;
      }
    }
  }
</style>