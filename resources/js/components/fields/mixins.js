const classes = function (field, section) {
    let attributes = field.props;
    if (!attributes) return '';
    let classes = attributes.classes;
    if (!classes) return '';

    return classes[section] || '';
}

export const EditMixin = {
    data: () => ({
        allErrors: {},
        timers: {}
    }),
    props: {
        field: {type: Object, required: true},
        formData: {type: Object, default: () => ({})},
        item: {type: Object, default: () => ({})},
        value: {default: null},
        type: {type: String, default: 'text'},
        attributes: {type: [Object, Array], default: () => ({})}
    },
    computed: {
        inputAttrs() {
            return {...this.attrs, ...this.rulesAttrs, ...this.attributes}
        },
        errors() {
            return Object.values(this.allErrors);
        },
        hasErrors() {
            return this.errors.length > 0
        },
        rules() {
            return this.field.rules || []
        },
        rulesAttrs() {
            let attrs = {};
            let rules = this.rules;
            Object.keys(rules).forEach(rule => {
                let params = rules[rule];
                let htmlRule = this.htmlRules[rule];

                if (htmlRule) {
                    attrs[htmlRule] = params[0] || true;
                }
            });

            return attrs;
        },
        htmlRules() {
            return {
                required: 'required',
                'min': 'minlength',
                'max': 'maxlength'
            }
        },
        classes() {
            return classes(this.field, 'edit')
        }
    },
    methods: {
        input(value) {
            this.$emit('input', value)
        },
        extractRuleMessage(rule, pass) {
            if (typeof pass === 'string') {
                this.$set(this.allErrors, rule, pass);
            } else if (typeof pass === 'boolean' && !pass) {
                this.$set(this.allErrors, rule, this.$t(`validation.${rule}`, {attribute: this.field.name}));
            } else if (pass instanceof Promise) {
                pass.then((passed) => {
                    this.extractRuleMessage(rule, passed);
                })
            } else if (typeof pass === "object") {
                Object.keys(pass).forEach(k => {
                    let values = pass[k];
                    values.forEach(it => {
                        this.$set(this.allErrors, rule, it);
                    })
                })
            } else {
                this.$delete(this.allErrors, rule)
            }
        },
        validate(handler, value, rule, params) {
            let passed;
            if (!handler) {
                passed = window.hubble_rules.defaultHandler(value, this.field.name, rule, ...params);
            } else {
                passed = handler(value, this.field.name, ...params);
            }

            this.extractRuleMessage(rule, passed)
        }
    },
    watch: {
        value(newValue) {
            let rules = Object.keys(this.rules);
            if ((rules.includes('nullable') && window.hubble_rules.nullable(newValue, this.field.name)) || newValue === this.item[this.field.name]) {
                this.allErrors = [];
                return;
            }

            this.$delete(this.allErrors, 'any');

            rules.filter(rule => {
                return !['nullable'].includes(rule)
            }).forEach(rule => {
                let params = this.rules[rule];

                let handler = window.hubble_rules[rule];
                if (['unique'].includes(rule) || !handler) {
                    clearTimeout(this.timers[rule]);
                    this.timers[rule] = setTimeout(() => {
                        this.validate(handler, newValue, rule, params)
                    }, 250)
                } else {
                    this.validate(handler, newValue, rule, params)
                }

            })
        }
    },
    created() {
        let errors = this.$formErrors(this.field.name);
        let old = this.$old(this.field.name, false);
        if (old) {
            this.input(old);
        }
        if (errors && errors.length > 0) {
            this.$set(this.allErrors, 'any', errors[0])
        }
    }
}

export const IndexMixin = {
    computed: {
        classes() {
            return classes(this.field, 'index')
        }
    }
}

export const DetailsMixins = {
    computed: {
        classes() {
            return classes(this.field, 'details')
        }
    }
}
