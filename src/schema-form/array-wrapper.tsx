import {SchemaFormStore} from '@/schema-form/internal/utils';
import {getButtonComponent, getColComponent, getRowComponent} from '@/schema-form/utils/utils';

import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'ArrayWrapper'
})
export default class ArrayWrapper extends Vue {
  @Prop({type: Number, default: 24})
  public cellSpan: number;
  @Prop(String)
  public addBtnText: string;
  @Prop(Object)
  public addBtnProps: any;
  @Prop({type: Number, default: 0})
  public maxLength: number;
  @Prop({type: Boolean, default: false})
  public subForm: boolean;
  @Inject('store')
  public store: SchemaFormStore;


  public renderAddButton() {
    if (this.store.mode === 'display') {
      return null;
    }
    const ColComponent = getColComponent();
    let ButtonComponent = getButtonComponent();
    if (this.store.platform === 'mobile') {
      ButtonComponent = 'm-button';
    }
    const buttonStyle: any = {};
    if (this.addBtnProps && this.addBtnProps.block) {
      buttonStyle.width = '100%';
    }
    const button = <ButtonComponent onClick={this.onAddClick}
                                    disabled={this.store && (this.store.disabled || this.store.loading)}
                                    style={buttonStyle}
                                    icon="plus"
                                    attrs={Object.assign({}, this.addBtnProps)}>{this.addBtnText || '添加'}</ButtonComponent>;
    if (this.subForm) {
      return <div style={{margin: '10px 15px'}}>{button}</div>;
    }
    return <ColComponent span={this.cellSpan}>{button}</ColComponent>;
  }

  public onAddClick() {
    this.$emit('add');
  }

  public render() {
    const RowComponent = getRowComponent();
    const content = [
      this.renderFields(),
      this.renderAddButton()
    ];

    if (this.subForm) {
      return <div>{content}</div>;
    }

    if (this.$attrs.platform === 'mobile') {
      return <transition-group name="flip-list" tag="div">{content}</transition-group>;
    } else {
      return <RowComponent gutter={this.$attrs.gutter || 20}
                           type="flex">
        <transition-group name="flip-list" tag="div">{content}</transition-group>
      </RowComponent>;
    }
  }

  private renderFields() {
    if (this.store.platform === 'mobile') {
      return this.$slots.default.map((it, index) => {
        return <div style={{position: 'relative'}}>
          {
            [<a style={{
              color: '#e94721',
              position: 'absolute',
              right: 0,
              top: '15px',
              cursor: 'pointer'
            }}
                onclick={() => {
                  this.$emit('remove', index);
                }}>
              <ae-icon type="delete"/>
              删除
            </a>, it]
          }
        </div>;
      });
    }
    return this.$slots.default.map((it, index) => {
      return [it, <div style={{textAlign: 'right'}}>
        <a style={{
          color: '#e94721',
          cursor: 'pointer'
        }}
           onclick={() => {
             this.$emit('remove', index);
           }}>
          <ae-icon type="delete"/>
          删除
        </a>
      </div>];
    });
  }
}
