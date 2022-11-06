<template>
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
        New user
        <q-icon class="q-ml-md" size="sm" name="person_add" />
      </q-card-section>
    </template>
    <q-card-actions align="center" class="q-pb-md q-px-md">
      <q-btn
        rounded
        class="full-width"
        label="Add"
        type="submit"
        unelevated
        :loading="loading"
        color="primary"
        icon="person_add" />
    </q-card-actions>
  </UserForm>
</template>

<script lang="ts" setup>
import {useUserCreate} from 'src/graphql/users/user-create';
import UserForm from './UserForm.vue';

const {
    input,
    submit,
    loading,
    avatar
  } = useUserCreate();
</script>

<style scoped>

</style>
