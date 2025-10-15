import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, GRADIENTS, TYPOGRAPHY, SPACING, RADIUS } from '../utils/colors';
import dummyData from '../data/dummyData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CreatorDashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [showCreateAuctionModal, setShowCreateAuctionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newAuction, setNewAuction] = useState({
    title: '',
    description: '',
    startingBid: '',
    duration: '24',
    category: 'date',
  });
  const [newPost, setNewPost] = useState({
    caption: '',
    type: 'image',
  });

  const [creatorStats, setCreatorStats] = useState({
    totalEarnings: 0,
    activeAuctions: 0,
    totalPosts: 0,
    totalViews: 0,
    liveViewers: 0,
  });

  useEffect(() => {
    calculateCreatorStats();
  }, [user]);

  const calculateCreatorStats = () => {
    if (!user) return;

    // Find creator data
    const creator = dummyData.creators.find(c => c.email === user.email);
    if (!creator) return;

    const creatorAuctions = dummyData.auctions?.filter(auction => auction.creatorId === creator.id) || [];
    const creatorPosts = creator.images || [];

    const totalEarnings = creator.earnings || 59240;
    const activeAuctions = creatorAuctions.filter(auction => auction.status === 'active').length;
    const totalPosts = creatorPosts.length;
    const totalViews = creatorPosts.reduce((sum, post) => sum + (post.views || 0), 0);
    const liveViewers = creator.liveViewers || 49300;

    setCreatorStats({
      totalEarnings,
      activeAuctions,
      totalPosts,
      totalViews,
      liveViewers,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleCreateAuction = () => {
    if (!newAuction.title || !newAuction.description || !newAuction.startingBid) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Simulate creating auction
    Alert.alert(
      'Auction Created!',
      `Your auction "${newAuction.title}" has been created successfully with a starting bid of $${newAuction.startingBid}.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowCreateAuctionModal(false);
            setNewAuction({
              title: '',
              description: '',
              startingBid: '',
              duration: '24',
              category: 'date',
            });
            calculateCreatorStats();
          },
        },
      ]
    );
  };

  const handleUploadContent = () => {
    if (!newPost.caption) {
      Alert.alert('Error', 'Please add a caption for your post.');
      return;
    }

    // Simulate uploading content
    Alert.alert(
      'Content Uploaded!',
      `Your ${newPost.type} has been uploaded successfully.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowUploadModal(false);
            setNewPost({
              caption: '',
              type: 'image',
            });
            calculateCreatorStats();
          },
        },
      ]
    );
  };

  const handleManageAuction = (auctionTitle) => {
    Alert.alert(
      'Manage Auction',
      `Managing auction: ${auctionTitle}`,
      [
        { text: 'Edit Auction', onPress: () => console.log('Edit auction') },
        { text: 'View Bids', onPress: () => console.log('View bids') },
        { text: 'End Auction', onPress: () => console.log('End auction') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderOverviewTab = () => (
    <View style={styles.overviewContent}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <LinearGradient
          colors={GRADIENTS.YELLOW}
          style={styles.statCard}
        >
          <Text style={styles.statIcon}>💰</Text>
          <Text style={styles.statValue}>{formatCurrency(creatorStats.totalEarnings)}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </LinearGradient>

        <LinearGradient
          colors={GRADIENTS.PURPLE}
          style={styles.statCard}
        >
          <Text style={styles.statIcon}>🎯</Text>
          <Text style={styles.statValue}>{creatorStats.activeAuctions}</Text>
          <Text style={styles.statLabel}>Active Auctions</Text>
        </LinearGradient>

        <LinearGradient
          colors={GRADIENTS.SUCCESS}
          style={styles.statCard}
        >
          <Text style={styles.statIcon}>📸</Text>
          <Text style={styles.statValue}>{creatorStats.totalPosts}</Text>
          <Text style={styles.statLabel}>Total Posts</Text>
        </LinearGradient>

        <LinearGradient
          colors={GRADIENTS.ACCENT}
          style={styles.statCard}
        >
          <Text style={styles.statIcon}>👁️</Text>
          <Text style={styles.statValue}>{formatNumber(creatorStats.totalViews)}</Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </LinearGradient>
      </View>

      {/* Live Viewers */}
      <View style={styles.liveViewersCard}>
        <Text style={styles.liveViewersIcon}>📺</Text>
        <Text style={styles.liveViewersNumber}>{formatNumber(creatorStats.liveViewers)}</Text>
        <Text style={styles.liveViewersLabel}>Live Viewers</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setShowCreateAuctionModal(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={GRADIENTS.PURPLE}
              style={styles.quickActionGradient}
            >
              <Text style={styles.quickActionIcon}>🎯</Text>
              <Text style={styles.quickActionText}>Create Auction</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => setShowUploadModal(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={GRADIENTS.YELLOW}
              style={styles.quickActionGradient}
            >
              <Text style={styles.quickActionIcon}>📸</Text>
              <Text style={styles.quickActionText}>Upload Content</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderContentTab = () => (
    <View style={styles.contentContent}>
      <View style={styles.contentHeader}>
        <Text style={styles.sectionTitle}>My Content</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => setShowUploadModal(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={GRADIENTS.PURPLE}
            style={styles.uploadButtonGradient}
          >
            <Text style={styles.uploadButtonText}>+ Upload</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Content Grid */}
      <View style={styles.contentGrid}>
        {dummyData.creators[0]?.images?.slice(0, 6).map((image, index) => (
          <View key={index} style={styles.contentItem}>
            <Image source={{ uri: image.url }} style={styles.contentImage} />
            <View style={styles.contentOverlay}>
              <View style={styles.contentStats}>
                <View style={styles.contentStat}>
                  <Text style={styles.contentStatIcon}>❤️</Text>
                  <Text style={styles.contentStatText}>{formatNumber(image.likes)}</Text>
                </View>
                <View style={styles.contentStat}>
                  <Text style={styles.contentStatIcon}>👁️</Text>
                  <Text style={styles.contentStatText}>{formatNumber(image.views)}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAuctionsTab = () => (
    <View style={styles.auctionsContent}>
      <View style={styles.auctionsHeader}>
        <Text style={styles.sectionTitle}>Active Auctions</Text>
        <TouchableOpacity
          style={styles.createAuctionButton}
          onPress={() => setShowCreateAuctionModal(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={GRADIENTS.YELLOW}
            style={styles.createAuctionGradient}
          >
            <Text style={styles.createAuctionText}>+ Create</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Active Auctions */}
      <View style={styles.auctionsList}>
        <View style={styles.auctionItem}>
          <View style={styles.auctionCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400' }}
              style={styles.auctionImage}
            />
            <View style={styles.auctionDetails}>
              <Text style={styles.auctionTitle}>Go on a Date with Me</Text>
              <Text style={styles.auctionBid}>Current Bid: $250,000</Text>
              <Text style={styles.auctionTime}>Ends in: 2h 15m</Text>
            </View>
            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => handleManageAuction('Go on a Date with Me')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={GRADIENTS.PURPLE}
                style={styles.manageButtonGradient}
              >
                <Text style={styles.manageButtonText}>Manage</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.auctionItem}>
          <View style={styles.auctionCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400' }}
              style={styles.auctionImage}
            />
            <View style={styles.auctionDetails}>
              <Text style={styles.auctionTitle}>Private Video Call</Text>
              <Text style={styles.auctionBid}>Current Bid: $150,000</Text>
              <Text style={styles.auctionTime}>Ends in: 5h 30m</Text>
            </View>
            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => handleManageAuction('Private Video Call')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={GRADIENTS.PURPLE}
                style={styles.manageButtonGradient}
              >
                <Text style={styles.manageButtonText}>Manage</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BLACK} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: user?.profilePic || 'https://picsum.photos/100/100?random=user' }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerTitle}>Creator Dashboard</Text>
            <Text style={styles.headerSubtitle}>Manage your auctions</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['Overview', 'Content', 'Auctions'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'Overview' && renderOverviewTab()}
        {selectedTab === 'Content' && renderContentTab()}
        {selectedTab === 'Auctions' && renderAuctionsTab()}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Create Auction Modal */}
      <Modal
        visible={showCreateAuctionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateAuctionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={GRADIENTS.PURPLE}
              style={styles.modalGradient}
            >
              <Text style={styles.modalTitle}>Create New Auction</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Auction Title"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={newAuction.title}
                onChangeText={(text) => setNewAuction({...newAuction, title: text})}
              />

              <TextInput
                style={[styles.modalInput, styles.modalTextArea]}
                placeholder="Description"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={newAuction.description}
                onChangeText={(text) => setNewAuction({...newAuction, description: text})}
                multiline={true}
                numberOfLines={3}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Starting Bid ($)"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={newAuction.startingBid}
                onChangeText={(text) => setNewAuction({...newAuction, startingBid: text})}
                keyboardType="numeric"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowCreateAuctionModal(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCreateButton}
                  onPress={handleCreateAuction}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={GRADIENTS.YELLOW}
                    style={styles.modalCreateGradient}
                  >
                    <Text style={styles.modalCreateText}>Create</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Upload Content Modal */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowUploadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={GRADIENTS.PURPLE}
              style={styles.modalGradient}
            >
              <Text style={styles.modalTitle}>Upload Content</Text>

              <TextInput
                style={[styles.modalInput, styles.modalTextArea]}
                placeholder="Caption"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={newPost.caption}
                onChangeText={(text) => setNewPost({...newPost, caption: text})}
                multiline={true}
                numberOfLines={3}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setShowUploadModal(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCreateButton}
                  onPress={handleUploadContent}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={GRADIENTS.YELLOW}
                    style={styles.modalCreateGradient}
                  >
                    <Text style={styles.modalCreateText}>Upload</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
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
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: RADIUS.LG,
    margin: SPACING.LG,
    padding: SPACING.XS,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.SM,
    alignItems: 'center',
    borderRadius: RADIUS.MD,
  },
  activeTab: {
    backgroundColor: 'rgba(255,215,0,0.2)',
  },
  tabText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  activeTabText: {
    color: COLORS.PRIMARY_YELLOW,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
  },
  overviewContent: {
    paddingBottom: SPACING.XL,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.MD,
    marginBottom: SPACING.LG,
  },
  statCard: {
    width: (SCREEN_WIDTH - (SPACING.LG * 2) - SPACING.MD) / 2,
    padding: SPACING.LG,
    borderRadius: RADIUS.LG,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_2XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  liveViewersCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: SPACING.LG,
    borderRadius: RADIUS.LG,
    alignItems: 'center',
    marginBottom: SPACING.XL,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  liveViewersIcon: {
    fontSize: 40,
    marginBottom: SPACING.SM,
  },
  liveViewersNumber: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_4XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_PURPLE,
    marginBottom: SPACING.XS,
  },
  liveViewersLabel: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
  },
  quickActionsSection: {
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_XL, // H1
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.MD,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: SPACING.LG,
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  quickActionText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  contentContent: {
    paddingBottom: SPACING.XL,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  uploadButton: {
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
  },
  uploadButtonGradient: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
  },
  uploadButtonText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  contentItem: {
    width: (SCREEN_WIDTH - (SPACING.LG * 2) - 4) / 3,
    height: (SCREEN_WIDTH - (SPACING.LG * 2) - 4) / 3,
    position: 'relative',
  },
  contentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: SPACING.XS,
  },
  contentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentStatIcon: {
    fontSize: 10,
    marginRight: SPACING.XS,
  },
  contentStatText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  auctionsContent: {
    paddingBottom: SPACING.XL,
  },
  auctionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  createAuctionButton: {
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
  },
  createAuctionGradient: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
  },
  createAuctionText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.BLACK,
  },
  auctionsList: {
    gap: SPACING.MD,
  },
  auctionItem: {
    marginBottom: SPACING.SM,
  },
  auctionCard: {
    flexDirection: 'row',
    padding: SPACING.MD,
    borderRadius: RADIUS.LG,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  auctionImage: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.MD,
    marginRight: SPACING.MD,
  },
  auctionDetails: {
    flex: 1,
  },
  auctionTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  auctionBid: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.PRIMARY_YELLOW,
    marginBottom: SPACING.XS,
  },
  auctionTime: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_BASE, // Paragraph
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_NORMAL,
    color: COLORS.TEXT_SECONDARY,
  },
  manageButton: {
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
  },
  manageButtonGradient: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.SM,
  },
  manageButtonText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: RADIUS.LG,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: SPACING.XL,
  },
  modalTitle: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_3XL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.XL,
  },
  modalInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.MD,
    padding: SPACING.MD,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    marginBottom: SPACING.MD,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.MD,
    marginTop: SPACING.LG,
  },
  modalCancelButton: {
    flex: 1,
    padding: SPACING.MD,
    borderRadius: RADIUS.MD,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalCancelText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  modalCreateButton: {
    flex: 1,
    borderRadius: RADIUS.MD,
    overflow: 'hidden',
  },
  modalCreateGradient: {
    padding: SPACING.MD,
    alignItems: 'center',
  },
  modalCreateText: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE_LG, // H2
    fontWeight: TYPOGRAPHY.FONT_WEIGHT_BOLD,
    color: COLORS.BLACK,
  },
  bottomPadding: {
    height: SPACING.XXL,
  },
});

export default CreatorDashboardScreen;
