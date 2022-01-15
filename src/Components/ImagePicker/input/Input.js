/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, warnOnce, tagPropType } from '../utils';
import "../communStyle.css";
import './style.css';

const propTypes = {
    children: PropTypes.node,
    /** types like normal input */
    type: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bsSize: PropTypes.string,
    valid: PropTypes.bool,
    invalid: PropTypes.bool,
    /** Pass in a Component to override default element */
    tag: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string,
            PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
        ]))
    ]),
    /** ref will only get you a reference to the NavLink component, use innerRef to get a reference to the DOM element (for things like focus management). */
    innerRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.string
    ]),
    plaintext: PropTypes.bool,
    addon: PropTypes.bool,
    className: PropTypes.string,
    cssModule: PropTypes.object
};

const defaultProps = {
    type: 'text'
};
/**
 *
 *
 * Easily extend form controls by adding text
 * 
 * 
 * 
 */
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.getRef = this.getRef.bind(this);
        this.focus = this.focus.bind(this);
    }

    getRef(ref) {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
        this.ref = ref;
    }

    focus() {
        if (this.ref) {
            this.ref.focus();
        }
    }

    render() {
        let {
            className,
            cssModule,
            type,
            bsSize,
            valid,
            invalid,
            tag,
            addon,
            plaintext,
            innerRef,
            ...attributes
        } = this.props;

        const checkInput = ['radio', 'checkbox'].indexOf(type) > -1;
        const isNotaNumber = new RegExp('\\D', 'g');

        const fileInput = type === 'file';
        const textareaInput = type === 'textarea';
        const selectInput = type === 'select';
        const rangeInput = type === 'range';
        let Tag = tag || (selectInput || textareaInput ? type : 'input');

        let formControlClass = 'sob-form-control';

        if (plaintext) {
            formControlClass = `${formControlClass}-plaintext`;
            Tag = tag || 'input';
        } else if (fileInput) {
            formControlClass = `${formControlClass}-file`;
        } else if (rangeInput) {
            formControlClass = `${formControlClass}-range`;
        } else if (checkInput) {
            if (addon) {
                formControlClass = null;
            } else {
                formControlClass = 'sob-form-check-input';
            }
        }

        if (attributes.size && isNotaNumber.test(attributes.size)) {
            warnOnce(
                'Please use the prop "bsSize" instead of the "size" to sobrus input sizing.'
            );
            bsSize = attributes.size;
            delete attributes.size;
        }

        const classes = mapToCssModules(
            classNames(
                className,
                invalid && 'sob-is-invalid',
                valid && 'sob-is-valid',
                bsSize ? `sob-form-control-${bsSize}` : false,
                type === 'textarea' ? "sob-textarea" : false,
                formControlClass
            ),
            cssModule
        );

        if (Tag === 'input' || (tag && typeof tag === 'function')) {
            attributes.type = type;
        }

        if (
            attributes.children &&
            !(
                plaintext ||
                type === 'select' ||
                typeof Tag !== 'string' ||
                Tag === 'select'
            )
        ) {
            warnOnce(
                `Input with a type of "${type}" cannot have children. Please use "value"/"defaultValue" instead.`
            );
            delete attributes.children;
        }

        return <Tag {...attributes} ref={innerRef} className={classes} aria-invalid={invalid} />;
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export { Input };