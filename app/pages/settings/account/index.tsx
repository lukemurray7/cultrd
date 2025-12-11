import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import appJson from '../../../../app.json';
import { supabase } from '../../../../lib/supabase';
import { AlertDialog } from '../../../components/AlertDialog';
import { useAuth } from '../../../contexts/AuthContext';

interface Profile {
  email: string;
  daily_reading_goal_minutes: number;
  goal_notifications_enabled: boolean;
}

export default function AccountSettingsScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('email, daily_reading_goal_minutes, goal_notifications_enabled')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = () => {
    router.push('/pages/auth/reset-password');
  };

  const handleUpdateGoal = async (minutes: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ daily_reading_goal_minutes: minutes })
        .eq('id', user.id);

      if (error) throw error;
      setProfile((prev) => prev ? { ...prev, daily_reading_goal_minutes: minutes } : null);
      setShowGoalModal(false);
    } catch (error) {
      console.error('Error updating goal:', error);
      Alert.alert('Error', 'Failed to update reading goal.');
    }
  };

  const handleUpdateNotifications = async (enabled: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ goal_notifications_enabled: enabled })
        .eq('id', user.id);

      if (error) throw error;
      setProfile((prev) => prev ? { ...prev, goal_notifications_enabled: enabled } : null);
      setShowNotificationsModal(false);
    } catch (error) {
      console.error('Error updating notifications:', error);
      Alert.alert('Error', 'Failed to update notifications.');
    }
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
              }

              const { error: authError } = await supabase.auth.deleteUser();
              if (authError) throw authError;

              await signOut();
              router.replace('/pages/auth/login');
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account. Please contact support at info@imprintapp.com');
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

  if (loading || !profile) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

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
          <Text style={styles.backIcon}>{'<'}</Text>
        </Pressable>

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
              <Text style={styles.label}>Daily Reading Goal</Text>
              <Text style={styles.value}>{profile.daily_reading_goal_minutes} min / day</Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => setShowGoalModal(true)}
            >
              <Text style={styles.editButtonText}>UPDATE</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Goal Notifications</Text>
              <Text style={styles.value}>{profile.goal_notifications_enabled ? 'ON' : 'OFF'}</Text>
            </View>
            <Pressable
              style={styles.editButton}
              onPress={() => setShowNotificationsModal(true)}
            >
              <Text style={styles.editButtonText}>UPDATE</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.linksSection}>
          <Pressable onPress={() => Alert.alert('Info', 'Restore Purchase functionality coming soon.')}>
            <Text style={styles.link}>Restore Purchase</Text>
          </Pressable>
          <Pressable onPress={() => Alert.alert('Info', 'Manage Subscriptions functionality coming soon.')}>
            <Text style={styles.link}>Manage Subscriptions</Text>
          </Pressable>
          <Pressable onPress={() => setDeleteDialog(true)}>
            <Text style={styles.deleteLink}>Delete Account</Text>
          </Pressable>
        </View>

        <Text style={styles.version}>Version {appJson.expo.version}</Text>
      </ScrollView>

      <Pressable style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      {showGoalModal && (
        <GoalUpdateModal
          currentMinutes={profile.daily_reading_goal_minutes}
          onUpdate={handleUpdateGoal}
          onClose={() => setShowGoalModal(false)}
        />
      )}

      {showNotificationsModal && (
        <NotificationsUpdateModal
          currentEnabled={profile.goal_notifications_enabled}
          onUpdate={handleUpdateNotifications}
          onClose={() => setShowNotificationsModal(false)}
        />
      )}

      <AlertDialog
        visible={deleteDialog}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone."
        buttonText="Cancel"
        onClose={() => setDeleteDialog(false)}
      />
    </View>
  );
}

function GoalUpdateModal({
  currentMinutes,
  onUpdate,
  onClose,
}: {
  currentMinutes: number;
  onUpdate: (minutes: number) => void;
  onClose: () => void;
}) {
  const options = [
    { label: 'Quick', minutes: 2 },
    { label: 'Regular', minutes: 5 },
    { label: 'Advanced', minutes: 10 },
  ];

  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.modal}>
        <Text style={modalStyles.title}>Update Daily Reading Goal</Text>
        <View style={modalStyles.options}>
          {options.map((option) => (
            <Pressable
              key={option.minutes}
              style={[
                modalStyles.option,
                currentMinutes === option.minutes && modalStyles.optionSelected,
              ]}
              onPress={() => onUpdate(option.minutes)}
            >
              <Text
                style={[
                  modalStyles.optionText,
                  currentMinutes === option.minutes && modalStyles.optionTextSelected,
                ]}
              >
                {option.label} ({option.minutes} min / day)
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={modalStyles.cancelButton} onPress={onClose}>
          <Text style={modalStyles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

function NotificationsUpdateModal({
  currentEnabled,
  onUpdate,
  onClose,
}: {
  currentEnabled: boolean;
  onUpdate: (enabled: boolean) => void;
  onClose: () => void;
}) {
  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.modal}>
        <Text style={modalStyles.title}>Update Goal Notifications</Text>
        <View style={modalStyles.options}>
          <Pressable
            style={[
              modalStyles.option,
              currentEnabled && modalStyles.optionSelected,
            ]}
            onPress={() => onUpdate(true)}
          >
            <Text
              style={[
                modalStyles.optionText,
                currentEnabled && modalStyles.optionTextSelected,
              ]}
            >
              ON
            </Text>
          </Pressable>
          <Pressable
            style={[
              modalStyles.option,
              !currentEnabled && modalStyles.optionSelected,
            ]}
            onPress={() => onUpdate(false)}
          >
            <Text
              style={[
                modalStyles.optionText,
                !currentEnabled && modalStyles.optionTextSelected,
              ]}
            >
              OFF
            </Text>
          </Pressable>
        </View>
        <Pressable style={modalStyles.cancelButton} onPress={onClose}>
          <Text style={modalStyles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
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
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
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
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000000',
  },
  passwordValue: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 2,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A9EFF',
  },
  linksSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: '#4A9EFF',
    marginBottom: 16,
  },
  deleteLink: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 16,
  },
  version: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A9EFF',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A9EFF',
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  options: {
    gap: 12,
    marginBottom: 20,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  optionSelected: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#666666',
  },
});
