<template>
  <q-page :padding="$route.path.includes('admin')">
    <q-linear-progress
      v-if="meLoading"
      color="warning"
      indeterminate />

    <div class="row q-col-gutter-lg">

      <div class="col-12 col-md-5 text-h4 text-center text-weight-medium column justify-center">
        {{ $t('user.updateInfos') }}
      </div>
      <div class="col-12 col-md-7">
        <UserForm
          :src="src"
          @submit="updateUser()"
          v-model:lastName="input.lastName"
          v-model:firstName="input.firstName"
          v-model:avatar="avatar"
          v-model:phone="input.phone">
          <template v-slot:email>
            <div class="full-width q-pt-md text-center">
              {{ currentUser.email }}
            </div>
          </template>
          <q-btn
            type="submit"
            no-caps
            class="q-mx-md q-mb-md"
            unelevated
            color="primary"
            icon="save"
            :label="$t('update')" />
        </UserForm>
      </div>

      <UpdatePassword />

    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import ImageInput from 'components/ImageInput.vue';
  import UpdatePassword from "components/user/UpdatePassword.vue";
  import {MutationUserUpdateArgs, User, UserUpdateInput} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {USER_FIELDS} from "src/graphql/users/user";
  import {useWHoAmI} from "src/graphql/users/whoAmi";
  import {reactive, ref, watch} from "vue";
  import {useQuasar} from "quasar";
  import {useI18n} from "vue-i18n";
  import {cloneDeep} from "@apollo/client/utilities";
  import {getImage} from "src/utils/utils";
  import {useMutation} from "@vue/apollo-composable";
  import UserForm from "components/user/UserForm.vue";

  type UpdateUserData = {
    updateUser: User;
  };
  const UPDATE_USER = gql`
      mutation UpdateUser($input: UserUpdateInput!, $avatar: Upload) {
          userUpdate(input: $input, avatar: $avatar) {
              ${USER_FIELDS}
          }
      }
  `;

  const { notify } = useQuasar();
  const { t } = useI18n();
  const avatar = ref<File|null>(null);
  const input = reactive<UserUpdateInput>({
    lastName: '',
    firstName: '',
    phone: '',
  });

  const { currentUser, meLoading } = useWHoAmI();
  const src = ref('');

  watch(() => currentUser.value, user => {
    Object.keys(input).forEach(key => {
      input[key as keyof UserUpdateInput] = cloneDeep(user[key as keyof User]);
    });
    src.value = getImage(user.avatar);
  }, { immediate: true });

  const { loading, mutate, onDone } = useMutation<
    UpdateUserData,
    MutationUserUpdateArgs
    >(UPDATE_USER, { context: { hasUpload: true } });
  onDone(({ data }) => {
    if(data) {
      notify({
        color: 'positive',
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

  function updateUser() {
    void mutate({
      input,
      avatar: avatar.value,
    });
  }

</script>

<style lang="sass" scoped>
.card
  max-width: 750px
</style>
