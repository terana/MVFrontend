import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {IconSymbol} from '../Components';

/**
 * A custom stylable avatar component.
 */
export default class AvatarView extends Component {
  static propTypes = {
    style: PropTypes.any,
    userId: PropTypes.string,
    photo: PropTypes.uri,
  }
  static defaultProps = {
    style: null,
  }
  /**
   * @return {React.Node} A styled avatar component.
   */
  render() {
    const isVerified = checkVerified(this.props.userId);
    let photo = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
    return (
      <UserAvatar photo = {photo} isVerified = {isVerified} />
    );
  }
}

/**
 * @param {props} props.photo - The photo of user
 * @param {props} props - props
 * @return {React.Node} A view of verified user avatar
 */
function VerifiedUserAvatar(props) {
  return (
      <View style={styles.avatarSize}>
        <Image source={props.photo} style={styles.photoShape}/>
        <IconSymbol
          style={{position: 'absolute', marginLeft: '86%', marginTop: '86%'}}
          name='checkmark'
        />
      </View>
    );
}

/**
 * @param {uri} props.photo - The photo of user.
 * @param {props} props - props
 * @return {React.Node} A view of verified user avatar
 */
function NotVerifiedUserAvatar(props) {
  return (
      <View style={styles.avatarSize}>
        <Image source={props.photo} style={styles.photoShape}/>
      </View>
    );
}

/**
 * @return {React.Node} A view of Verified User Avatar
 * @param {string} userId - id of user
 */
function checkVerified(userId) {
    if (userId.charAt(0) == '0') {
      return true;
    }
    return false;
  }

/**
 * @param {props} props.photo - The photo of user.
 * @param {props} props.isVerified - Verified or not
 * @param {props} props - props
 * @return {React.Node} A view of verified user avatar
 */
function UserAvatar(props) {
  if (props.isVerified) {
    return <VerifiedUserAvatar photo = {props.photo} />;
  }
  return <NotVerifiedUserAvatar photo = {props.photo} />;
}

const styles = StyleSheet.create({
  avatarSize: {
    width: 100,
    height: 100,
  },
  photoShape: {
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    position: 'absolute',
  },
  checkmarkPosition: {
    position: 'absolute',
    marginLeft: '86%',
    marginTop: '86%',
  },
});
