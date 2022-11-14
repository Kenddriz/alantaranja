import {MutationUserCreateArgs, User, UserCreateInput} from 'src/graphql/types';
import {gql} from '@apollo/client';
import {USER_FIELDS} from 'src/graphql/users/user';
import {useMutation} from '@vue/apollo-composable';
import {addPaginationCache} from 'src/utils/pagination';
import {reactive, ref} from 'vue';
import {Dialog, Notify} from 'quasar';
import {useI18n} from 'vue-i18n';

type Data = {
  userCreate: User;
}

const MUTATION = gql`
  mutation UserCreate($input: UserCreateInput!, $avatar: Upload){
    userCreate(input: $input, avatar: $avatar){
      ${USER_FIELDS}
    }
  }
`;

const defaultInput = {
  firstName: '',
  role: 1,
  email: '',
  lastName: '',
  password: '',
  phone: '',
}

export const useUserCreate = (callback: any = null) => {

  const { t } = useI18n();

  const input = reactive<UserCreateInput>({
    ...defaultInput
  });

  const passwordConfirm = ref('');

  function equalPasswords() {
    return input.password === passwordConfirm.value;
  }

  const avatar = ref<File|null>(null);

  const { loading, onDone, mutate } = useMutation<Data, MutationUserCreateArgs>(MUTATION, {
    context: { hasUpload: true },
    update: (cache, { data }) => {
      if(data?.userCreate) {
        cache.modify({
          fields: {
            usersPaginate(existingRef: any, { toReference }) {
              return addPaginationCache(data.userCreate, existingRef, toReference);
            }
          }
        })
      }
    }
  });

  onDone(({ data }) => {
    const message = passwordConfirm.value ? 'register' : 'creation';
    if (data) {
      Dialog.create({
        message: t(`user.${message}Success`),
        ok: t('ok'),
      });
      passwordConfirm.value = '';
      Object.assign(input, defaultInput);
      avatar.value = null;

      if(callback) callback();
    }
    else {
      Dialog.create({
        message: t(`user.${message}Failed`),
        ok: t('ok'),
      })
    }

  });

  function submit() {
    if(!input.password)input.password = String(Math.floor(100000 + Math.random() * 900000));
    void mutate({ input, avatar: avatar.value });
  }

  return {
    input,
    submit,
    loading,
    avatar,
    passwordConfirm,
    equalPasswords
  }
}
