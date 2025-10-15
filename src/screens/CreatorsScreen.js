import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import ProfessionalHeader from '../components/ProfessionalHeader';
import dummyData from '../data/dummyData';

const CreatorsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortBy, setSortBy] = useState('Name');
  const [showSortModal, setShowSortModal] = useState(false);
  const [filteredCreators, setFilteredCreators] = useState(dummyData.creators || []);

  const sortOptions = [
    'Name',
    'Nationality',
    'Live viewers',
    'Bookmarkers',
    'Total Earnings',
    'Total Posts Views'
  ];

  useEffect(() => {
    filterAndSortCreators();
  }, [searchQuery, selectedCountry, sortBy]);

  const filterAndSortCreators = () => {
    if (!dummyData.creators) return;
    
    let filtered = dummyData.creators.filter(creator => {
      const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (creator.nationality || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = !selectedCountry || (creator.nationality || '').toLowerCase().includes(selectedCountry.toLowerCase());
      return matchesSearch && matchesCountry;
    });

    // Sort creators
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Name':
          return a.name.localeCompare(b.name);
        case 'Nationality':
          return (a.nationality || '').localeCompare(b.nationality || '');
        case 'Live viewers':
          return (b.liveViewers || 0) - (a.liveViewers || 0);
        case 'Bookmarkers':
          return (b.bookmarks || 0) - (a.bookmarks || 0);
        case 'Total Earnings':
          return (b.earnings || 0) - (a.earnings || 0);
        case 'Total Posts Views':
          return (b.totalViews || 0) - (a.totalViews || 0);
        default:
          return 0;
      }
    });

    setFilteredCreators(filtered);
  };

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const checkViewerClearance = (creator) => {
    return { canView: true };
  };

  const handleCreatorPress = (creator) => {
    const clearance = checkViewerClearance(creator);
    
    if (!clearance.canView) {
      Alert.alert('Access Restricted', clearance.message);
      return;
    }
    
    // Navigate to creator profile with creator data
    navigation.navigate('CreatorProfile', { creator });
  };

  const handleViewPress = (creator) => {
    handleCreatorPress(creator);
  };

  const renderCreatorCard = (creator, index) => (
    <TouchableOpacity
      key={creator.id || index}
      style={styles.creatorCard}
      onPress={() => handleCreatorPress(creator)}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: creator.profilePic }}
        style={styles.creatorBackground}
        imageStyle={styles.creatorBackgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.creatorGradient}
        >
          {/* Creator Profile Section */}
          <View style={styles.creatorHeader}>
            <View style={styles.creatorProfileContainer}>
              <Image source={{ uri: creator.profilePic }} style={styles.creatorProfileImage} />
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.creatorProfileBorder}
              />
            </View>
            
            <View style={styles.creatorInfo}>
              <View style={styles.creatorNameContainer}>
                <Text style={styles.creatorName}>{creator.name}</Text>
                {creator.verified && (
                  <Text style={styles.verifiedBadge}>✓</Text>
                )}
                <TouchableOpacity style={styles.lockIcon} activeOpacity={0.8}>
                  <Text style={styles.lockIconText}>🔒</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.nationalityContainer}>
                <Text style={styles.nationalityLabel}>Nationality:</Text>
                <Text style={styles.nationalityFlag}>{creator.nationality || '🇳🇬'}</Text>
                <Text style={styles.locationIcons}>🏠🏠</Text>
              </View>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>📥</Text>
                <Text style={styles.statNumber}>{formatNumber(creator.downloads || 121)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🔖</Text>
                <Text style={styles.statNumber}>{formatNumber(creator.bookmarks || 1200000)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>💰</Text>
                <Text style={styles.statNumber}>{formatCurrency(creator.earnings || 9240)}</Text>
              </View>
            </View>

            <View style={styles.statsRowLarge}>
              <View style={styles.statItemLarge}>
                <Text style={styles.statNumberLarge}>{formatNumber(creator.liveViewers || 19100)}</Text>
                <Text style={styles.statLabel}>Live Viewers</Text>
              </View>
              <View style={styles.statItemLarge}>
                <Text style={styles.statNumberLarge}>{formatNumber(creator.totalViews || 10170000)}</Text>
                <Text style={styles.statLabel}>Total Posts Views</Text>
              </View>
            </View>
          </View>

          {/* Bio Section */}
          <View style={styles.bioSection}>
            <Text style={styles.bioText} numberOfLines={2}>
              {creator.bio || 'Traditional textile artist and fashion designer preserving African heritage through modern designs.'}
            </Text>
          </View>

          {/* View Button */}
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewPress(creator)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.viewButtonGradient}
            >
              <Text style={styles.viewButtonText}>VIEW</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGradient}>
        {/* Header */}
        <View style={styles.simpleHeader}>
          <Text style={styles.headerTitle}>Creators</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.headerIcon}
              onPress={() => Alert.alert('Notifications', 'No new notifications.')}
            >
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerIcon}
              onPress={() => Alert.alert('Menu', 'Menu options')}
            >
              <Text style={styles.iconText}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setShowSortModal(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.sortButtonText}>⌄</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.searchInput}
              placeholder="Ghana"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            
            <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Creators List */}
        <ScrollView
          style={styles.creatorsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.creatorsListContent}
        >
          {filteredCreators.map((creator, index) => renderCreatorCard(creator, index))}
        </ScrollView>

        {/* Sort Modal */}
        <Modal
          visible={showSortModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSortModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sort by</Text>
                <TouchableOpacity
                  onPress={() => setShowSortModal(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCloseButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.sortOptions}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.sortOption, sortBy === option && styles.selectedSortOption]}
                    onPress={() => {
                      setSortBy(option);
                      setShowSortModal(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.sortOptionText, sortBy === option && styles.selectedSortOptionText]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundGradient: {
    flex: 1,
    backgroundColor: '#000000',
  },
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    fontSize: 20,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  sortButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sortButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 10,
  },
  searchButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  creatorsList: {
    flex: 1,
  },
  creatorsListContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  creatorCard: {
    height: 400,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  creatorBackground: {
    flex: 1,
  },
  creatorBackgroundImage: {
    resizeMode: 'cover',
  },
  creatorGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  creatorProfileContainer: {
    position: 'relative',
    marginRight: 15,
  },
  creatorProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  creatorProfileBorder: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 43,
    zIndex: -1,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  creatorName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  verifiedBadge: {
    color: '#00FF00',
    fontSize: 16,
    marginLeft: 5,
    marginRight: 10,
  },
  lockIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIconText: {
    fontSize: 12,
  },
  nationalityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nationalityLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginRight: 8,
  },
  nationalityFlag: {
    fontSize: 16,
    marginRight: 8,
  },
  locationIcons: {
    fontSize: 14,
  },
  statsSection: {
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsRowLarge: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItemLarge: {
    alignItems: 'center',
    flex: 1,
  },
  statNumberLarge: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  bioSection: {
    marginVertical: 15,
  },
  bioText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  },
  viewButton: {
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    width: 120,
  },
  viewButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sortOptions: {
    paddingHorizontal: 20,
  },
  sortOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  selectedSortOption: {
    backgroundColor: 'rgba(138,43,226,0.2)',
  },
  sortOptionText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  selectedSortOptionText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default CreatorsScreen;

