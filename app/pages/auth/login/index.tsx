import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { AlertDialog } from '../../../components/AlertDialog';
import { ContinueButton } from '../../../components/ContinueButton';
import { TextInput } from '../../../components/TextInput';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ visible: false, message: '' });
  const [successDialog, setSuccessDialog] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorDialog({
        visible: true,
        message: 'Please enter both email and password.',
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      setLoading(false);
      setErrorDialog({
        visible: true,
        message: error.message || 'Invalid email address or password.',
      });
    } else if (data.user) {
      setLoading(false);
      setSuccessDialog(true);
      setTimeout(async () => {
        setSuccessDialog(false);
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', data.user.id)
          .single();

        if (profile?.onboarding_completed) {
          router.replace('/pages/home');
        } else {
          router.replace('/pages/onboarding/start');
        }
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </Pressable>

        <Text style={styles.title}>Log In</Text>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
          />
        </View>

        <Pressable
          style={styles.forgotPassword}
          onPress={() => router.push('/pages/auth/reset-password')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>
      </ScrollView>

      <ContinueButton
        onPress={handleLogin}
        disabled={loading}
        label={loading ? 'Logging in...' : 'Log In'}
      />

      <AlertDialog
        visible={errorDialog.visible}
        title="Invalid email address or password."
        message="If you already have an Imprint account, try again, or reset your password. If you don't have an account, create one now."
        onClose={() => setErrorDialog({ visible: false, message: '' })}
      />

      <AlertDialog
        visible={successDialog}
        title="Success"
        message="Logged In"
        buttonText="Done"
        onClose={() => setSuccessDialog(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A9EFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4A9EFF',
    textDecorationLine: 'underline',
  },
});
