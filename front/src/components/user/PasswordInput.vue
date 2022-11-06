<template>
  <q-input
    dense
    outlined
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :type="type ? 'password' : 'text'"
    lazy-rules="ondemand"
    :rules="[ (val) => checkPassword(val) || '']"
    hide-bottom-space
    no-error-icon
    hide-hint
  >
    <template v-slot:append>
      <q-icon
        color="dark"
        v-if="modelValue"
        class="cursor-pointer"
        :name="type ? 'visibility' : 'visibility_off'"
        @click="type = !type"
      />
    </template>
    <template v-if="!noIcon" v-slot:prepend>
      <q-icon color="primary" name="lock" />
    </template>
  </q-input>
</template>

<script lang="ts">
import {REGEXP} from 'src/utils/utils';

export default {
  name: 'PasswordInput',
  props: ['modelValue', 'noIcon'],
  emits: ['update:modelValue'],
  data() {
    return {
      type: true,
      checkPassword: (val: string) =>  REGEXP.mediumPassword.test(val)
    };
  },
};
</script>

<style scoped></style>
