<template>
  <q-img
    :src="urlList[0]||src||'/register.svg'"
    spinner-color="amber">
    <div class="absolute-center bg-transparent">
      <q-btn
        outline
        v-if="modelValue && urlList.length"
        color="primary"
        size="sm"
        icon="close"
        @click="close()"
      />
      <q-btn
        outline
        v-else
        color="primary"
        round
        size="sm"
        icon="photo_camera"
        @click="$refs.file.$el.click()"
      />
      <q-file
        :model-value="modelValue"
        accept="image/*"
        @update:model-value="preview($event)"
        v-show="false"
        ref="file"
      />
    </div>
  </q-img>
</template>

<script lang="ts" setup>
  import {useImageLoader} from 'src/utils/preview';

  const props = defineProps<{
    modelValue: File,
    src?: string
  }>();

  const emits = defineEmits(['update:modelValue', 'upload']);
  const { urlList, previewImages} = useImageLoader();

  const preview = (e: File) => {
    if (e) {
      previewImages([e]);
      emits('update:modelValue', e);
    }
  }

  function close () {
    urlList.value.length = 0;
    emits('update:modelValue', null);
  }
</script>

<style scoped>

</style>
