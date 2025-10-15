import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AboutScreen = ({ navigation }) => {
  const teamMembers = [
    {
      name: 'Amara Okafor',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 10+ years in fintech and social platforms',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      name: 'Kemi Adebayo',
      role: 'CTO',
      bio: 'Tech innovator specializing in real-time systems and mobile development',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    },
    {
      name: 'Zara Mensah',
      role: 'Head of Design',
      bio: 'Creative director focused on user experience and African aesthetics',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'Head of Marketing',
      bio: 'Brand strategist with expertise in African markets and social media',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const values = [
    {
      title: 'Empowerment',
      description: 'We believe in empowering African women to monetize their influence and build sustainable income streams.',
      icon: '👑',
    },
    {
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to create new opportunities in the attention economy.',
      icon: '🚀',
    },
    {
      title: 'Community',
      description: 'We foster a supportive community where creators and viewers can connect meaningfully.',
      icon: '🤝',
    },
    {
      title: 'Transparency',
      description: 'We maintain transparent bidding processes and fair revenue sharing for all participants.',
      icon: '💎',
    },
  ];

  const stats = [
    { label: 'Active Creators', value: '10,000+', gradient: GRADIENTS.YELLOW },
    { label: 'Total Earnings', value: '$2.5M+', gradient: GRADIENTS.PURPLE },
    { label: 'Countries Served', value: '54', gradient: GRADIENTS.QUEPAL },
    { label: 'Daily Auctions', value: '500+', gradient: GRADIENTS.SWEET_MORNING },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        {navigation && navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>About EGO</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../assets/egologo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Where Attention Is Power</Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              EGO is revolutionizing the attention economy by creating the world's first social auction platform
              specifically designed for African women. We believe that attention is the new currency, and our
              platform empowers creators to monetize their influence through competitive bidding systems.
            </Text>
          </View>
        </View>

        {/* Vision Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              To become the leading platform where African women can transform their social presence into
              sustainable income, fostering economic independence and celebrating the power of feminine influence
              across the continent.
            </Text>
          </View>
        </View>

        {/* Platform Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCardWrapper}>
                <LinearGradient colors={stat.gradient} style={styles.statCard}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Our Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          {values.map((value, index) => (
            <View key={index} style={styles.valueCard}>
              <View style={styles.valueHeader}>
                <Text style={styles.valueIcon}>{value.icon}</Text>
                <Text style={styles.valueTitle}>{value.title}</Text>
              </View>
              <Text style={styles.valueDescription}>{value.description}</Text>
            </View>
          ))}
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Create Your Profile</Text>
              <Text style={styles.stepDescription}>
                African women can register as creators with gender verification and build their unique auction rooms.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Set Up Auctions</Text>
              <Text style={styles.stepDescription}>
                Creators can list up to 6 items for auction with custom themes, timers, and bidding ranges up to $250,000.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Competitive Bidding</Text>
              <Text style={styles.stepDescription}>
                Viewers place bids using horizontal gradient sliders, with real-time updates and winner determination.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Connect & Earn</Text>
              <Text style={styles.stepDescription}>
                Winners get private chat access with creators, and creators earn from successful auctions.
              </Text>
            </View>
          </View>
        </View>

        {/* Our Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          <Text style={styles.teamIntro}>
            Meet the passionate team behind EGO, dedicated to empowering African women in the digital economy.
          </Text>

          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamCard}>
              <Image source={{ uri: member.image }} style={styles.teamImage} />
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={styles.teamRole}>{member.role}</Text>
                <Text style={styles.teamBio}>{member.bio}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Technology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              EGO is built with cutting-edge technology including real-time WebSocket connections for live bidding,
              advanced gender verification systems, and secure payment processing. Our platform supports 54 African
              countries and provides a seamless mobile-first experience.
            </Text>
          </View>

          <View style={styles.techFeatures}>
            <View style={styles.techFeature}>
              <Text style={styles.techIcon}>⚡</Text>
              <Text style={styles.techText}>Real-time Bidding</Text>
            </View>
            <View style={styles.techFeature}>
              <Text style={styles.techIcon}>🔒</Text>
              <Text style={styles.techText}>Secure Payments</Text>
            </View>
            <View style={styles.techFeature}>
              <Text style={styles.techIcon}>📱</Text>
              <Text style={styles.techText}>Mobile-First Design</Text>
            </View>
            <View style={styles.techFeature}>
              <Text style={styles.techIcon}>🌍</Text>
              <Text style={styles.techText}>Pan-African Reach</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Join the revolution where attention becomes power and influence creates income.
          </Text>
          <Text style={styles.copyright}>© 2025 EGO. All rights reserved.</Text>
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
  scrollView: {
    flex: 1,
  },
  logoSection: {
    padding: SPACING.LG,
    alignItems: 'center',
    marginTop: SPACING.MD,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SPACING.MD,
  },
  tagline: {
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    color: COLORS.PRIMARY_YELLOW,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: SPACING.MD,
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_XL,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.MD,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  card: {
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.MD * 3) / 2,
    marginBottom: SPACING.MD,
  },
  statCard: {
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.FONT_SIZE_3XL,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  valueCard: {
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  valueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  valueIcon: {
    fontSize: 24,
    marginRight: SPACING.SM,
  },
  valueTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_YELLOW,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  valueDescription: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  stepNumberText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  stepDescription: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  teamIntro: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  teamCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  teamImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.MD,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_YELLOW,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  teamRole: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.PRIMARY_PURPLE,
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontWeight: '600',
  },
  teamBio: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  techFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.MD,
  },
  techFeature: {
    width: (SCREEN_WIDTH - SPACING.MD * 3) / 2,
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  techIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  techText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.WHITE,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  footer: {
    padding: SPACING.LG,
    alignItems: 'center',
    marginBottom: SPACING.XL,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  copyright: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_MUTED,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
});

export default AboutScreen;
