<script async setup>

import confirm from '../../../packages/confirm'
import alert from '../../../packages/alert'
import prompt from '../../../packages/prompt'
import { ref } from "vue";

const isConfirmed = ref(false)
const promptValue = ref('')

const onConfirmClick = async () => {
  isConfirmed.value = await confirm({
    message: 'Are you sure?',
    okText: 'Okay',
    cancelText: 'Nope',
  });
}

const onAlertClick = async () => {
  await alert({
    message: 'Internal error',
    type: 'error'
    // timeout: 3000,
  });
}

const onPromptClick = async () => {
  promptValue.value = await prompt({
    message: 'Type something',
    defaultValue: promptValue.value,
  });
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div>
        <button @click="onConfirmClick">Confirm</button>
        <p v-if="isConfirmed">Confirmed</p>
      </div>
      <div>
        <button @click="onAlertClick">Alert</button>
      </div>
      <div>
        <button @click="onPromptClick">Prompt</button>
        <p v-if="promptValue">{{ promptValue }}</p>
      </div>
    </div>
  </header>
</template>
