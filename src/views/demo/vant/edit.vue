<template>
  <a-layout class="demo-wrapper">
    <a-layout-content style="background: #f9f9f9;">
      <v-schema-form v-model="value"
                     class="demo-form"
                     platform="mobile"
                     :schema="definition"
                     :props="props"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/schema-form';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {
    public v = 1;
    public created() {
      SchemaForm.registerVant();
    }
  }
</script>
