<template>
  <q-form
    @submit.prevent="submit"
    style="min-width: 70%"
    class="q-gutter-y-md">

    <div class="flex justify-center" align="center">
      <q-avatar color="grey-3" size="12em">
        <ImageInput v-model="avatar" />
      </q-avatar>
    </div>

    <q-input
      hide-bottom-space
      :rules="[v => v?.length > 0 || $t('requiredField')]"
      lazy-rules="ondemand"
      :model-value="input.lastName"
      v-model="input.lastName"
      dense
      :label="$t('user.lastName')" />

    <q-input
      hide-bottom-space
      :model-value="input.firstName"
      v-model="input.firstName"
      dense
      :label="$t('user.firstName')" />

    <q-input
      hide-bottom-space
      :model-value="input.email"
      :rules="[v => checkEmail(v) || '']"
      lazy-rules="ondemand"
      v-model="input.email"
      dense
      :label="$t('user.email')" />

    <q-input
      hide-bottom-space
      :model-value="input.phone"
      :rules="[v => isValidPhone(v) || '']"
      lazy-rules="ondemand"
      v-model="input.phone"
      dense
      :label="$t('user.phone')" />

    <PasswordInput
      :outlined="false"
      hide-bottom-space
      :noIcon="true"
      :model-value="input.password"
      v-model="input.password"
      :label="$t('user.password')"
      dense />

    <q-input
      v-model="passwordConfirm"
      :model-value="passwordConfirm"
      hide-bottom-space
      type="password"
      :lazy-rules="true"
      :rules="[() => equalPasswords() || $t('user.passwordNotMatch')]"
      :label="$t('user.confirmPassword')"
      dense />

    <q-btn
      :loading="loading"
      class="full-width"
      type="submit"
      unelevated
      color="primary"
      icon="login"
      :label="$t('paths.register')" />

    <div class="text-right full-width">
      <router-link
        style="text-decoration: none"
        class="q-mt-lg text-deep-orange"
        to="/auth/login">
        {{ $t('user.haveAccount') }}
      </router-link>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
  import {useUserCreate} from 'src/graphql/users/user-create';
  import ImageInput from 'components/ImageInput.vue';
  import {REGEXP} from 'src/utils/utils';
  import {isValidNumber} from 'libphonenumber-js';
  import PasswordInput from 'components/user/PasswordInput.vue';

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

  const {
    input,
    submit,
    loading,
    avatar,
    passwordConfirm,
    equalPasswords,
  } = useUserCreate();


</script>

<style scoped>

</style>
