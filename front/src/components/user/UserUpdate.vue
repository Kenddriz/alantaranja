<template>
  <q-dialog ref="dialogRef">
    <UserForm
      style="min-width: 320px"
      @submit="submit"
      v-model:lastName="input.lastName"
      v-model:firstName="input.firstName"
      v-model:role="input.role"
      v-model:avatar="image"
      :src="src"
      v-model:phone="input.phone"
      :email="user.email"
    >
      <template v-slot:title>
        <q-card-section class="q-py-none flex items-center justify-between">
          {{ $t('user.update') }}
          <q-icon
            class="q-ml-md"
            size="sm"
            name="verified_user" />
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
          :label="$t('save')"
          type="submit"
          unelevated
          :loading="loading"
          color="primary"
          icon="save" />
      </q-card-section>
    </UserForm>
  </q-dialog>
</template>

<script lang="ts" setup>

  import {MutationUserUpdateArgs, User, UserUpdateInput} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {USER_FIELDS} from 'src/graphql/users/user';
  import {reactive, ref} from 'vue';
  import {useMutation} from '@vue/apollo-composable';
  import {useDialogPluginComponent, useQuasar} from 'quasar';
  import UserForm from './UserForm.vue';
  import {cloneDeep} from '@apollo/client/utilities';
  import {useI18n} from "vue-i18n";

  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  const props = defineProps<{ user: User }>();

  type Data = {
    userUpdate: User;
  }

  const MUTATION = gql`
    mutation UserUpdate($input: UserUpdateInput!, $avatar: Upload){
        userUpdate(input: $input, avatar: $avatar) {
            ${USER_FIELDS}
        }
    }
   `;
  const image = ref<File|null>(null);

  const { id, firstName, email, lastName, phone, role, avatar} = cloneDeep(props.user);
  const src = avatar && `${process.env.api}/avatars/${avatar}`;
  const input = reactive<UserUpdateInput>({
    id,
    firstName,
    lastName,
    phone,
    role
  });

  const { loading, mutate, onDone } = useMutation<
    Data,
    MutationUserUpdateArgs>(MUTATION, {  context: { hasUpload: true } });

  function submit() {
    void mutate({ input, avatar: image.value });
  }
  const { notify } = useQuasar();
  const { t } = useI18n();

  onDone(({ data }) => {
    if(data?.userUpdate) {
      onDialogHide();
      notify({
        color: 'positive',
        message: t('updateSuccess')
      });
    } else {
      notify({
        color: 'negative',
        message: t('updateFailed')
      });
    }
  });
</script>

<style scoped>

</style>
