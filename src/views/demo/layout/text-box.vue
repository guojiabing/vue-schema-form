<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <v-schema-form :editable="editable"
                     :schema="schema"
                     v-model="value"></v-schema-form>
      <d-button @click="changeMode">
        {{editable ? '详情' : '编辑'}}
      </d-button>
      <show-value :value="value"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/schema-form';
  import {createVNode} from '@/views/demo/layout/util';
  import ShowValue from '@/views/demo/show-value';
  import {SchemaFormField} from 'v-schema-form-types';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'LayoutInline',
    components: {ShowValue}
  })
  export default class LayoutInline extends Vue {

    private editable = true;

    get schema(): SchemaFormField {
      return {
        props: {
          labelWidth: 120
        },
        fields: {
          textbox1: {
            type: 'text-box',
            title: '文本串联',
            layout: createVNode(this.$createElement),
            fields: {
              a: {
                type: 'string',
                layoutType: 'text-box',
                layout: '%s元'
              }
            }
          },
          textbox2: {
            type: 'text-box',
            title: '文本串联',
            layout: '订%s元/票 退%s元/票 改%s元/票',
            fields: {
              text1: {
                type: 'number',
                default: 10,
                required: true
              },
              text2: {
                type: 'number',
                default: 20,
                required: true
              },
              text3: {
                type: 'number',
                default: 30,
                required: true
              }
            }
          }
        }
      };
    }

    public value = {};

    public beforeCreate() {
      SchemaForm.registerAntd();
      // SchemaForm.registerElement();
    }

    public changeMode() {
      this.editable = !this.editable;
    }

    public effects2($) {
      $('month').onFieldChange((v) => {
        console.log('month changed: ' + v);
      });
    }
  }
</script>
