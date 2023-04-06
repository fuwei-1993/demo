import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { formatNumberWithComma } from '../../common/tools/transformers';
import stylesJoin from '../../common/tools/transformers/styles';
import isNil from 'lodash/isNil';

/**
 *  rule 用法参考 index.spec.js 测试
 */

class AmountInput extends Component {

  state = {
    amount: '',
    focus: false,
    errorMessage: ''
  };

  lastInputValue = '';

  static getDerivedStateFromProps(props) {
    return {
      amount: props.value
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.validation();
    }
  }

  validation = () => {
    const { rules } = this.props;
    let errorMessage = '';

    const len = rules.length;
    for (let index = 0; index < len; index++) {
      const rule = rules[index];
      if (!isNil(rule.max) && +this.state.amount > rule.max) {
        errorMessage = rule.message;
        break;
      }
      if (!isNil(rule.min) && +this.state.amount < rule.min) {
        errorMessage = rule.message;
        break;
      }
      if (!isNil(rule.pattern) && !rule.pattern.test(this.state.amount)) {
        errorMessage = rule.message;
        break;
      }
      if (!isNil(rule.validator)) {
        rule.validator(this.state.amount, (message) => {
          errorMessage = message;
        });
      }
    }

    if (this.state.amount === 0) {
      errorMessage = '输入的金额不能为0';
    }

    this.setState({
      errorMessage
    }, () => {
      this.props.onValidate(!errorMessage);
    });

  };

  onInputChange = (event) => {

    let value = event.target.value;

    if (this.lastInputValue.length > value.length && /^\d.$/g.test(this.lastInputValue.replace(value, ''))) {
      value = this.lastInputValue.substr(0, this.lastInputValue.length - 1);
    }

    this.lastInputValue = value;

    if (value === '.') {
      value = '0.';
    }

    if (/^([0-9]{1,13})?(\.?$|\.[0-9]{1,2})?$/.test(value) || !value) {
      this.setState({
        amount: value
      }, () => {
        this.lastInputValue = value;
        this.props.onChange(this.state.amount);
      });
    }
  };

  onFocus = (event) => {
    this.setState({
      focus: true
    }, () => {
      this.props.onValidate(false);
      this.props.onFocus(event);
    });
  };

  onBlur = (event) => {
    this.validation();
    this.props.onBlur(event);
    const { amount } = this.state;
    this.setState({
      focus: false,
      amount: amount === '' ? '' : `${+amount}`   // 去掉数字前面的0
    }, () => {
      this.props.onChange(this.state.amount);
    });
  };

  render() {
    let placeholder = this.props.placeholder || `请输入${this.props.title}`;
    const { focus, errorMessage, amount } = this.state;
    let inputStyle = {};
    if (this.props.size) {
      inputStyle.fontSize = /px/.test(this.props.size) ? this.props.size : `${this.props.size}px`;
    }

    return (
      <div className={stylesJoin('amount-input', this.props.className || '')}>
        <div className={stylesJoin('amount', (!focus && errorMessage) ? 'error' : '')}>
          <div className={stylesJoin('input', (!focus && amount) ? 'blur' : 'focus')}>
            <div className='sizer' style={inputStyle}>
              {!focus && amount && formatNumberWithComma(amount) ||
              amount || placeholder}
            </div>
            <input
              style={inputStyle}
              placeholder={placeholder}
              value={amount}
              onChange={this.onInputChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
          <span
            style={inputStyle}
            className={stylesJoin('symbol', (amount === '' && !focus) ? 'hide' : '')}>&yen;</span>
          <span style={inputStyle} className='title'>{this.props.title}</span>
        </div>
        {errorMessage &&
        <div className='errorMessage'>
          <div>{errorMessage}</div>
        </div>
        }
      </div>
    );
  }
}

AmountInput.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rules: PropTypes.arrayOf(PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
    pattern: PropTypes.object,
    message: PropTypes.string,
    validator: PropTypes.func
  })),
  onValidate: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.string,
};

AmountInput.defaultProps = {
  value: '',
  onChange: () => {
  },
  onValidate: () => {
  },
  onFocus: () => {
  },
  onBlur: () => {
  },
  rules: []
};

export default AmountInput;
