<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <v-schema-form :effects="effects"
                     :schema="schema">
      </v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import {EffectsContext} from 'v-schema-form-types';

  export default {
    name: 'DemoEffects1',
    data() {
      return {
        schema: {
          props: {inline: true},
          fields: {
            layout: {
              type: 'grid',
              layout: [6, 6],
              fields: {
                s1: {
                  type: 'string',
                  title: 'aa'
                },
                s2: {
                  type: 'string',
                  title: 'bb'
                }
              }
            }
          }
        }
      };
    },
    created() {
      SchemaForm.registerElement();
    },
    methods: {
      effects($: EffectsContext) {
        $('s1').onFieldChange(value => {
          $('s2').value(value);
        });
      }
    }
  };
</script>
