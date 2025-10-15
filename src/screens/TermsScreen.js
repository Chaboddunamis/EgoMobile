import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';

const TermsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        {navigation && navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.lastUpdated}>Last updated: January 2025</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.sectionText}>
              By accessing and using the EGO platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Platform Overview</Text>
            <Text style={styles.sectionText}>
              EGO is a social auction platform designed exclusively for African women creators to monetize their attention and influence through competitive bidding systems. The platform facilitates connections between creators and viewers through auction-based interactions.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Eligibility Requirements</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.boldText}>Creator Accounts:</Text> Only women of African nationality or descent are eligible to register as creators. All creator accounts require gender verification and manual admin approval.
              {'\n\n'}
              <Text style={styles.boldText}>Viewer Accounts:</Text> Open to all users aged 18 and above, with automatic approval upon registration.
              {'\n\n'}
              <Text style={styles.boldText}>Geographic Restrictions:</Text> The platform is currently available only to users from African countries.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Account Registration and Verification</Text>
            <Text style={styles.sectionText}>
              Users must provide accurate, current, and complete information during registration. Creator accounts undergo a verification process including:
              {'\n\n'}
              • Gender verification through facial recognition technology
              {'\n'}
              • Identity verification with government-issued documents
              {'\n'}
              • Manual review and approval by platform administrators
              {'\n'}
              • Compliance with community guidelines and platform standards
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Auction System and Bidding</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.boldText}>Bidding Rules:</Text>
              {'\n'}
              • Bid amounts range from $50 to $250,000 per auction item
              {'\n'}
              • All bids are final and cannot be cancelled once placed
              {'\n'}
              • Winners are determined by the highest single bid across all items
              {'\n'}
              • Creators can list up to 6 items per auction room
              {'\n\n'}
              <Text style={styles.boldText}>Auction Duration:</Text> Set by creators, ranging from 1 hour to 7 days maximum.
              {'\n\n'}
              <Text style={styles.boldText}>Payment Obligations:</Text> Winning bidders must complete payment within 24 hours of auction end.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Payment Terms</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.boldText}>Revenue Sharing:</Text>
              {'\n'}
              • Creators receive 80% of winning bid amounts
              {'\n'}
              • Platform retains 20% as service fees
              {'\n'}
              • Payment processing fees may apply
              {'\n\n'}
              <Text style={styles.boldText}>Payment Methods:</Text> Credit cards, debit cards, and approved digital payment systems.
              {'\n\n'}
              <Text style={styles.boldText}>Refund Policy:</Text> All sales are final. Refunds may be considered only in cases of technical errors or fraudulent activity.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. User Conduct and Prohibited Activities</Text>
            <Text style={styles.sectionText}>
              Users agree not to:
              {'\n\n'}
              • Engage in fraudulent bidding or payment activities
              {'\n'}
              • Harass, abuse, or threaten other users
              {'\n'}
              • Share inappropriate, offensive, or illegal content
              {'\n'}
              • Attempt to circumvent platform security measures
              {'\n'}
              • Use automated systems or bots for bidding
              {'\n'}
              • Violate any applicable laws or regulations
              {'\n'}
              • Impersonate other individuals or entities
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Privacy and Data Protection</Text>
            <Text style={styles.sectionText}>
              We are committed to protecting user privacy and comply with applicable data protection laws. Our Privacy Policy details how we collect, use, and protect personal information. By using the platform, you consent to our data practices as outlined in the Privacy Policy.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Intellectual Property Rights</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.boldText}>Platform Content:</Text> All platform design, features, and functionality are owned by EGO and protected by intellectual property laws.
              {'\n\n'}
              <Text style={styles.boldText}>User Content:</Text> Users retain ownership of content they create but grant EGO a license to use, display, and distribute such content on the platform.
              {'\n\n'}
              <Text style={styles.boldText}>Trademark:</Text> "EGO" and related marks are trademarks of the platform and cannot be used without permission.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Platform Availability and Modifications</Text>
            <Text style={styles.sectionText}>
              We reserve the right to:
              {'\n\n'}
              • Modify, suspend, or discontinue the platform at any time
              {'\n'}
              • Update these terms of service with notice to users
              {'\n'}
              • Implement new features or change existing functionality
              {'\n'}
              • Perform maintenance that may temporarily affect service availability
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Account Termination</Text>
            <Text style={styles.sectionText}>
              We may terminate or suspend accounts for:
              {'\n\n'}
              • Violation of these terms of service
              {'\n'}
              • Fraudulent or illegal activities
              {'\n'}
              • Repeated community guideline violations
              {'\n'}
              • Non-payment of winning bids
              {'\n'}
              • Providing false information during registration
              {'\n\n'}
              Users may also delete their accounts at any time through account settings.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>12. Limitation of Liability</Text>
            <Text style={styles.sectionText}>
              EGO shall not be liable for:
              {'\n\n'}
              • Indirect, incidental, or consequential damages
              {'\n'}
              • Loss of profits, data, or business opportunities
              {'\n'}
              • Technical failures or service interruptions
              {'\n'}
              • Actions or omissions of other users
              {'\n'}
              • Third-party payment processing issues
              {'\n\n'}
              Our total liability is limited to the amount paid by the user in the 12 months preceding the claim.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>13. Dispute Resolution</Text>
            <Text style={styles.sectionText}>
              <Text style={styles.boldText}>Governing Law:</Text> These terms are governed by the laws of Nigeria.
              {'\n\n'}
              <Text style={styles.boldText}>Dispute Process:</Text>
              {'\n'}
              1. Direct negotiation between parties
              {'\n'}
              2. Mediation through platform support
              {'\n'}
              3. Binding arbitration if necessary
              {'\n\n'}
              <Text style={styles.boldText}>Jurisdiction:</Text> Lagos State courts have exclusive jurisdiction over any legal proceedings.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>14. Age Requirements</Text>
            <Text style={styles.sectionText}>
              Users must be at least 18 years old to use the platform. Users between 16-18 may use the platform with parental consent and supervision. We do not knowingly collect information from children under 16.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>15. Communication and Notifications</Text>
            <Text style={styles.sectionText}>
              By using the platform, you consent to receive:
              {'\n\n'}
              • Transactional emails and notifications
              {'\n'}
              • Platform updates and announcements
              {'\n'}
              • Marketing communications (with opt-out option)
              {'\n'}
              • Legal notices and policy updates
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>16. Force Majeure</Text>
            <Text style={styles.sectionText}>
              We shall not be liable for any failure to perform due to unforeseen circumstances or causes beyond our reasonable control, including natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, network infrastructure failures, strikes, or shortages of transportation facilities, fuel, energy, labor or materials.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>17. Severability</Text>
            <Text style={styles.sectionText}>
              If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining terms will remain in full force and effect.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>18. Contact Information</Text>
            <Text style={styles.sectionText}>
              For questions about these Terms of Service, please contact us:
              {'\n\n'}
              <Text style={styles.boldText}>Email:</Text> legal@egoplatform.com
              {'\n'}
              <Text style={styles.boldText}>Address:</Text> Victoria Island, Lagos, Nigeria
              {'\n'}
              <Text style={styles.boldText}>Phone:</Text> +234-800-EGO-HELP
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing to use EGO, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </Text>
            <Text style={styles.copyright}>
              © 2025 EGO Platform. All rights reserved.
            </Text>
          </View>
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
  lastUpdated: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  content: {
    paddingHorizontal: SPACING.MD,
    paddingBottom: SPACING.XL,
  },
  section: {
    marginBottom: SPACING.LG,
    backgroundColor: COLORS.DARK_CARD,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.FONT_SIZE_LG,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.SM,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  sectionText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  footer: {
    marginTop: SPACING.LG,
    padding: SPACING.MD,
    backgroundColor: COLORS.DARK_CARD,
    borderRadius: RADIUS.MD,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  footerText: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
  copyright: {
    fontSize: TYPOGRAPHY.FONT_SIZE_SM,
    color: COLORS.TEXT_MUTED,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
  },
});

export default TermsScreen;
