import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography, borders } from '../../../theme/colors';

export default function CreateAccountScreen() {
  const handleSocialLogin = (provider: 'apple' | 'google' | 'email') => {
    if (provider === 'email') {
      router.push('/pages/auth/create-account-email');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text.black} />
        </Pressable>

        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Save your progress, sync across devices, and more
        </Text>

        <View style={styles.socialButtons}>
          <Pressable
            style={[styles.socialButton, styles.appleButton]}
            onPress={() => handleSocialLogin('apple')}
          >
            <Ionicons name="logo-apple" size={20} color={colors.text.primary} />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </Pressable>

          <Pressable
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => handleSocialLogin('google')}
          >
            <Ionicons name="logo-google" size={20} color={colors.text.black} />
            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>

          <Pressable
            style={[styles.socialButton, styles.emailButton]}
            onPress={() => handleSocialLogin('email')}
          >
            <Text style={styles.emailText}>Continue with Email</Text>
          </Pressable>
        </View>
      </ScrollView>

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
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing.xxxxl,
  },
  socialButtons: {
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  socialButton: {
    borderRadius: borders.radius.base,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borders.width.thin,
    gap: spacing.md,
  },
  appleButton: {
    backgroundColor: colors.background.black,
    borderColor: colors.background.black,
  },
  appleText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  googleButton: {
    backgroundColor: colors.background.white,
    borderColor: colors.border.lightGray,
  },
  googleText: {
    color: colors.text.black,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  emailButton: {
    backgroundColor: colors.background.white,
    borderColor: colors.border.lightGray,
  },
  emailText: {
    color: colors.text.black,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
  },
  link: {
    color: colors.accent.blueLight,
    textDecorationLine: 'underline',
  },
});
