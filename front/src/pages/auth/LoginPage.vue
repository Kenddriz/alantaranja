<template>
  <q-form
    @submit.prevent="submitLogin"
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
      lazy-rules="ondemand"
      hide-bottom-space
      :rules="[val => checkEmail(val)  || '']"
      :model-value="input.email"
      v-model="input.email"
      :label="$t('user.email')"
      outlined
      dense>
      <template v-slot:prepend>
        <q-icon color="primary" name="email" />
      </template>
    </q-input>

    <PasswordInput
      :model-value="input.password"
      v-model="input.password"
      :label="$t('user.password')"
      outlined
      dense />

    <q-btn
      class="full-width"
      rounded
      type="submit"
      unelevated
      color="primary"
      icon="login"
      :label="$t('user.login')" />

    <div class="text-right full-width">
      <q-btn
        no-caps
        @click="openForgotPasswordDialog"
        :label=" $t('user.forgotPassword')"
        color="deep-orange"
        flat
        dense />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
  import {useI18n} from 'vue-i18n';
  import {reactive} from 'vue';
  import {AuthInput, LoginDto, MutationLoginArgs} from 'src/graphql/types';
  import {useMutation} from '@vue/apollo-composable';
  import {gql} from '@apollo/client';
  import {USER_FIELDS} from 'src/graphql/users/user';
  import {useQuasar} from 'quasar';
  import {useSendCode} from 'src/graphql/users/send-code';
  import {CONSTANTS} from 'src/utils/utils';
  import PasswordInput from 'components/user/PasswordInput.vue';
  import {useSession} from 'src/graphql/users/session';
  import {WHOAMI, WhoAmIData} from 'src/graphql/users/whoAmi';

  type LoginData = {
    login: LoginDto;
  };

  const LOGIN = gql`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
      token
      user {
        ${USER_FIELDS}
      }
    }
  }
`;

  const { dialog, notify } = useQuasar();
  const { login, navigateTo } = useSession();
  const { t } = useI18n();
  const input = reactive<AuthInput>({ email: '', password: '' });

  const { loading, mutate, onDone } = useMutation<LoginData, MutationLoginArgs>(
    LOGIN,
    {
      update: (cache, { data }) => {
        if(data && data.login.user.status !== -1) {
          cache.writeQuery<WhoAmIData>({
            query: WHOAMI,
            data: { whoAmI: data.login.user },
          });
        }
      }
    }
  );
  onDone(({ data, errors }) => {
    if (data) {
      if(!data.login.user.status) {
        dialog({
          title: t('user.connexion'),
          message: t('user.needToVerify', {email: data.login.user.email}),
          ok: t('ok'),
        }).onOk(() => {
          sessionStorage.setItem(CONSTANTS.pendingAccount, JSON.stringify(data.login.user));
          navigateTo('/auth/fill-registration');
        });
      } else {
        notify(t('user.connected'));
        sessionStorage.clear();
        login(data.login.token, data.login.user);

      }
    }else if(errors){
      notify({
        color: 'negative',
        message: t('user.connexion'),
        caption: t(`user.${errors[0].message}`),
      });
    }
  });

  function submitLogin() {
    void mutate({ input });
  }
  const { checkEmail, openForgotPasswordDialog } = useSendCode();
</script>

<style scoped>

</style>
