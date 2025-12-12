import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/ContinueButton';
import { colors, spacing, typography } from '../../../theme/colors';

export default function ResetPasswordConfirmScreen() {
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

        <Text style={styles.title}>Reset Password</Text>

        <Text style={styles.message}>
          We sent you an email with a link to reset your password. If you don't see it, check your spam folder or contact us at{' '}
          <Text style={styles.emailLink}>info@imprintapp.com</Text>
        </Text>
      </ScrollView>

      <ContinueButton
        onPress={() => router.replace('/pages/auth/login')}
        label="Return to Log In"
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
    marginBottom: spacing.xxxl,
  },
  message: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailLink: {
    color: colors.accent.blueLight,
  },
});
