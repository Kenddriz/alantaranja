<template>
  <q-card :style="`${ withStyle ? 'width: 500px; max-width: 90vw' : ''}`" flat>
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
          <slot name="email"></slot>
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
          v-if="email !== undefined"
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

        <q-card-actions v-if="role !== undefined" class="q-gutter-x-md">
          <q-radio
            v-for="(rol, index) in roles"
            :key="index"
            :model-value="role"
            name="role"
            @update:model-value="$emit('update:role', $event)"
            :val="rol.role"
            :label="rol.label" />
        </q-card-actions>
      </q-card-section>
      <slot></slot>
    </q-form>
  </q-card>
</template>

<script lang="ts" setup>
import {CONSTANTS, getUserRole, REGEXP} from 'src/utils/utils';
  import {isValidNumber} from 'libphonenumber-js';
  import ImageInput from 'components/ImageInput.vue';
  import {useI18n} from "vue-i18n";

  withDefaults(defineProps<{
    firstName: string,
    lastName: string,
    email?: string,
    avatar: any,
    phone: string,
    role?: number,
    src?: string;
    withStyle?: boolean
  }>(), { email: undefined, role: undefined, withStyle: true });

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

  const { tm } = useI18n();

  const uRole = getUserRole();
  const roles = (tm('user.roles') as string[])
    .reduce((cum, label, role) => {
        if(!role) return cum;
        if(!uRole) return [...cum, { label, role}];
        else if(role > uRole) return [...cum, { label, role}];
        return cum;
  }, []);
</script>

<style scoped>

</style>
