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
          Update user
          <q-icon
            class="q-ml-md"
            size="sm"
            name="person_add" />
        </q-card-section>
      </template>
      <q-card-actions align="center" class="q-pb-md q-px-md">
        <q-btn
          rounded
          class="full-width"
          label="Save"
          type="submit"
          unelevated
          :loading="loading"
          color="primary"
          icon="save" />
      </q-card-actions>
    </UserForm>
  </q-dialog>
</template>

<script lang="ts" setup>

  import {MutationUserUpdateArgs, User, UserUpdateInput} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {USER_FIELDS} from 'src/graphql/users/user';
  import {reactive, ref} from 'vue';
  import {useMutation} from '@vue/apollo-composable';
  import {useDialogPluginComponent} from 'quasar';
  import UserForm from './UserForm.vue';
  import {cloneDeep} from '@apollo/client/utilities';

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

  onDone(({ data }) => {
    console.log(data);
    if(data?.userUpdate) {
      onDialogHide();
    }
  });
</script>

<style scoped>

</style>
