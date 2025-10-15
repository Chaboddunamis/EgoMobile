import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ViewerDashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  // Animations
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const cardsTranslateY = useRef(new Animated.Value(50)).current;
  const statsScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Beautiful entrance animations
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(cardsTranslateY, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(statsScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const StatsCard = ({ title, value, icon, gradient, onPress }) => (
    <Animated.View style={[styles.statsCardContainer, { transform: [{ scale: statsScale }] }]}>
      <TouchableOpacity
        style={styles.statsCard}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradient}
          style={styles.statsGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statsIcon}>{icon}</Text>
          <Text style={styles.statsValue}>{value}</Text>
          <Text style={styles.statsTitle}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const QuickActionCard = ({ title, description, icon, onPress }) => (
    <TouchableOpacity
      style={styles.quickActionCard}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionIcon}>{icon}</Text>
        <View style={styles.quickActionText}>
          <Text style={styles.quickActionTitle}>{title}</Text>
          <Text style={styles.quickActionDescription}>{description}</Text>
        </View>
        <Text style={styles.quickActionArrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const TrendingCreatorCard = ({ creator }) => (
    <TouchableOpacity
      style={styles.creatorCard}
      onPress={() => navigation.navigate('CreatorProfile', { creatorId: creator.id })}
      activeOpacity={0.9}
    >
      <View style={styles.creatorCardContent}>
        <Image source={{ uri: creator.image }} style={styles.creatorImage} />
        {creator.isLive && (
          <LinearGradient
            colors={GRADIENTS.SUCCESS}
            style={styles.liveIndicator}
          >
            <Text style={styles.liveText}>LIVE</Text>
          </LinearGradient>
        )}
        <Text style={styles.creatorName}>{creator.name}</Text>
        <Text style={styles.creatorFollowers}>{creator.followers} followers</Text>
        <View style={styles.creatorStats}>
          <View style={styles.creatorStat}>
            <Text style={styles.creatorStatIcon}>❤️</Text>
            <Text style={styles.creatorStatText}>{creator.likes}</Text>
          </View>
          <View style={styles.creatorStat}>
            <Text style={styles.creatorStatIcon}>🏆</Text>
            <Text style={styles.creatorStatText}>{creator.auctions}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Mock data for trending creators
  const trendingCreators = [
    {
      id: 1,
      name: 'Amara_K',
      image: 'https://picsum.photos/100/100?random=1',
      followers: '12.5K',
      likes: '2.3K',
      auctions: 15,
      isLive: true,
    },
    {
      id: 2,
      name: 'Queen_Zara',
      image: 'https://picsum.photos/100/100?random=2',
      followers: '8.7K',
      likes: '1.8K',
      auctions: 12,
      isLive: false,
    },
    {
      id: 3,
      name: 'Divine_Ada',
      image: 'https://picsum.photos/100/100?random=3',
      followers: '15.2K',
      likes: '3.1K',
      auctions: 23,
      isLive: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BLACK} />

      {/* Header */}
      <Animated.View style={[styles.headerContainer, { opacity: headerOpacity }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: user?.profilePic || 'https://picsum.photos/100/100?random=user' }}
              style={styles.headerAvatar}
            />
            <View>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <Text style={styles.headerSubtitle}>Welcome, {user?.name || 'Viewer'}!</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <Animated.View
          style={[
            styles.statsSection,
            { transform: [{ translateY: cardsTranslateY }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.statsRow}>
            <StatsCard
              title="Active Bids"
              value="3"
              icon="💰"
              gradient={GRADIENTS.YELLOW}
              onPress={() => Alert.alert('Active Bids', 'You have 3 active bids')}
            />
            <StatsCard
              title="Won"
              value="12"
              icon="🏆"
              gradient={GRADIENTS.SUCCESS}
              onPress={() => Alert.alert('Won Auctions', 'You have won 12 auctions')}
            />
            <StatsCard
              title="Favorites"
              value="28"
              icon="❤️"
              gradient={GRADIENTS.PURPLE}
              onPress={() => Alert.alert('Favorites', 'You have 28 favorite creators')}
            />
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          style={[
            styles.quickActionsSection,
            { transform: [{ translateY: cardsTranslateY }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <QuickActionCard
            title="Browse Creators"
            description="Discover amazing African queens"
            icon="👑"
            onPress={() => navigation.navigate('Home')}
          />

          <QuickActionCard
            title="Live Auctions"
            description="Join active bidding sessions"
            icon="🔴"
            onPress={() => navigation.navigate('Posts')}
          />

          <QuickActionCard
            title="My Bidding History"
            description="View your past bids and wins"
            icon="📊"
            onPress={() => Alert.alert('Coming Soon', 'Bidding history feature coming soon!')}
          />

          <QuickActionCard
            title="Wallet & Payments"
            description="Manage your payment methods"
            icon="💳"
            onPress={() => Alert.alert('Coming Soon', 'Wallet feature coming soon!')}
          />
        </Animated.View>

        {/* Trending Creators */}
        <Animated.View
          style={[
            styles.trendingSection,
            { transform: [{ translateY: cardsTranslateY }] }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Creators</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.seeAllText}>See All ›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creatorsScrollContent}
          >
            {trendingCreators.map((creator) => (
              <TrendingCreatorCard key={creator.id} creator={creator} />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View
          style={[
            styles.activitySection,
            { transform: [{ translateY: cardsTranslateY }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🏆</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>You won an auction!</Text>
                <Text style={styles.activityDescription}>Date with Amara_K - $2,500</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>💰</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New bid placed</Text>
                <Text style={styles.activityDescription}>Video call with Queen_Zara - $1,800</Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>❤️</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New favorite added</Text>
                <Text style={styles.activityDescription}>Divine_Ada joined your favorites</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  headerContainer: {
    paddingTop: SPACING.SM,
    paddingHorizontal: SPACING.LG,
    paddingBottom: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: SPACING.MD,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_YELLOW,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
  },
  headerSubtitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
  },
  statsSection: {
    marginTop: SPACING.LG,
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.MD,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsCardContainer: {
    flex: 1,
    marginHorizontal: SPACING.XS,
  },
  statsCard: {
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
  },
  statsGradient: {
    padding: SPACING.MD,
    alignItems: 'center',
  },
  statsIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  statsValue: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_3XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  statsTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  quickActionsSection: {
    marginBottom: SPACING.XL,
  },
  quickActionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: RADIUS.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
  },
  quickActionIcon: {
    fontSize: 32,
    marginRight: SPACING.MD,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  quickActionDescription: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
  },
  quickActionArrow: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: 28,
    color: COLORS.PRIMARY_YELLOW,
    fontWeight: 'bold',
  },
  trendingSection: {
    marginBottom: SPACING.XL,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  seeAllText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.PRIMARY_PURPLE,
  },
  creatorsScrollContent: {
    paddingRight: SPACING.LG,
  },
  creatorCard: {
    width: 140,
    marginRight: SPACING.MD,
    borderRadius: RADIUS.LG,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  creatorCardContent: {
    padding: SPACING.MD,
    alignItems: 'center',
  },
  creatorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.SM,
  },
  liveIndicator: {
    position: 'absolute',
    top: SPACING.MD,
    right: SPACING.MD,
    paddingHorizontal: SPACING.XS,
    paddingVertical: 2,
    borderRadius: RADIUS.XS,
  },
  liveText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  creatorName: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  creatorFollowers: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  creatorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  creatorStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorStatIcon: {
    fontSize: 12,
    marginRight: SPACING.XS,
  },
  creatorStatText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  activitySection: {
    marginBottom: SPACING.XL,
  },
  activityCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: RADIUS.LG,
    padding: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: SPACING.SM,
  },
  activityIcon: {
    fontSize: 32,
    marginRight: SPACING.MD,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  activityDescription: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  activityTime: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_MUTED,
  },
  bottomPadding: {
    height: SPACING.XXL,
  },
});

export default ViewerDashboardScreen;
