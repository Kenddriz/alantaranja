<template>
  <q-card flat>
    <q-form @submit.prevent="$emit('submit')">
      <q-card-section class="q-gutter-y-md">
        <slot name="title"></slot>

        <div class="flex justify-center">
          <q-avatar color="grey-3" size="8em">
            <ImageInput
              :src="src"
              @update:modelValue="$emit('update:avatar', $event)"
              :modelValue="avatar" />
          </q-avatar>
        </div>

        <q-input
          :rules="[v => v?.length > 0 || $t('requiredField')]"
          lazy-rules="ondemand"
          hide-bottom-space
          :model-value="lastName"
          @update:model-value="$emit('update:lastName', $event)"
          dense
          :label="$t('user.lastName')" />

        <q-input
          :model-value="firstName"
          @update:model-value="$emit('update:firstName', $event)"
          dense
          :label="$t('user.firstName')" />

        <q-input
          :model-value="email"
          :rules="[v => checkEmail(v) || '']"
          lazy-rules="ondemand"
          hide-bottom-space
          @update:model-value="$emit('update:email', $event)"
          dense
          :label="$t('user.email')" />

        <q-input
          :model-value="phone"
          :rules="[v => isValidPhone(v) || '']"
          lazy-rules="ondemand"
          hide-bottom-space
          @update:model-value="$emit('update:phone', $event)"
          dense
          :label="$t('user.phone')" />

        <q-card-actions align="between">
          <q-checkbox
            :model-value="role"
            @update:model-value="$emit('update:role', $event)"
            :false-value="2"
            :val="1"
            :true-value="1"
            :label="$tm('user.roles')[1]" />

          <q-checkbox
            :model-value="role"
            @update:model-value="$emit('update:role', $event)"
            :false-value="1"
            :val="2"
            :true-value="2"
            :label="$tm('user.roles')[2]" />
        </q-card-actions>
      </q-card-section>
      <slot></slot>
    </q-form>
  </q-card>
</template>

<script lang="ts" setup>
  import {REGEXP} from 'src/utils/utils';
  import {isValidNumber} from 'libphonenumber-js';
  import ImageInput from 'components/ImageInput.vue';

  defineProps<{
    firstName: string,
    lastName: string,
    email: string,
    avatar: any,
    phone: string,
    role: number,
    src?: string;
  }>();

  const emits = defineEmits([
    'update:phone',
    'update:lastName',
    'update:firstName',
    'update:email',
    'update:role',
    'update:avatar',
    'submit',
  ]);
  function checkEmail(val: string) {
    return REGEXP.email.test(val);
  }
  function isValidPhone(val: string) {
    if (val && val.charAt(0) !== '+') {
      val = '+' + val;
      emits('update:phone', val);
    }
    return !val || isValidNumber(val);
  }
</script>

<style scoped>

</style>
