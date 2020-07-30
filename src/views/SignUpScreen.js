import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';
import { Auth } from 'aws-amplify';

import { SocialButtons } from '../components/SocialButtons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validEmail, setValidEmail] = useState(true);
  const [passwordStrong, setPasswordStrong] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [signUpError, setSignUpError] = useState(null);

  const signUp = async () => {
    // check if email has @ in it
    if (!email.includes('@')) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    if (password.length < 8) {
      setPasswordStrong(false);
    } else {
      setPasswordStrong(true);

      // check if passwords match
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }

    if (!passwordsMatch || !passwordStrong || !validEmail) {
      return;
    }

    console.log(email);

    try {
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
    } catch (error) {
      const { message } = error;
      setSignUpError(message);
    }
  };

  return (
    <View style={styles.container}>
      <SocialButtons logIn={false} />
      <TextInput
        label="Email"
        onChange={(e) => setEmail(e.nativeEvent.text)}
        error={!validEmail}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        error={!passwordsMatch}
      />
      <TextInput
        label="Confirm Password"
        secureTextEntry={true}
        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
        error={!passwordsMatch}
      />
      <HelperText type="error" visible={!validEmail}>
        Email is invalid
      </HelperText>
      <HelperText type="error" visible={!passwordStrong}>
        Password is not strong enough. Please increase to at least 8 characters.
      </HelperText>
      <HelperText type="error" visible={!passwordsMatch}>
        Passwords don't match
      </HelperText>
      <HelperText type="error" visible={signUpError}>
        {signUpError}
      </HelperText>
      <SocialIcon
        title="Sign Up"
        button
        type="medium"
        iconStyle={{ width: 0 }}
        onPress={() => signUp()}
      />
    </View>
  );
};

export { SignUpScreen };
