<template>
  <div class="q-pa-md">
    <h2 class="q-mb-lg q-ml-md">Bonjour
      <span class="text-h5">
        {{ user.lastName + ' ' + user.lastName }},
      </span>
    </h2>

    <p>Nous avons le plaisir de vous confirmer que vous êtes bien inscrit sur ALANTARANJA.</p>
    <p>Vous y êtes presque !</p>
    <p>Consultez votre addresse email et cliquez sur le lien d'activation de votre comptre.</p>

    <div class="flex justify-between">
      <q-btn
        :loading="loading"
        @click="sendEmail()"
        icon="sentiment_dissatisfied"
        no-caps
        rounded
        color="warning"
        flat
        label="I didn't receive email" />
      <q-btn
        unelevated
        color="primary"
        to="/auth/login"
        icon-right="login"
        :label="$t('user.login')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {CONSTANTS} from 'src/utils/utils';
  import {useMutation} from '@vue/apollo-composable';
  import {gql} from '@apollo/client/core';
  import {MutationUserResendEmailCreatedArgs, User} from 'src/graphql/types';
  import {useI18n} from 'vue-i18n';
  import {useQuasar} from 'quasar';

  const user: User = JSON.parse(sessionStorage.getItem(CONSTANTS.pendingAccount));

  type Data = {
    userResendEmailCreated: boolean;
  }

  const MUTATION = gql`
    mutation UserResendEmailCreated($email: String!){
      userResendEmailCreated(email:$email)
    }
  `;
  const { t } = useI18n();
  const { notify } = useQuasar();
   const { loading, mutate, onDone } = useMutation<
     Data,
     MutationUserResendEmailCreatedArgs>(MUTATION);

   onDone(({ data }) => {
     if(data) {
       if(data.userResendEmailCreated) {
         notify({
           color: 'positive',
           message: t('user.needToVerify', { email: user.email })
         });
       } else {
         notify({
           color: 'negative',
           message: t('emailServiceError')
         });
       }
     } else {
       notify({
         color: 'negative',
         message: t('unknownError')
       });
     }
   })

  function sendEmail() {
     void mutate({ email: user.email });
  }
</script>

<style scoped>

</style>
