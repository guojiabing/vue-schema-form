<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :schema="schema"
                     :props="props"
                     @ok="()=>{}"
                     @reset="()=>{}"></v-schema-form>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import ShowValue from '@/views/demo/show-value';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DesktopEdit',
    components: {ShowValue}
  })
  export default class DesktopEdit extends Vue {

    public props = {
      labelCol: 8,
      wrapperCol: 6
    };
    public schema = {
      fields: {
        aaa: {
          type: 'string',
          title: '字段1'
        },
        bbb: {
          type: 'number',
          title: '字段2'
        },
        ccc: {
          type: 'date',
          title: '字段3'
        }
      }
    };
    public value = {};

    public created() {
      SchemaForm.registerAntd();
    }
  }
</script>
