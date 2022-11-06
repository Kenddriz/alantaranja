<template>
  <q-btn
    color="primary"
    flat
    :to="user && cart ? '/my-space/payment/new' : undefined"
    @click="dialog = !user && !!cart"
    :icon="cart ? 'shopping_cart' : 'production_quantity_limits'"
    no-caps>
    <q-badge color="orange" floating>{{ cart }}</q-badge>
  </q-btn>
  <q-dialog v-model="dialog" ref="dialogRef">
    <q-card>
      <q-card-section>
        <q-btn
          class="full-width"
          rounded
          outline
          color="primary"
          icon="login"
          no-caps
          to="auth/login"
          padding="md"
          :label="$t('payment.login')" />

        <q-btn
          icon="person_add"
          class="q-my-md full-width"
          rounded
          outline
          color="green"
          no-caps
          to="/auth/register"
          padding="md"
          :label="$t('payment.register')" />

        <q-btn
          icon="close"
          class="full-width"
          rounded
          outline
          no-caps
          color="deep-orange"
          v-close-popup
          padding="md"
          :label="$t('close')" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';

  const props = defineProps<{
    user: number;
    cart: number;
  }>();

  const dialog = ref(false);

</script>

<style scoped>

</style>
