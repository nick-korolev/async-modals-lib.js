<script async setup>

import confirm from '../../../packages/confirm'
import alert from '../../../packages/alert'
import prompt from '../../../packages/prompt'
import { ref } from "vue";

const isConfirmed = ref(false)
const promptValue = ref('')
const rootContainer = ref(null);
const onConfirmClick = async () => {
  isConfirmed.value = await confirm({
    title: 'Confirm',
    message: 'Are you sure?',
    okText: 'Okay',
    cancelText: 'Nope',
    closable: true,
  });
  setTimeout(() => {
    isConfirmed.value = false;
  }, 3000);
}

const onAlertClick = async () => {
  await alert({
    title: 'Internal error',
    message: 'Something went wrong',
    type: 'error',
  });
}

const onPromptClick = async () => {
  promptValue.value = await prompt({
    message: 'Type something',
    defaultValue: promptValue.value,
    placeholder: 'Type here',
    closable: true,
    animation: 'verticalSlide',
  });
}

const onRootAlertClick = async () => {
  await alert({
    title: 'Internal error',
    message: 'Something went wrong',
    type: 'error',
    timeout: 3000,
    root: rootContainer.value
  });
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="confirm">
        <button class="button" @click="onConfirmClick">{{ isConfirmed ? 'Confirmed' : 'Confirm' }}</button>
      </div>
      <div class="alert">
        <button class="button" @click="onAlertClick">Alert</button>
        <div ref="rootContainer" style="margin-left: 12px">
          <button class="button" @click="onRootAlertClick">Root Alert</button>
        </div>
      </div>
      <div class="prompt">
        <button class="button" @click="onPromptClick">Prompt</button>
        <div style="margin-left: 12px" v-if="promptValue">{{ promptValue }}</div>
      </div>
    </div>
  </header>
</template>

<style>
.button {
  background-color: #24292e;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 12px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
button:hover {
  background-color: #2f363d;
  border-color: rgba(27,31,35,.5);
  color: #fff;
  text-decoration: none;
}
.confirm {
  margin-top: 12px;
  display: flex;
  align-items: center;
}
.alert {
  margin-top: 12px;
  display: flex;
  align-items: center;
}
.prompt {
  margin-top: 12px;
  display: flex;
  align-items: center;
}
</style>
