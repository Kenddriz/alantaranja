<template>
  <q-img
    :src="urlList[0]||(loadError ? '' : src)||'/register.svg'"
    @error="loadError = true"
    spinner-color="amber">
    <div class="absolute-center bg-transparent">
      <q-btn
        round
        v-if="modelValue && urlList.length"
        color="amber"
        size="sm"
        icon="close"
        @click="close()"
      />
      <q-btn
        v-else
        color="amber"
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
  import {ref} from "vue";

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
  const loadError = ref(false);
</script>

<style scoped>

</style>
