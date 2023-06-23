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
    <div class="wrapper">
      <div class="block">
        <h1>Confirm example</h1>
        <div class="confirm">
          <button class="button" @click="onConfirmClick">{{ isConfirmed ? 'Confirmed' : 'Confirm' }}</button>
        </div>
      </div>
      <div class="block">
        <h1>Alert example</h1>
        <div class="alert">
          <button class="button" @click="onAlertClick">Alert</button>
          <div ref="rootContainer" style="margin-left: 12px">
            <button class="button" @click="onRootAlertClick">Close on timeout</button>
          </div>
        </div>
      </div>
      <div class="block">
        <h1>Prompt example</h1>
        <div class="prompt">
          <button class="button" @click="onPromptClick">Prompt</button>
        </div>
        <div v-if="promptValue">{{ promptValue }}</div>
      </div>
    </div>
  </header>
</template>

<style>
h1 {
  margin: 0;
}

body {
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  margin: 0;
}

.block {
  padding: 16px 0;
}

.button {
  background-color: transparent;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;
  color: rgba(27,31,35);
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
  transition: all .2s ease-in-out;
}
.button:hover {
  text-decoration: none;
  opacity: 0.8;
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
.wrapper {
  background: url("https://github-production-user-asset-6210df.s3.amazonaws.com/94742553/248329393-d83d1b4c-be68-494f-80da-db63b62735ff.png");
  height: calc(100vh - 24px);
  padding: 12px;
}
</style>
