import BaseLayout from './base-layout';
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Card'
})
export default class Card extends mixins(BaseLayout) {

  @Prop({type: [String, Object]})
  public title: string | object;

  public render() {
    return <a-card title={this.title}>
      {this.fields}
      {this.$slots.default}
    </a-card>;
  }
}
