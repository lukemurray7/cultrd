import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { AlertDialog } from '../../../components/AlertDialog';
import { ContinueButton } from '../../../components/ContinueButton';
import { TextInput } from '../../../components/TextInput';

export default function CreateAccountEmailScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ visible: false, message: '' });

  const handleCreateAccount = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorDialog({
        visible: true,
        message: 'Please enter both email and password.',
      });
      return;
    }

    if (password.length < 6) {
      setErrorDialog({
        visible: true,
        message: 'Password must be at least 6 characters long.',
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    if (error) {
      setLoading(false);
      setErrorDialog({
        visible: true,
        message: error.message || 'Failed to create account. Please try again.',
      });
    } else {
      const currentUser = data.user;
      if (currentUser) {
        try {
          await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('id', currentUser.id);
        } catch (updateError) {
          console.error('Error updating onboarding status:', updateError);
        }
      }
      setLoading(false);
      router.replace('/pages/home');
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

        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Save your progress, sync across devices, and more
        </Text>

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
            autoComplete="password-new"
          />
        </View>
      </ScrollView>

      <ContinueButton
        onPress={handleCreateAccount}
        disabled={loading}
        label={loading ? 'Creating Account...' : 'Create Account'}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => router.push('/pages/auth/login')}
          >
            Log in
          </Text>
        </Text>
      </View>

      <AlertDialog
        visible={errorDialog.visible}
        title="Error"
        message={errorDialog.message}
        onClose={() => setErrorDialog({ visible: false, message: '' })}
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  link: {
    color: '#4A9EFF',
    textDecorationLine: 'underline',
  },
});
