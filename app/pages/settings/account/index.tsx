import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import appJson from '../../../../app.json';
import { useProfile } from '../../../../lib/queries/profiles';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { borders, colors, spacing, typography } from '../../../theme/colors';

export default function AccountSettingsScreen() {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile(user?.id ?? null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationsEnabled(status === 'granted');
  };

  const handleToggleNotifications = async (value: boolean) => {
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      setNotificationsEnabled(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Notification permissions were denied. You can enable them in your device settings.');
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const handleResetPassword = () => {
    router.push('/pages/auth/reset-password');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error: deleteError } = await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);

              if (deleteError) {
                console.error('Error deleting profile:', deleteError);
                throw deleteError;
              }

              await signOut();
              router.replace('/pages/auth/login');
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account. Please contact support at info@culturedapp.com');
            }
          },
        },
      ]
    );
  };

  const handleLogOut = async () => {
    await signOut();
    router.replace('/pages/auth/login');
  };

  const handleContactEmail = () => {
    Linking.openURL('mailto:info@culturedapp.com');
  };

  const canGoBack = router.canGoBack();

  if (isLoading || !profile) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {canGoBack && (
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text.primary} />
          </Pressable>
        )}

        <Text style={styles.title}>Account Details</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => Alert.alert('Info', 'Email cannot be changed.')}
            >
              <Text style={styles.editButtonText}>EDIT</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Password</Text>
              <Text style={styles.passwordValue}>••••••••</Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.editButtonText}>RESET</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Allow Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.border.light, true: colors.accent.blueLight }}
              thumbColor={colors.background.white}
            />
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <Pressable
            style={styles.buttonCard}
            onPress={() => Alert.alert('Info', 'Restore Purchase functionality coming soon.')}
          >
            <Ionicons
              name="refresh-outline"
              size={24}
              color={colors.accent.purple}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonLabel}>Restore Purchase</Text>
          </Pressable>

          <Pressable
            style={styles.buttonCard}
            onPress={() => Alert.alert('Info', 'Manage Subscriptions functionality coming soon.')}
          >
            <Ionicons
              name="card-outline"
              size={24}
              color={colors.accent.purple}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonLabel}>Manage Subscriptions</Text>
          </Pressable>

          <Pressable
            style={styles.buttonCard}
            onPress={handleDeleteAccount}
          >
            <Ionicons
              name="trash-outline"
              size={24}
              color={colors.error.red}
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonLabel, styles.deleteButtonLabel]}>Delete Account</Text>
          </Pressable>
        </View>

        <Text style={styles.version}>Version {appJson.expo.version}</Text>

        <Text style={styles.contactText}>
          Contact{' '}
          <Text style={styles.contactEmail} onPress={handleContactEmail}>
            info@culturedapp.com
          </Text>
          {' '}for any issues you are having!
        </Text>
      </ScrollView>

      <Pressable style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxxl,
    paddingBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
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
    color: colors.text.primary,
    marginBottom: spacing.xxxl,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  passwordValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    letterSpacing: 2,
  },
  editButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  editButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.accent.blueLight,
  },
  buttonsSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  buttonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borders.radius.base,
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
  },
  buttonIcon: {
    marginRight: spacing.md,
  },
  buttonLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  deleteButtonLabel: {
    color: colors.error.red,
  },
  version: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  contactText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  contactEmail: {
    color: colors.accent.blueLight,
  },
  logoutButton: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xxxxl,
    paddingVertical: spacing.lg,
    borderRadius: borders.radius.base,
    borderWidth: borders.width.thin,
    borderColor: colors.accent.blueLight,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.accent.blueLight,
  },
});
