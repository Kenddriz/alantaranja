<template>
  <q-dialog ref="dialogRef">
    <UserForm
      @submit="submit"
      v-model:lastName="input.lastName"
      v-model:firstName="input.firstName"
      v-model:role="input.role"
      v-model:avatar="avatar"
      v-model:phone="input.phone"
      v-model:email="input.email"
    >
      <template v-slot:title>
        <q-card-section class="q-py-none flex items-center justify-between">
          {{ $t('user.new') }}
          <q-icon class="q-ml-md" size="sm" name="person_add" />
        </q-card-section>
      </template>
      <q-card-section class="flex justify-end q-gutter-x-md q-pt-none">
        <q-btn
          v-close-popup
          color="deep-orange"
          icon="close"
          :label="$t('close')"
          unelevated />
        <q-btn
          :label="$t('create')"
          type="submit"
          unelevated
          icon-right="send"
          :loading="loading"
          color="primary"/>
      </q-card-section>
    </UserForm>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {useUserCreate} from 'src/graphql/users/user-create';
import UserForm from './UserForm.vue';
import {useDialogPluginComponent} from "quasar";

  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  const {
      input,
      submit,
      loading,
      avatar
    } = useUserCreate(onDialogHide);
</script>

<style scoped>

</style>
