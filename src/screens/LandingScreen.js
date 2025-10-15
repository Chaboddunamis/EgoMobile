import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Beautiful entrance animations
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(contentTranslateY, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BLACK} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }]
            }
          ]}
        >
          <Image
            source={require('../../assets/egologo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Headline */}
        <Animated.View
          style={[
            styles.headlineContainer,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <Text style={styles.headline}>EGO – Where Attention Is Power</Text>
          <Text style={styles.subheadline}>
            The first social auction platform where African women shine, and wealthy admirers compete for the spotlight.
          </Text>
        </Animated.View>

        {/* How It Works */}
        <Animated.View
          style={[
            styles.howItWorksSection,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <Text style={styles.sectionTitle}>How It Works</Text>

          <View style={styles.stepCard}>
            <LinearGradient colors={['rgba(255,215,0,0.1)', 'rgba(139,92,246,0.1)']} style={styles.stepGradient}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepTitle}>Creators List Exclusive Items</Text>
              <Text style={styles.stepDescription}>
                Digital content, live calls, dates, or hookups
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.stepCard}>
            <LinearGradient colors={['rgba(139,92,246,0.1)', 'rgba(255,215,0,0.1)']} style={styles.stepGradient}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepTitle}>Fans Place Bids</Text>
              <Text style={styles.stepDescription}>
                On anything of interest the creator listed
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.stepCard}>
            <LinearGradient colors={['rgba(255,215,0,0.1)', 'rgba(139,92,246,0.1)']} style={styles.stepGradient}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepTitle}>Only the Highest Bid Overall Wins</Text>
              <Text style={styles.stepDescription}>
                Others walk away empty-handed
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.stepCard}>
            <LinearGradient colors={['rgba(139,92,246,0.1)', 'rgba(255,215,0,0.1)']} style={styles.stepGradient}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepTitle}>The Creator Gets Paid</Text>
              <Text style={styles.stepDescription}>
                Instantly. No subscriptions, no waiting.
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Why EGO */}
        <Animated.View
          style={[
            styles.whyEgoSection,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Why EGO?</Text>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>👑</Text>
            <Text style={styles.featureTitle}>Empowers African Women</Text>
            <Text style={styles.featureDescription}>Build influence, earn fast, and be seen</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💸</Text>
            <Text style={styles.featureTitle}>Big Wins for Big Players</Text>
            <Text style={styles.featureDescription}>High-value men love to compete and win</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureTitle}>More Money, Less Content</Text>
            <Text style={styles.featureDescription}>Earn in one bid what others grind for in months</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🧠</Text>
            <Text style={styles.featureTitle}>Built for FOMO</Text>
            <Text style={styles.featureDescription}>Our model is addictive by design</Text>
          </View>
        </Animated.View>

        {/* Trust Section */}
        <Animated.View
          style={[
            styles.trustSection,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <View style={styles.trustCard}>
            <Text style={styles.trustIcon}>🛡️</Text>
            <Text style={styles.trustText}>
              100% Secure. No spam. No fake followers. Just real bids, real people, real value.
            </Text>
          </View>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View
          style={[
            styles.ctaSection,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Auth')}
            activeOpacity={0.85}
            style={styles.primaryButton}
          >
            <LinearGradient
              colors={GRADIENTS.YELLOW}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.primaryButtonText}>Launch Your Crown Today</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            activeOpacity={0.85}
            style={styles.secondaryButton}
          >
            <View style={styles.secondaryButtonView}>
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTagline}>Whether you're a queen or a king — the game is on.</Text>
        </View>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SPACING.XL,
    marginBottom: SPACING.XL,
  },
  logo: {
    width: 140,
    height: 140,
  },
  headlineContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XXL,
    paddingHorizontal: SPACING.MD,
  },
  headline: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_4XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  subheadline: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.LINE_HEIGHT_RELAXED * TYPOGRAPHY.FONT_SIZE_LG,
  },
  howItWorksSection: {
    marginBottom: SPACING.XXL,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_3XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },
  stepCard: {
    marginBottom: SPACING.MD,
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  stepGradient: {
    padding: SPACING.LG,
    alignItems: 'center',
  },
  stepNumber: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_4XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_PURPLE,
    marginBottom: SPACING.SM,
  },
  stepTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  stepDescription: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  whyEgoSection: {
    marginBottom: SPACING.XXL,
  },
  featureCard: {
    backgroundColor: 'rgba(26,26,26,0.8)',
    borderRadius: RADIUS.MD,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: SPACING.SM,
  },
  featureTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.PRIMARY_YELLOW,
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  featureDescription: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  trustSection: {
    marginBottom: SPACING.XXL,
  },
  trustCard: {
    backgroundColor: 'rgba(139,92,246,0.1)',
    borderRadius: RADIUS.LG,
    padding: SPACING.LG,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_PURPLE,
    alignItems: 'center',
  },
  trustIcon: {
    fontSize: 40,
    marginBottom: SPACING.SM,
  },
  trustText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.LINE_HEIGHT_RELAXED * TYPOGRAPHY.FONT_SIZE_LG,
  },
  ctaSection: {
    marginBottom: SPACING.XXL,
  },
  primaryButton: {
    marginBottom: SPACING.MD,
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.BLACK,
  },
  secondaryButton: {
    borderRadius: RADIUS.LG,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_YELLOW,
    overflow: 'hidden',
  },
  secondaryButtonView: {
    paddingVertical: SPACING.LG,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.XL,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerTagline: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2 size
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomPadding: {
    height: SPACING.XXL,
  },
});

export default LandingScreen;
