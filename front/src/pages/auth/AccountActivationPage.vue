<template>
  <q-inner-loading :showing="loading">
      <q-spinner-ios color="amber" size="10em" />
  </q-inner-loading>
</template>

<script lang="ts" setup>
  import {MutationUserVerifyEmailArgs, User} from 'src/graphql/types';
  import {gql} from '@apollo/client/core';
  import {useRoute, useRouter} from 'vue-router';
  import {useMutation} from '@vue/apollo-composable';
  import {useQuasar} from 'quasar';
  import {useI18n} from 'vue-i18n';
  import { onMounted } from 'vue';

  const { query } = useRoute();
  const { push } = useRouter();
  const { notify } = useQuasar();
  const { t } = useI18n();

  type Data = {
    userVerifyEmail: User;
  }

  const MUTATION = gql`
    mutation UserVerifyEmail($input:UserVerifyEmailInput!) {
      userVerifyEmail(input:$input) {
        id
      }
    }
  `;

  const { loading, mutate, onDone } = useMutation<
    Data,
    MutationUserVerifyEmailArgs>(MUTATION, { fetchPolicy: 'no-cache' });

  loading.value = true;

  onDone(({ data, errors }) => {
    const timeout = Number(process.env.TOAST_TIME_OUT);
    if(data) {
      notify({
        color: 'positive',
        position: 'center',
        message: t('user.emailVerified'),
        timeout,
      });
      sessionStorage.clear();
      setTimeout(() => void push('/auth/login'), timeout);
    }
    else {
      notify({
        color: 'negative',
        position: 'center',
        message: t(`user.${errors[0].message}`),
        timeout: timeout,
      });
      setTimeout(() => void push('/auth/register'), timeout);
    }
  });
  onMounted(() => {
    void mutate({
      input: {
        email: query['email'],
        activationCode: query['activation'],
      }
    });
  })
</script>

<style scoped>

</style>
