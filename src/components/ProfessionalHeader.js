import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../utils/colors';

const ProfessionalHeader = ({
  showBack = false,
  onBackPress,
  userInfo = null,
  showNotifications = false,
  onNotificationPress,
  showBookmark = false,
  onBookmarkPress,
  showMenu = false,
  onMenuPress,
  backgroundColor = 'rgba(0,0,0,0.3)',
  title = '',
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <BlurView intensity={40} tint="dark" style={[styles.container, { backgroundColor }]}>
        <LinearGradient
          colors={['rgba(195,55,100,0.1)', 'transparent']}
          style={styles.headerGradient}
        >
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBack && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onBackPress}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.iconButtonGradient}
                >
                  <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_INVERSE} />
                </LinearGradient>
            </TouchableOpacity>
          )}
            
            {title && (
              <Text style={styles.titleText}>{title}</Text>
            )}
        </View>

          {/* Center Section - User Info */}
          {userInfo && (
        <View style={styles.centerSection}>
            <View style={styles.userInfoContainer}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.profileImageContainer}
                >
                  <Image
                    source={
                      typeof userInfo.profilePic === 'string'
                        ? { uri: userInfo.profilePic }
                        : userInfo.profilePic
                    }
                    style={styles.profileImage}
                  />
                  {userInfo.isVerified && (
                    <LinearGradient
                      colors={GRADIENTS.SUCCESS}
                      style={styles.verificationBadge}
                    >
                      <Ionicons name="checkmark" size={12} color={COLORS.TEXT_INVERSE} />
                    </LinearGradient>
                  )}
                </LinearGradient>
                
                <View style={styles.userTextContainer}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {userInfo.name}
                  </Text>
                  {userInfo.subtitle && (
                    <Text style={styles.userSubtitle} numberOfLines={1}>
                      {userInfo.subtitle}
                  </Text>
                )}
                </View>
              </View>
            </View>
          )}

        {/* Right Section */}
        <View style={styles.rightSection}>
          {showNotifications && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onNotificationPress}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.iconButtonGradient}
                >
                  <Ionicons name="notifications" size={22} color={COLORS.TEXT_INVERSE} />
                  {/* Notification Badge */}
                  <LinearGradient
                    colors={GRADIENTS.ACTION}
                    style={styles.notificationBadge}
                  >
                    <Text style={styles.badgeText}>3</Text>
                  </LinearGradient>
                </LinearGradient>
            </TouchableOpacity>
          )}
          
          {showBookmark && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onBookmarkPress}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.iconButtonGradient}
                >
                  <Ionicons name="bookmark" size={22} color={COLORS.TEXT_INVERSE} />
                </LinearGradient>
            </TouchableOpacity>
          )}
          
          {showMenu && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onMenuPress}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.iconButtonGradient}
                >
                  <Ionicons name="menu" size={22} color={COLORS.TEXT_INVERSE} />
                </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
        </LinearGradient>
      </BlurView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: SPACING.SM,
    paddingHorizontal: SPACING.MD,
    ...SHADOWS.MEDIUM,
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.SM,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  iconButton: {
    marginHorizontal: SPACING.XS,
  },
  iconButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.FULL,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.SMALL,
  },
  titleText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_INVERSE,
    marginLeft: SPACING.MD,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.FULL,
    padding: 2,
    marginRight: SPACING.SM,
    position: 'relative',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.FULL,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: RADIUS.FULL,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.TEXT_INVERSE,
  },
  userTextContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_INVERSE,
    textAlign: 'center',
  },
  userSubtitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_INVERSE,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: RADIUS.FULL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 8,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_INVERSE,
  },
});

export default ProfessionalHeader;

