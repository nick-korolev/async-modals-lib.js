<script async setup>

import confirm from '../../../packages/confirm'
import { ref } from "vue";

const isConfirmed = ref(false)

const onClick = async () => {
  isConfirmed.value = await confirm({
    message: 'Are you sure?',
  });
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <button @click="onClick">Confirm</button>
      <p v-if="isConfirmed">Confirmed</p>
    </div>
  </header>
</template>
