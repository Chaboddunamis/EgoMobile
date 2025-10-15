import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// InputField Component
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  iconText,
  showPasswordToggle = false,
  onTogglePassword,
  showPassword,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <View style={styles.inputRow}>
        {iconText && <Text style={styles.inputIcon}>{iconText}</Text>}
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.4)"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword} style={styles.passwordToggle}>
            <Text style={styles.passwordToggleText}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

const AuthScreen = ({ navigation }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState('viewer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [faceVerificationData, setFaceVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form animations
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(30)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    age: '',
    location: '',
  });

  useEffect(() => {
    // Beautiful entrance animation
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(formTranslateY, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(headerScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password, accountType);
        // Navigation is handled automatically by AuthContext when user state changes
      } else {
        // Registration validation
        if (formData.password !== formData.confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          setIsLoading(false);
          return;
        }

        if (accountType === 'creator' && !faceVerificationData) {
          // For now, simulate face verification completion
          setFaceVerificationData({ verified: true, timestamp: Date.now() });
        }

        const userData = {
          ...formData,
          accountType,
          id: accountType === 'creator' ? `c${Date.now()}` : `v${Date.now()}`,
          faceVerified: accountType === 'creator' ? !!faceVerificationData : false,
          faceVerificationData: faceVerificationData,
          registrationDate: new Date().toISOString(),
        };

        const success = await register(userData);
        if (success) {
          Alert.alert('Success', 'Registration completed successfully!');
          // Navigation is handled automatically by AuthContext when user state changes
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const AccountTypeSelector = () => (
    <View style={styles.accountTypeContainer}>
      <Text style={styles.sectionTitle}>Choose Account Type</Text>
      <View style={styles.accountTypeRow}>
        <TouchableOpacity
          style={[
            styles.accountTypeCard,
            accountType === 'viewer' && styles.accountTypeCardActive
          ]}
          onPress={() => setAccountType('viewer')}
        >
          <LinearGradient
            colors={accountType === 'viewer' ? GRADIENTS.YELLOW : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={styles.accountTypeGradient}
          >
            <Text style={styles.accountTypeIcon}>👀</Text>
            <Text style={[styles.accountTypeTitle, accountType === 'viewer' && { color: COLORS.BLACK }]}>
              Viewer
            </Text>
            <Text style={[styles.accountTypeDescription, accountType === 'viewer' && { color: COLORS.BLACK }]}>
              Browse & bid
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.accountTypeCard,
            accountType === 'creator' && styles.accountTypeCardActive
          ]}
          onPress={() => setAccountType('creator')}
        >
          <LinearGradient
            colors={accountType === 'creator' ? GRADIENTS.PURPLE : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={styles.accountTypeGradient}
          >
            <Text style={styles.accountTypeIcon}>👑</Text>
            <Text style={styles.accountTypeTitle}>Creator</Text>
            <Text style={styles.accountTypeDescription}>Host auctions</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BLACK} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: formOpacity,
                transform: [{ scale: headerScale }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isLogin ? 'Welcome Back' : 'Join EGO'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isLogin ? 'Sign in to continue' : 'Create your account'}
            </Text>
          </Animated.View>

          {/* Auth Toggle */}
          <Animated.View
            style={[
              styles.authToggle,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }]
              }
            ]}
          >
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Form */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }]
              }
            ]}
          >
            {/* Account Type Selection */}
            <AccountTypeSelector />

            {/* Email Input */}
            <InputField
              label="Email Address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              iconText="📧"
            />

            {/* Password Input */}
            <InputField
              label="Password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Enter your password"
              secureTextEntry={true}
              showPasswordToggle={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              iconText="🔒"
            />

            {/* Registration Fields */}
            {!isLogin && (
              <>
                <InputField
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="Confirm your password"
                  secureTextEntry={true}
                  showPasswordToggle={true}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  iconText="🔒"
                />

                <InputField
                  label="Full Name"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Enter your full name"
                  iconText="👤"
                />

                <InputField
                  label="Phone Number"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  iconText="📱"
                />

                <View style={styles.rowInputs}>
                  <View style={styles.halfInput}>
                    <InputField
                      label="Age"
                      value={formData.age}
                      onChangeText={(value) => handleInputChange('age', value)}
                      placeholder="Age"
                      keyboardType="numeric"
                      iconText="📅"
                    />
                  </View>
                  <View style={styles.halfInput}>
                    <InputField
                      label="Location"
                      value={formData.location}
                      onChangeText={(value) => handleInputChange('location', value)}
                      placeholder="City, Country"
                      iconText="📍"
                    />
                  </View>
                </View>

                {/* Face Verification for Creators */}
                {accountType === 'creator' && (
                  <View style={styles.faceVerificationContainer}>
                    <Text style={styles.sectionTitle}>Face Verification Required</Text>
                    <TouchableOpacity
                      style={styles.faceVerificationButton}
                      onPress={() => {
                        // Simulate face verification
                        setFaceVerificationData({ verified: true, timestamp: Date.now() });
                        Alert.alert('Success', 'Face verification completed successfully!');
                      }}
                    >
                      <LinearGradient
                        colors={faceVerificationData ? GRADIENTS.SUCCESS : GRADIENTS.PURPLE}
                        style={styles.faceVerificationGradient}
                      >
                        <Text style={styles.faceVerificationIcon}>
                          {faceVerificationData ? '✅' : '📷'}
                        </Text>
                        <Text style={styles.faceVerificationText}>
                          {faceVerificationData ? 'Verification Complete' : 'Start Face Verification'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <LinearGradient
                colors={GRADIENTS.YELLOW}
                style={styles.submitGradient}
              >
                <Text style={styles.submitText}>
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: SPACING.LG,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.XL,
  },
  backButton: {
    position: 'absolute',
    left: SPACING.LG,
    top: SPACING.MD,
    padding: SPACING.SM,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.FULL,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: 20,
    color: COLORS.PRIMARY_YELLOW,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_4XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.XS,
  },
  headerSubtitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
  },
  authToggle: {
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.LG,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: RADIUS.LG,
    padding: SPACING.XS,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: SPACING.SM,
    alignItems: 'center',
    borderRadius: RADIUS.MD,
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(255,215,0,0.2)',
  },
  toggleText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  toggleTextActive: {
    color: COLORS.PRIMARY_YELLOW,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
  },
  formContainer: {
    paddingHorizontal: SPACING.LG,
  },
  accountTypeContainer: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  accountTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountTypeCard: {
    flex: 1,
    marginHorizontal: SPACING.XS,
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  accountTypeCardActive: {
    borderColor: COLORS.PRIMARY_YELLOW,
    borderWidth: 2,
  },
  accountTypeGradient: {
    padding: SPACING.MD,
    alignItems: 'center',
  },
  accountTypeIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  accountTypeTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  accountTypeDescription: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.MD,
  },
  inputLabel: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  inputWrapper: {
    borderRadius: RADIUS.MD,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: SPACING.SM,
  },
  textInput: {
    flex: 1,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    color: COLORS.TEXT_PRIMARY,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
  },
  passwordToggle: {
    padding: SPACING.XS,
  },
  passwordToggleText: {
    fontSize: 18,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -SPACING.XS,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: SPACING.XS,
  },
  faceVerificationContainer: {
    marginBottom: SPACING.LG,
  },
  faceVerificationButton: {
    marginTop: SPACING.SM,
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
  },
  faceVerificationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
  },
  faceVerificationIcon: {
    fontSize: 24,
    marginRight: SPACING.SM,
  },
  faceVerificationText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  submitButton: {
    marginTop: SPACING.LG,
    marginBottom: SPACING.XL,
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: SPACING.MD,
    alignItems: 'center',
  },
  submitText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.BLACK,
  },
});

export default AuthScreen;
