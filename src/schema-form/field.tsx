import Emitter from '@/mixins/emitter';
import {Platform, SchemaFormField} from '@/types/bean';
import {IField} from '@/uform/types';
import AsyncValidator from 'async-validator';
import {VNode} from 'vue';
import Component, {mixins} from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import ArrayWrapper from './array-wrapper';
import {
  addRule,
  DESKTOP,
  getAlertComponent,
  getColComponent,
  getComponent,
  getConfirmFunction,
  getDisplayComponent,
  getFormComponent,
  getOptions,
  SchemaFormComponent,
  TYPES
} from './utils';

@Component({
  name: 'FormField'
})
export default class FormField extends mixins(Emitter) {

  @Prop(Object)
  public definition: SchemaFormField;
  @Prop([Object, Array])
  public formValue: { [key: string]: any } | [];
  @Prop({type: Boolean, default: false})
  public display: boolean;
  @Prop({type: String, default: 'mobile'})
  public platform: Platform;
  @Prop()
  public value: any;
  public currentValue: any = null;
  @Prop()
  public content: any;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop(Array)
  public path: string[];
  @Prop({required: true})
  public field: IField;

  get componentType(): SchemaFormComponent {
    let component: SchemaFormComponent = null;
    if (this.display) {
      component = getDisplayComponent(this.platform, this.definition);
    } else {
      component = getComponent(this.platform, this.definition);
    }
    if (component.component === 'empty') {
      console.warn(`类型${this.field.type}${this.field.array ? '（数组）' : ''}没有对应的${this.display ? '展示' : '编辑'}组件`);
    }
    return component;
  }

  get options() {
    return getOptions(this.field);
  }

  get props() {
    const {field} = this;
    const props: any = Object.assign({}, this.componentType.getProps(field));
    const type = field.type;
    if (type === TYPES.select || type === TYPES.expandSelect) {
      props.options = this.options;
    }
    if (type === TYPES.object) {
      props.platform = this.platform;
      props.mode = this.display ? 'display' : 'edit';
      props.pathPrefix = this.path;
    }
    if (this.display) {
      delete props.required;
    }
    return props;
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
    if (this.field.onChange) {
      this.field.onChange(currentValue);
    }
    this.$forceUpdate();
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any) {
    if (this.currentValue !== value) {
      this.currentValue = value;
    }
  }

  public created() {
    this.dispatch('ASchemaForm', 'SchemaForm.addField', [this]);
  }

  @Watch('field', {immediate: true})
  public fieldChanged(field: IField) {
    this.dispatch('ASchemaForm', 'SchemaForm.addSchemaField', [field]);
  }

  public beforeDestroy() {
    this.dispatch('ASchemaForm', 'SchemaForm.removeField', [this]);
    this.dispatch('ASchemaForm', 'SchemaForm.removeSchemaField', [this.field]);
  }

  public renderInputComponent() {
    const {props, currentValue, definition} = this;
    const inputFieldDef = this.componentType;
    const InputFieldComponent = inputFieldDef.component;
    if (this.content) {
      return this.content;
    }
    if (this.display && this.definition.displayValue) {
      if (typeof this.definition.displayValue === 'function') {
        return this.definition.displayValue(this.currentValue);
      } else {
        return this.definition.displayValue;
      }
    }
    if (this.field.array && inputFieldDef.forArray === false) {
      // @ts-ignore
      return <ArrayWrapper
        disabled={this.disabled}
        subForm={this.field.type === TYPES.object}
        addBtnText={props.addBtnText}
        ref="array"
        platform={this.platform}
        addBtnProps={props.addBtnProps}
        cellSpan={props.cellSpan}
        onAdd={() => {
          this.addArrayItem();
        }}>
        {
          this.currentValue ? this.currentValue.map((v, index) => {
            const itemProps = Object.assign({}, props, {
              pathPrefix: this.path.concat(index)
            });
            if (this.field.type === TYPES.object) {
              itemProps.definition = Object.assign({}, itemProps.definition);
              delete itemProps.definition.array;
            }
            // @ts-ignore
            return <InputFieldComponent
              attrs={itemProps}
              arrayIndex={index}
              disabled={this.disabled}
              onRemoveArrayItem={async () => {
                const confirmFunc = getConfirmFunction(this.platform);
                await this[confirmFunc]('确定删除该条吗？', '提示');
                this.currentValue.splice(index, 1);
              }}
              value={v}
              title={this.platform === 'mobile' ? this.field.title : null}
              onInput={(val) => {
                this.onArrayItemInput(val, index);
              }}/>;
          }) : null
        }
      </ArrayWrapper>;
    }
    // @ts-ignore
    return <InputFieldComponent
      attrs={props}
      ref="input"
      disabled={this.disabled}
      value={currentValue}
      title={this.platform === 'mobile' ? this.field.title : null}
      onInput={this.onInput}/>;
  }

  get formItemComponent() {
    return getFormComponent(this.platform) + '-item';
  }

  public render() {
    const {props, field, definition, platform} = this;
    if (this.display) {
      props.definition = this.definition;
    }
    const component = this.renderInputComponent();
    let item = null;
    const FormItemComponent = this.formItemComponent;
    const ColComponent = getColComponent();
    if (platform === DESKTOP) {
      const formItem = field.type === TYPES.object ? component :
        <FormItemComponent attrs={this.getFormItemProps()}>
          {component}
          {this.renderNotice()}
        </FormItemComponent>;
      if (definition.span) {
        item = <ColComponent span={definition.span}>{formItem}</ColComponent>;
      } else if (definition.type === 'Extra') {
        item = component;
      } else {
        item = formItem;
      }
    } else {
      if (this.display) {
        if (this.definition.type === TYPES.object) {
          item = component;
        } else {
          item = <m-list-item title={definition.title} extra={component}/>;
        }
      } else {
        item = component;
      }
    }
    const style: any = {};
    if (!field.visible) {
      style.display = 'none';
    }
    (item as VNode).data.staticStyle = style;
    return item;
  }

  public getRules() {
    const field = this.definition;
    const rules = field.rules || [];
    if (rules.length === 0) {
      if (field.required) {
        addRule(rules, field, {required: true, message: `${field.title}为必填项`});
      }
      if (typeof field.min === 'number') {
        addRule(rules, field, {min: field.min, message: `${field.title}不能小于${field.min}`});
      }
      if (typeof field.max === 'number') {
        addRule(rules, field, {max: field.max, message: `${field.title}不能大于${field.max}`});
      }
    }
    return rules;
  }

  public onInput(value) {
    this.currentValue = value;
  }

  private renderNotice() {
    const AlertComponent = getAlertComponent();
    if (this.definition.notice) {
      return <AlertComponent message={this.definition.notice}/>;
    }
  }

  get error() {
    return this.field.errors.join('、');
  }

  public getFormItemProps() {
    const {definition} = this;
    const component = this.formItemComponent;
    const props: any = {
      required: this.display ? null : definition.required,
      title: definition.title,
      label: definition.title
    };
    if (component === 'd-form-item' || component === 'a-form-item') {
      props.help = this.field.errors.join('、');
      if (props.help) {
        props.hasFeedback = true;
        props.validateStatus = 'error';
      }
    } else if (component === 'el-form-item') {
      props.error = this.field.errors.join('、');
    }
    return props;
  }

  public validate() {
    const {field} = this;
    if (this.definition.type === TYPES.object
      && this.$refs.array) {
      const array = this.$refs.array as any;
      const validateFields = array.$children.filter(it => it.validate);
      return new Promise((resolve) => {
        Promise.all(validateFields.map(it => {
          return it.validate();
        })).then((values) => {
          if (values.some(it => !it)) {
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch(() => {
          resolve(false);
        });
      });
    }
    const rules = this.getRules();
    if (rules.length) {
      const validator = new AsyncValidator({
        [field.plainPath]: rules
      });
      const model = {
        [field.plainPath]: this.currentValue
      };
      return new Promise((resolve) => {
        validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
          if (errors) {
            field.valid = false;
            field.errors = errors.map(error => error.message);
          } else {
            field.valid = true;
            field.errors = [];
          }
          resolve(this.field.valid);
        });
      });
    }
    return true;
  }

  private addArrayItem() {
    if (this.currentValue) {
      if (this.definition.type === TYPES.object) {
        this.currentValue.push({});
      } else {
        this.currentValue.push(null);
      }
    } else {
      if (this.definition.type === TYPES.object) {
        this.currentValue = [{}];
      } else {
        this.currentValue = [null];
      }
    }
  }

  private onArrayItemInput(val: any, index: number) {
    this.currentValue[index] = val;
    this.onInput(this.currentValue);
  }
}
