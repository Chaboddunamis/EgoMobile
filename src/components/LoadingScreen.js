import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GRADIENTS, COLORS } from '../utils/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LoadingScreen = ({ onLoadingComplete }) => {
  const { width, height } = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the loading animation sequence
    const animationSequence = Animated.sequence([
      // Logo fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      // Small delay before completion
      Animated.delay(500),
    ]);

    // Start animations
    animationSequence.start(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    });

    // Cleanup
    return () => {
      animationSequence.stop();
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.logoShadow}>
            <Image
              source={require('../../assets/egologo.png')}
              style={styles.logo}
              resizeMode="contain"
              onError={(error) => console.log('Logo load error:', error)}
              onLoad={() => console.log('Logo loaded successfully')}
            />
          </View>
        </Animated.View>

        {/* App Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.title}>EGO</Text>
          <Text style={styles.subtitle}>Where Attention Is Power</Text>
        </Animated.View>

        {/* Loading Progress */}
        <Animated.View
          style={[
            styles.progressContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Loading your experience...</Text>
        </Animated.View>
      </View>

      {/* Bottom Branding */}
      <Animated.View
        style={[
          styles.bottomBranding,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.brandingText}>Empowering African Women</Text>
        <Text style={styles.brandingSubtext}>Through Social Commerce</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoShadow: {
    shadowColor: '#ED1E79',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#ED1E79',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '400',
    letterSpacing: 1,
  },
  progressContainer: {
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.7,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ED1E79',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontWeight: '400',
  },
  bottomBranding: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  brandingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  brandingSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default LoadingScreen;

