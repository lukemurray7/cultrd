import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/ContinueButton';

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
          <Ionicons name="chevron-back" size={24} color="#000000" />
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
    marginBottom: 32,
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  emailLink: {
    color: '#4A9EFF',
  },
});
