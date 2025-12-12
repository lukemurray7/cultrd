import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { AlertDialog } from '../../../components/AlertDialog';
import { ContinueButton } from '../../../components/ContinueButton';
import { TextInput } from '../../../components/TextInput';
import { colors, spacing, typography } from '../../../theme/colors';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ visible: false, message: '' });

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setErrorDialog({
        visible: true,
        message: 'Please enter your email address.',
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'cultured://reset-password',
    });

    if (error) {
      setLoading(false);
      setErrorDialog({
        visible: true,
        message: error.message || 'Failed to send reset email. Please try again.',
      });
    } else {
      router.push('/pages/auth/reset-password-confirm');
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
          <Ionicons name="chevron-back" size={24} color={colors.text.black} />
        </Pressable>

        <Text style={styles.title}>Reset Password</Text>

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
        </View>
      </ScrollView>

      <ContinueButton
        onPress={handleResetPassword}
        disabled={loading}
        label={loading ? 'Sending...' : 'Reset Password'}
      />

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
    backgroundColor: colors.background.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxxl,
  },
  backButton: {
    width: spacing.xxxxl,
    height: spacing.xxxxl,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.accent.blueLight,
    textAlign: 'center',
    marginBottom: spacing.xxxxl,
  },
  form: {
    marginBottom: spacing.xl,
  },
});
