import { gql } from '@apollo/client/core';
import { useMutation } from '@vue/apollo-composable';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {Dialog, Notify, useQuasar} from 'quasar';
import {MutationSendCodeArgs} from 'src/graphql/types';
import {CONSTANTS, REGEXP} from 'src/utils/utils';

type Data = {
  sendCode: boolean;
};

const MUTATION = gql`
  mutation sendCode($input: SendCodeInput!) {
    sendCode(input: $input)
  }
`;

export const useSendCode = () => {
  const { notify } = useQuasar();
  const { t } = useI18n();
  const { push } = useRouter();

  function checkEmail(val: string) {
    return REGEXP.email.test(val);
  }

  const { loading, mutate, onDone } = useMutation<
    Data,
    MutationSendCodeArgs
  >(MUTATION);
  onDone(({ data, errors }) => {
    if(errors) {
      Notify.create({
        color: 'negative',
        message: t(`user.${errors[0].message}`),
      });
    }
    else if (data?.sendCode) {
      notify({
        color: 'positive',
        message: t('user.sendCodeSuccess')
      });
      setTimeout(() => {
        void push('/auth/reset-password');
      }, 2000);
    } else {
      notify({
        color: 'negative',
        message: t('user.sendCodeFailed'),
      });
    }
  });

  function sendEmail(email: string) {
    void mutate({ input: { email }});
  }

  function openForgotPasswordDialog () {
    Dialog.create({
      title: t('user.forgotPassword'),
      prompt: {
        model: '',
        isValid: val => checkEmail(val),
        type: 'text',
        label: t('user.emailPlaceholder'),
      },
      cancel: t('cancel'),
    }).onOk(email => {
      sendEmail(email);
      localStorage.setItem(CONSTANTS.forgotPassword, email);
    });
  }

  return {
    loading,
    openForgotPasswordDialog,
    checkEmail,
    sendEmail,
  };
};
