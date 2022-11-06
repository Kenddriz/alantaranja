<template>
  <div class="col-12 col-md-5 text-h4 text-center text-weight-medium column justify-center">
    {{ $t('user.passwordUpdate') }}
  </div>
  <q-form
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit.prevent="updatePassword"
    class="col-12 col-md-7"
  >
    <q-card flat class="rounded-borders q-pa-md">
      <PasswordInput
        :label="$t('user.currentPassword')"
        hide-bottom-space
        v-model="input.currentPassword"
        dense
        lazy-rules="ondemand"
        :rules="[val => checkPassword(val) || $t('user.passwordInvalid')]"
        :outlined="false" />

      <PasswordInput
        :label="$t('user.newPassword')"
        hide-bottom-space
        v-model="input.newPassword"
        lazy-rules="ondemand"
        class="q-my-md"
        :rules="[
            val => checkPassword(val) || $t('user.passwordInvalid'),
            () => equalPasswords() || $t('user.passwordNotMatch')
        ]"
        dense
        :outlined="false" />

      <PasswordInput
        :label="$t('user.confirmPassword')"
        v-model="confirmPassword"
        hide-bottom-space
        lazy-rules="ondemand"
        :rules="[ () => equalPasswords() || $t('user.passwordNotMatch')]"
        dense
        :outlined="false" />

      <q-btn
        color="primary"
        no-caps
        unelevated
        icon="save"
        :label="$t('update')"
        type="submit"
        :loading="loading"
        class="q-mt-md"/>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
  import {REGEXP} from 'src/utils/utils';
  import {MutationUpdatePasswordArgs, User} from "src/graphql/types";
  import {useMutation} from "@vue/apollo-composable";
  import {reactive, ref} from "vue";
  import {useQuasar} from "quasar";
  import {useI18n} from "vue-i18n";
  import {gql} from "@apollo/client/core";
  import PasswordInput from "components/user/PasswordInput.vue";

  type UpdatePasswordData = {
    updatePassword: User;
  };
  const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      id
    }
  }
`;

    const { t } = useI18n();
    const { notify } = useQuasar();
    const input = reactive({
      currentPassword: '',
      newPassword: '',
    });
    const confirmPassword = ref('');
    const { loading, mutate, onDone } = useMutation<
      UpdatePasswordData,
      MutationUpdatePasswordArgs
      >(UPDATE_PASSWORD);
    onDone(({ data , errors}) => {
      if(errors) {
        notify({
          color: 'negative',
          message: t('update'),
          caption: t('user.currentPasswordIncorrect'),
        });
        input.newPassword = '';
        input.currentPassword = '';
        confirmPassword.value = '';
      }
      else if (data?.updatePassword) {
        notify({
          color: 'success',
          message: t('update'),
          caption: t('updateSuccess'),
        });
      } else {
        notify({
          color: 'negative',
          message: t('update'),
          caption: t('updateFailed'),
        });
      }
    });
    function updatePassword() {
      void mutate({ input });
    }

  function checkPassword(val: string) {
    return REGEXP.mediumPassword.test(val);
  }
  function equalPasswords() {
    return input.newPassword === confirmPassword.value;
  }

</script>

<style lang="sass" scoped>
.card
  max-width: 750px
</style>
