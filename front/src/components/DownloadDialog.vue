<template>
  <q-dialog seamless persistent ref="dialogRef">
    <q-card :style="`width: 700px; max-width: 80vw; ${currentPos}`">
      <q-bar v-touch-pan.prevent.mouse="move" class="bg-positive text-white">
        <div>{{ $t('document.downloads') }}</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>{{ $t('close') }}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-markup-table
          flat
          bordered
          separator="cell">
          <thead>
          <tr>
            <th class="text-left">{{ $t('document.filename') }}</th>
            <th class="text-center">{{ $t('document.size') }}</th>
            <th class="text-center">{{ $t('payment.status') }}</th>
            <th class="text-center">{{ $t('document.remainingTime') }}</th>
            <th class="text-right">{{ $t('document.downloadRate') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td>{{ row.filename }}</td>
            <td>{{ row.size }}</td>
            <td v-bind:class="{'text-positive' : row.status === 100 }">
              {{ row.status }} %
            </td>
            <td>{{ row.remainTime }}</td>
            <td>{{ row.rate }}</td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {useDialogPluginComponent} from "quasar";
  import {reactive, ref} from "vue";
  import {movable} from "src/utils/utils";
  import {gql} from "@apollo/client/core";
  import {useMutation} from "@vue/apollo-composable";
  import {MutationSetupDocumentArgs} from "src/graphql/types";
  import {usePaymentDownloaded} from "src/graphql/payment/payment-downloaded";

  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  const { currentPos, move } = movable();

  type Row = {
    filename: string;
    size: number;
    status: any;
    remainTime: string;
    rate: string;
  }
  const props = defineProps<{
    files: string[],
    paymentId: string;
  }>();

  const { onDone, submitDownloaded } = usePaymentDownloaded();

  onDone(() => onDialogHide());

  const rows = reactive<Row[]>([]);

  const downloadStatus = ref<boolean[]>(Array(props.files.length).fill(false));

//document.body.appendChild(link);
  function download(file: string, index: number) {
    const link = document.createElement('a');
    const image = process.env.api + file;
    const request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', image, true);
    request.send();

    request.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        const obj = window.URL.createObjectURL(this.response);
        link.href = obj;
        const name = file.split('/');
        link.setAttribute('download', name[name.length - 1]);
        link.click();
        setTimeout(function() {
          window.URL.revokeObjectURL(obj);
        }, 60 * 1000);
      }
    };
    const startTime = new Date().getTime();
    request.onprogress = function(e) {
      const duration = ( new Date().getTime() - startTime ) / 1000;
      const bps = e.loaded / duration;

      const time = (e.total - e.loaded) / bps;

      rows[index].size = e.total;
      rows[index].remainTime = Math.floor(time / 60) + ' min ' +  Math.floor(time % 60) + ' s ';
      rows[index].rate = Math.floor(bps / 1024) + 'KB / s';
      const status = (e.loaded / e.total) * 100;
      rows[index].status = status < 100 ? status.toFixed(2) : status;

      if(status >= 100) {
        downloadStatus.value[index] = true;
        //when all finished
        if(!downloadStatus.value.find(status => !status)) {
          submitDownloaded(props.paymentId);
        }
      }
    };
  }

  type Data = {
    setupDocument: string;
  }

  const MUTATION = gql`
    mutation SetupDocument($input: DocumentDownloadInput!) {
        setupDocument(input: $input)
    }
   `;

  const { loading, mutate } = useMutation<Data, MutationSetupDocumentArgs>(MUTATION);

  props.files.forEach((filename, index) => {
    const name = filename.split('/');
    rows.push({
      filename: name[name.length - 1].slice(-15),
      size: 0,
      status: '',
      remainTime: '',
      rate: ''
    });
    mutate({ input: { url: filename, paymentId: props.paymentId } }).then(({ data }) => {
      if(data?.setupDocument) {
        download(data?.setupDocument, index);
      }
    })
  });
</script>

<style scoped>

</style>
