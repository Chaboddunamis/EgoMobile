import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const SettingsScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [screenProtectionEnabled, setScreenProtectionEnabled] = useState(true);
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Account Deletion', 'Account deletion request submitted.')
        }
      ]
    );
  };

  const renderSettingItem = (title, subtitle, value, onValueChange, type = 'switch') => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: 'rgba(255,255,255,0.2)', true: COLORS.PRIMARY_YELLOW }}
          thumbColor={value ? COLORS.WHITE : 'rgba(255,255,255,0.6)'}
          ios_backgroundColor="rgba(255,255,255,0.2)"
        />
      ) : (
        <Text style={styles.settingArrow}>›</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Image
              source={{ uri: user?.profilePic || 'https://picsum.photos/100/100?random=user' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeText}>
                  {user?.accountType === 'creator' ? '👑 Creator' : '👁️ Viewer'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.7}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => Alert.alert('Edit Profile', 'Profile editing would open here.')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Edit Profile</Text>
                <Text style={styles.settingSubtitle}>Update your profile information</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            {renderSettingItem(
              'Push Notifications',
              'Receive notifications about bids and auctions',
              notificationsEnabled,
              setNotificationsEnabled
            )}
            {renderSettingItem(
              'Screen Protection',
              'Prevent screenshots and screen recording',
              screenProtectionEnabled,
              setScreenProtectionEnabled
            )}
            {renderSettingItem(
              'Auto-play Videos',
              'Automatically play videos in feeds',
              autoPlayVideos,
              setAutoPlayVideos
            )}
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => Alert.alert('Change Password', 'Password change interface would open here.')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Change Password</Text>
                <Text style={styles.settingSubtitle}>Update your account password</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => Alert.alert('2FA', 'Two-factor authentication setup would open here.')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
                <Text style={styles.settingSubtitle}>Add an extra layer of security</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => Alert.alert('Privacy', 'Privacy settings would open here.')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Privacy Settings</Text>
                <Text style={styles.settingSubtitle}>Control who can see your profile</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, styles.lastSettingItem]}
              onPress={() => Alert.alert('Blocked Users', 'Blocked users list would open here.')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Blocked Users</Text>
                <Text style={styles.settingSubtitle}>Manage blocked accounts</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Contact')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Help Center</Text>
                <Text style={styles.settingSubtitle}>Get help and find answers</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Contact')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Contact Support</Text>
                <Text style={styles.settingSubtitle}>Get in touch with our team</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Terms')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Terms of Service</Text>
                <Text style={styles.settingSubtitle}>Read our terms and conditions</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, styles.lastSettingItem]}
              onPress={() => navigation.navigate('About')}
              activeOpacity={0.7}
            >
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>About EGO</Text>
                <Text style={styles.settingSubtitle}>Learn more about our platform</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Creator-specific Settings */}
        {user?.accountType === 'creator' && (
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Creator Tools</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => Alert.alert('Auction Settings', 'Auction management would open here.')}
                activeOpacity={0.7}
              >
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Auction Settings</Text>
                  <Text style={styles.settingSubtitle}>Manage your auction preferences</Text>
                </View>
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => Alert.alert('Content Management', 'Content management would open here.')}
                activeOpacity={0.7}
              >
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Content Management</Text>
                  <Text style={styles.settingSubtitle}>Upload and manage your content</Text>
                </View>
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => Alert.alert('Analytics', 'Analytics dashboard would open here.')}
                activeOpacity={0.7}
              >
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Analytics</Text>
                  <Text style={styles.settingSubtitle}>View your performance metrics</Text>
                </View>
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingItem, styles.lastSettingItem]}
                onPress={() => Alert.alert('Earnings', 'Earnings dashboard would open here.')}
                activeOpacity={0.7}
              >
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Earnings</Text>
                  <Text style={styles.settingSubtitle}>Track your earnings and payouts</Text>
                </View>
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={GRADIENTS.PURPLE}
              style={styles.actionButtonGradient}
            >
              <Text style={styles.actionButtonText}>Sign Out</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDeleteAccount}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={GRADIENTS.BLOODY_MARY}
              style={styles.actionButtonGradient}
            >
              <Text style={styles.actionButtonText}>Delete Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Text style={styles.appVersion}>EGO v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 EGO. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.BLACK,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.PRIMARY_YELLOW,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_XL,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.MD,
  },
  profileSection: {
    marginTop: SPACING.LG,
    marginBottom: SPACING.MD,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.MD,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_YELLOW,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: COLORS.WHITE,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  profileEmail: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  profileBadge: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: SPACING.SM,
    paddingVertical: 4,
    borderRadius: RADIUS.SM,
    alignSelf: 'flex-start',
  },
  profileBadgeText: {
    color: COLORS.PRIMARY_YELLOW,
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  editProfileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,215,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 20,
    color: COLORS.PRIMARY_YELLOW,
  },
  settingsSection: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    color: COLORS.WHITE,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    fontWeight: 'bold',
    marginBottom: SPACING.MD,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  settingsCard: {
    backgroundColor: COLORS.DARK_CARD,
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    color: COLORS.WHITE,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  settingSubtitle: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  settingArrow: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 24,
    fontWeight: '300',
  },
  actionsSection: {
    marginVertical: SPACING.LG,
  },
  actionButton: {
    height: 50,
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
    marginBottom: SPACING.MD,
  },
  actionButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.WHITE,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    fontWeight: 'bold',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.XL,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  appVersion: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    marginBottom: 5,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  appCopyright: {
    color: COLORS.TEXT_MUTED,
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
});

export default SettingsScreen;
