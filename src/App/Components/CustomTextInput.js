import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, View} from 'react-native';

import StyleConstants from 'StyleConstants';

import IconSymbol from './IconSymbol';

/**
 * A custom input field used for text entry and search.
 */
export default class CustomTextInput extends Component {
  static propTypes = {
    /**
     * Search is a bool parameter, determining whether
     * the search icon will be shown.
     */
    search: PropTypes.bool,
    /**
     * Custom placeholder.
     */
    placeholder: PropTypes.string,
    /**
     * Custom onChange function.
     */
    handleChange: PropTypes.func,
    /**
     * Default value.
     */
    value: PropTypes.string,
  }

  static defaultProps = {
    search: false,
    placeholder: 'Урматы, семинар',
    handleChange: null,
    value: '',
  }

  /**
   * @param {Props} props - the props
   * Constructor, adds state attribute with
   * inputed text.
   */
  constructor(props) {
    super(props);
    this.state = {value: props.value};
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @param {Object} nextProps - new props
   * @param {Object} prevState - old state
   * @return {Object} new state
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    return {value: nextProps.value ? nextProps.value : prevState.value};
  }

  /**
   * @param {event} event - the change event
   * Using handling Text Input, storing inputted text in
   * this.state.value.
   */
  handleChange(event) {
    this.setState({value: event.target.value});
    /**
     * If has, use user-defined handle function.
     */
    if (this.props.handleChange) {
      this.props.handleChange(event);
    }
  }

  /**
   * @return {React.Node} styled input field
   */
  render() {
    const {search,
           /**
            * onChange extracted from this.props but never used.
            * It is done to prevent double-passing onChange prop
            * to TextInput, when passing {...other}.
            */
           handleChange, // eslint-disable-line no-unused-vars
           value, // eslint-disable-line no-unused-vars
           ...other} = this.props;
    return (
      <View style={style.inputViewContainer}>
        {search && <IconSymbol name='search' style={style.icon} />}
        <TextInput style={style.TextInput}
          onChange={this.handleChange}
          value={this.state.value}
          {...other} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  inputViewContainer: {
    borderRadius: StyleConstants.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: StyleConstants.BORDER_COLOR,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    fontSize: 16,
    flex: 0,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    padding: 10,
    flex: 1,
  },
});
