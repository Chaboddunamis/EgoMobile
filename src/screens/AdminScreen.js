import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../contexts/AuthContext';
import dummyData from '../data/dummyData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AdminScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('pending');

  // Filter creators by approval status
  const pendingCreators = dummyData.creators.filter(c => c.approvalStatus === 'pending');
  const approvedCreators = dummyData.creators.filter(c => c.approvalStatus === 'approved');
  const rejectedCreators = dummyData.creators.filter(c => c.approvalStatus === 'rejected');

  // Platform stats
  const totalUsers = dummyData.creators.length + dummyData.viewers.length;
  const totalTransactions = dummyData.transactions.length;
  const totalRevenue = dummyData.transactions.reduce((sum, t) => sum + t.amount, 0);
  const activeBids = dummyData.bids.filter(b => b.status === 'active').length;

  const handleApproveCreator = (creatorId) => {
    Alert.alert(
      'Approve Creator',
      'Are you sure you want to approve this creator?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            // In a real app, this would make an API call
            Alert.alert('Success', 'Creator has been approved!');
          },
        },
      ]
    );
  };

  const handleRejectCreator = (creatorId) => {
    Alert.alert(
      'Reject Creator',
      'Are you sure you want to reject this creator?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would make an API call
            Alert.alert('Success', 'Creator has been rejected.');
          },
        },
      ]
    );
  };

  const renderStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Platform Overview</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalUsers}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{dummyData.creators.length}</Text>
          <Text style={styles.statLabel}>Creators</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalRevenue.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeBids}</Text>
          <Text style={styles.statLabel}>Active Bids</Text>
        </View>
      </View>

      <View style={styles.quickStats}>
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{pendingCreators.length}</Text>
          <Text style={styles.quickStatLabel}>Pending Approvals</Text>
        </View>
        
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{approvedCreators.length}</Text>
          <Text style={styles.quickStatLabel}>Approved Creators</Text>
        </View>
        
        <View style={styles.quickStatItem}>
          <Text style={styles.quickStatValue}>{totalTransactions}</Text>
          <Text style={styles.quickStatLabel}>Total Transactions</Text>
        </View>
      </View>
    </View>
  );

  const renderCreatorCard = (creator, showActions = false) => (
    <View key={creator.id} style={styles.creatorCard}>
      <View style={styles.creatorHeader}>
        <Image source={{ uri: creator.profilePic }} style={styles.creatorAvatar} />
        <View style={styles.creatorInfo}>
          <Text style={styles.creatorName}>{creator.name}</Text>
          <Text style={styles.creatorDetails}>Age: {creator.age} • {creator.country}</Text>
          <Text style={styles.creatorStats}>
            {creator.followers.toLocaleString()} followers • ${creator.totalEarnings.toLocaleString()} earned
          </Text>
        </View>
      </View>
      
      <Text style={styles.creatorBio} numberOfLines={2}>{creator.bio}</Text>
      
      <View style={styles.verificationInfo}>
        <Text style={styles.verificationLabel}>Gender Verification:</Text>
        <View style={[styles.verificationBadge, { backgroundColor: creator.genderVerified ? '#10B981' : '#EF4444' }]}>
          <Text style={styles.verificationText}>
            {creator.genderVerified ? 'Verified' : 'Not Verified'}
          </Text>
        </View>
      </View>
      
      {showActions && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleApproveCreator(creator.id)}
          >
            <Text style={styles.actionButtonText}>Approve</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRejectCreator(creator.id)}
          >
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {creator.approvalStatus === 'approved' && (
        <View style={styles.approvedBadge}>
          <Text style={styles.approvedText}>✓ Approved</Text>
        </View>
      )}
      
      {creator.approvalStatus === 'rejected' && (
        <View style={styles.rejectedBadge}>
          <Text style={styles.rejectedText}>✗ Rejected</Text>
        </View>
      )}
    </View>
  );

  const renderPendingCreators = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pending Approvals ({pendingCreators.length})</Text>
      
      {pendingCreators.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No pending approvals</Text>
          <Text style={styles.emptySubtext}>All creator applications have been reviewed</Text>
        </View>
      ) : (
        pendingCreators.map(creator => renderCreatorCard(creator, true))
      )}
    </View>
  );

  const renderApprovedCreators = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Approved Creators ({approvedCreators.length})</Text>
      
      {approvedCreators.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No approved creators</Text>
          <Text style={styles.emptySubtext}>Approved creators will appear here</Text>
        </View>
      ) : (
        approvedCreators.map(creator => renderCreatorCard(creator, false))
      )}
    </View>
  );

  const renderRejectedCreators = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Rejected Applications ({rejectedCreators.length})</Text>
      
      {rejectedCreators.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No rejected applications</Text>
          <Text style={styles.emptySubtext}>Rejected applications will appear here</Text>
        </View>
      ) : (
        rejectedCreators.map(creator => renderCreatorCard(creator, false))
      )}
    </View>
  );

  // Check if user is admin
  if (user?.accountType !== 'admin') {
    return (
      <LinearGradient colors={['#8B5CF6', '#A855F7', '#C084FC']} style={styles.container}>
        <View style={styles.accessDenied}>
          <Text style={styles.accessDeniedTitle}>Access Denied</Text>
          <Text style={styles.accessDeniedText}>You don't have permission to access this page.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#8B5CF6', '#A855F7', '#C084FC']} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage creators and platform</Text>
        </View>

        {renderStats()}

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
            onPress={() => setActiveTab('pending')}
          >
            <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
              Pending ({pendingCreators.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'approved' && styles.activeTab]}
            onPress={() => setActiveTab('approved')}
          >
            <Text style={[styles.tabText, activeTab === 'approved' && styles.activeTabText]}>
              Approved ({approvedCreators.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'rejected' && styles.activeTab]}
            onPress={() => setActiveTab('rejected')}
          >
            <Text style={[styles.tabText, activeTab === 'rejected' && styles.activeTabText]}>
              Rejected ({rejectedCreators.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'pending' && renderPendingCreators()}
          {activeTab === 'approved' && renderApprovedCreators()}
          {activeTab === 'rejected' && renderRejectedCreators()}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 100,
  },
  creatorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  creatorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  creatorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  creatorDetails: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 4,
  },
  creatorStats: {
    fontSize: 12,
    color: '#10B981',
  },
  creatorBio: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 12,
    lineHeight: 20,
  },
  verificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  verificationLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  verificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verificationText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approvedBadge: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  approvedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rejectedBadge: {
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  rejectedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminScreen;

