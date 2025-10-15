import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ContactScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // In a real app, this would send the form data to a server
    Alert.alert(
      'Message Sent!',
      'Thank you for contacting us. We will get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
            });
          },
        },
      ]
    );
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@egoplatform.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+234-800-EGO-HELP');
  };

  const handleSocialPress = (platform) => {
    const urls = {
      twitter: 'https://twitter.com/egoplatform',
      instagram: 'https://instagram.com/egoplatform',
      linkedin: 'https://linkedin.com/company/egoplatform',
      facebook: 'https://facebook.com/egoplatform',
    };

    Linking.openURL(urls[platform]);
  };

  const faqItems = [
    {
      question: 'How do I become a creator on EGO?',
      answer: 'Register with gender verification, complete your profile, and wait for admin approval. Only African women are eligible to become creators.',
    },
    {
      question: 'What is the maximum bid amount?',
      answer: 'Bids can range from $50 to $250,000 per auction item. Creators can set their own minimum bid amounts.',
    },
    {
      question: 'How do payments work?',
      answer: 'Winners pay through our secure payment system. Creators receive 80% of the winning bid amount, with 20% going to platform fees.',
    },
    {
      question: 'Can I cancel a bid?',
      answer: 'Bids are final and cannot be cancelled once placed. Please bid responsibly.',
    },
    {
      question: 'How long do auctions last?',
      answer: 'Auction duration is set by creators and can range from 1 hour to 7 days.',
    },
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
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.tagline}>We're here to help you succeed</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>

          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress} activeOpacity={0.7}>
            <Text style={styles.contactIcon}>📧</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@egoplatform.com</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress} activeOpacity={0.7}>
            <Text style={styles.contactIcon}>📞</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+234-800-EGO-HELP</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🏢</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Address</Text>
              <Text style={styles.contactValue}>
                Victoria Island, Lagos{'\n'}Nigeria, West Africa
              </Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🕒</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Business Hours</Text>
              <Text style={styles.contactValue}>
                Monday - Friday: 9:00 AM - 6:00 PM WAT{'\n'}
                Saturday: 10:00 AM - 4:00 PM WAT{'\n'}
                Sunday: Closed
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.TEXT_MUTED}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.TEXT_MUTED}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject *</Text>
              <TextInput
                style={styles.input}
                value={formData.subject}
                onChangeText={(value) => handleInputChange('subject', value)}
                placeholder="What is this about?"
                placeholderTextColor={COLORS.TEXT_MUTED}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.message}
                onChangeText={(value) => handleInputChange('message', value)}
                placeholder="Tell us how we can help you..."
                placeholderTextColor={COLORS.TEXT_MUTED}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
              <LinearGradient colors={GRADIENTS.YELLOW} style={styles.submitButtonGradient}>
                <Text style={styles.submitButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>

          <View style={styles.socialLinks}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress('twitter')}
              activeOpacity={0.7}
            >
              <Text style={styles.socialIcon}>🐦</Text>
              <Text style={styles.socialText}>Twitter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress('instagram')}
              activeOpacity={0.7}
            >
              <Text style={styles.socialIcon}>📷</Text>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress('linkedin')}
              activeOpacity={0.7}
            >
              <Text style={styles.socialIcon}>💼</Text>
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialPress('facebook')}
              activeOpacity={0.7}
            >
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        {/* Support Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Categories</Text>

          <View style={styles.supportCategories}>
            <View style={styles.supportCategory}>
              <Text style={styles.supportIcon}>🎯</Text>
              <Text style={styles.supportTitle}>Creator Support</Text>
              <Text style={styles.supportDescription}>
                Help with profile setup, auction management, and earnings
              </Text>
            </View>

            <View style={styles.supportCategory}>
              <Text style={styles.supportIcon}>💳</Text>
              <Text style={styles.supportTitle}>Payment Issues</Text>
              <Text style={styles.supportDescription}>
                Billing questions, payment failures, and refund requests
              </Text>
            </View>

            <View style={styles.supportCategory}>
              <Text style={styles.supportIcon}>🔧</Text>
              <Text style={styles.supportTitle}>Technical Support</Text>
              <Text style={styles.supportDescription}>
                App bugs, login issues, and feature troubleshooting
              </Text>
            </View>

            <View style={styles.supportCategory}>
              <Text style={styles.supportIcon}>📋</Text>
              <Text style={styles.supportTitle}>Account Management</Text>
              <Text style={styles.supportDescription}>
                Profile updates, verification issues, and account security
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            We typically respond to all inquiries within 24 hours during business days.
          </Text>
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
  headerSection: {
    padding: SPACING.LG,
    alignItems: 'center',
  },
  tagline: {
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
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
  contactItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    marginBottom: SPACING.MD,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contactIcon: {
    fontSize: 24,
    marginRight: SPACING.MD,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.PRIMARY_YELLOW,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  contactValue: {
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    color: COLORS.WHITE,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  form: {
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  inputGroup: {
    marginBottom: SPACING.MD,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.WHITE,
    fontWeight: '600',
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: RADIUS.SM,
    padding: SPACING.SM,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    color: COLORS.WHITE,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    height: 50,
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
    marginTop: SPACING.SM,
  },
  submitButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.BLACK,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    fontWeight: 'bold',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: (SCREEN_WIDTH - SPACING.MD * 3) / 2,
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  socialIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  socialText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.WHITE,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  faqItem: {
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  faqQuestion: {
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  faqAnswer: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  supportCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  supportCategory: {
    width: (SCREEN_WIDTH - SPACING.MD * 3) / 2,
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    marginBottom: SPACING.MD,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  supportIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  supportTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  supportDescription: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 16,
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
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
});

export default ContactScreen;
