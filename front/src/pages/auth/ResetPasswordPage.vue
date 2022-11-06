<template>
  <q-form
    @submit.prevent="submit"
    style="min-width: 70%"
    class="q-gutter-y-md q-pa-md">

    <q-card-actions align="center">
      <q-avatar
        size="150px"
        font-size="52px"
        color="primary"
        text-color="white"
        icon="person"/>
    </q-card-actions>

    <q-input
      :label="$t('user.verificationCode')"
      dense
      mask="## ####"
      lazy-rules="ondemand"
      :rules="[v => !!v || '']"
      v-model="input.code"
      unmasked-value
      hide-bottom-space />

    <q-input
      :label="$t('user.newPassword')"
      :model-value="input.password"
      v-model="input.password"
      hide-bottom-space
      lazy-rules="ondemand"
      :rules="[
          val => checkPassword(val) || $t('user.passwordInvalid'),
          () => equalPasswords() || $t('user.passwordNotMatch')
      ]"
      type="password"
      dense />

    <q-input
      hide-bottom-space
      lazy-rules="ondemand"
      :label="$t('user.confirmPassword')"
      :model-value="input.confirmPassword"
      v-model="input.confirmPassword"
      :rules="[ () => equalPasswords() || $t('user.passwordNotMatch')]"
      type="password"
      dense />

    <q-btn
      class="full-width"
      rounded
      type="submit"
      unelevated
      color="primary"
      icon="login"
      :label="$t('user.resetPassword')" />

  </q-form>
</template>

<script lang="ts" setup>
  import {CONSTANTS, REGEXP} from 'src/utils/utils';
  import {MutationResetPasswordArgs, User} from 'src/graphql/types';
  import {useMutation} from '@vue/apollo-composable';
  import {useSendCode} from 'src/graphql/users/send-code';
  import {reactive} from 'vue';
  import {gql} from '@apollo/client/core';
  import {useRouter} from 'vue-router';
  import {useI18n} from 'vue-i18n';
  import {useQuasar} from 'quasar';
    type Data = {
    resetPassword: User;
  };
  const UPDATE_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      id
    }
  }
`;

  const { push } = useRouter();
  const { t } = useI18n();
  const { dialog } = useQuasar();

  const input = reactive({
    code: '',
    password: '',
    confirmPassword: '',
  });

  function checkPassword(val: string) {
    return REGEXP.mediumPassword.test(val);
  }
  function equalPasswords() {
    return input.password === input.confirmPassword;
  }
  const { loading, sendEmail } = useSendCode();

  const { loading: resetLoading, mutate, onDone, onError } = useMutation<
    Data,
    MutationResetPasswordArgs
    >(UPDATE_PASSWORD);
  onDone(({ data }) => {
    if (data) {
      dialog({
        color: 'positive',
        message: t('user.resetPasswordSuccess'),
      }).onOk(() => {
        localStorage.removeItem(CONSTANTS.forgotPassword);
        void push({ name: 'login' });
      });
    } else {
      dialog({
        color: 'negative',
        message: t('user.codeWrong'),
      });
    }
  });

  function submit() {
    void mutate({
      input: {
        code: input.code,
        password: input.password,
        email: localStorage.getItem(CONSTANTS.forgotPassword)
      }
    })
  }

  function resendCode() {
    sendEmail(localStorage.getItem(CONSTANTS.forgotPassword));
  }
</script>

<style scoped>

</style>
