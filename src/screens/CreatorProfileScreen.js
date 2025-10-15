import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import dummyData from '../data/dummyData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CreatorProfileScreen = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const { creator } = route.params || {};
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Use passed creator data or fallback to first creator
  const currentCreator = creator || dummyData.creators[0];
  const isOwnProfile = user?.id === currentCreator?.id && user?.accountType === 'creator';

  // Ensure we have valid creator data
  if (!currentCreator) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Creator not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  useEffect(() => {
    // Check if creator is bookmarked
    if (user?.id && dummyData.bookmarks) {
      const userBookmarks = dummyData.bookmarks.filter(b => b.userId === user.id);
      setIsBookmarked(userBookmarks.some(b => b.creatorId === currentCreator.id));
    }
  }, [currentCreator.id, user?.id]);

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
      maximumFractionDigits: 2,
    }).format(amount).replace('.00', '');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      'Bookmark',
      isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
      [{ text: 'OK' }]
    );
  };

  const handleBidOrAuction = () => {
    navigation.navigate('AuctionRoom', { creator: currentCreator });
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    // If can't go back, stay on profile
  };

  // Categories data
  const categories = [
    { id: 1, name: 'Randoms.✨', image: 'https://picsum.photos/100/100?random=cat1' },
    { id: 2, name: 'Uk 4✨', image: 'https://picsum.photos/100/100?random=cat2' },
    { id: 3, name: '👑 Exclusive', image: 'https://picsum.photos/100/100?random=cat3' },
    { id: 4, name: 'Fit check.', image: 'https://picsum.photos/100/100?random=cat4' },
    { id: 5, name: 'Sprite', image: 'https://picsum.photos/100/100?random=cat5' },
    { id: 6, name: 'Dark', image: 'https://picsum.photos/100/100?random=cat6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <View style={styles.usernameBadgeContainer}>
              <Text style={styles.usernameText}>{currentCreator.name.replace(' ', '_').toLowerCase()}</Text>
              {currentCreator.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              )}
            </View>
            <View style={styles.topRightIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.iconText}>⋮</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Header with Background */}
          <View style={styles.profileHeader}>
            {/* Blurred Background */}
            <Image 
              source={{ uri: currentCreator.profilePic }} 
              style={styles.backgroundImage}
              blurRadius={40}
            />
            <View style={styles.backgroundOverlay} />

            {/* Profile Content */}
            <View style={styles.profileContent}>
              {/* Profile Image with Gradient Border */}
              <View style={styles.profileImageWrapper}>
                <LinearGradient
                  colors={['#FFD700', '#FFA500', '#FFD700']}
                  style={styles.profileImageBorder}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image source={{ uri: currentCreator.profilePic }} style={styles.profileImage} />
                </LinearGradient>
              </View>

              {/* Creator Info */}
              <View style={styles.creatorInfoSection}>
                <Text style={styles.creatorName}>{currentCreator.name}</Text>
                
                <View style={styles.nationalityRow}>
                  <Text style={styles.nationalityLabel}>Nationality:</Text>
                  <Text style={styles.nationalityFlags}>🇳🇬 👤 🇬🇭</Text>
                </View>

                {/* Stats Row 1 */}
                <View style={styles.statsRow1}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>↓</Text>
                    <Text style={styles.statValue}>24|</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>🔖</Text>
                    <Text style={styles.statValue}>19.2M|</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>👍</Text>
                    <Text style={styles.statValue}>{formatCurrency(59240)}</Text>
                  </View>
                </View>

                {/* Stats Row 2 */}
                <View style={styles.statsRow2}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>49.3K</Text>
                    <Text style={styles.statLabel}>Live Viewers</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>100.32M</Text>
                    <Text style={styles.statLabel}>Total Posts Views</Text>
                  </View>
                </View>

                {/* Bio */}
                <Text style={styles.bioText}>
                  The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.bookmarkButton} 
              onPress={isOwnProfile ? () => Alert.alert('Edit Profile', 'Edit profile feature') : handleBookmark}
              activeOpacity={0.8}
            >
              <Text style={styles.bookmarkIcon}>🔖</Text>
              <Text style={styles.bookmarkText}>{isOwnProfile ? 'EDIT PROFILE' : 'BOOKMARK'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.bidButton} 
              onPress={handleBidOrAuction}
              activeOpacity={0.8}
            >
              <Text style={styles.bidIcon}>⚡</Text>
              <Text style={styles.bidText}>{isOwnProfile ? 'AUCTION' : 'BID'}</Text>
            </TouchableOpacity>
          </View>

          {/* Grid and Lock Icons */}
          <View style={styles.gridLockRow}>
            <TouchableOpacity 
              style={styles.gridIcon}
              onPress={() => navigation.navigate('Posts', { creator: currentCreator })}
            >
              <Text style={styles.gridIconText}>⊞</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lockIcon}>
              <Text style={styles.lockIconText}>🔒</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Grid */}
        <View style={styles.imageGrid}>
          {(currentCreator.images || []).slice(0, 6).map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => handleImagePress(image)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: image.url }} style={styles.gridImage} />
              {/* Play button for videos */}
              {index % 3 !== 0 && (
                <View style={styles.playOverlay}>
                  <View style={styles.playButton}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </View>
              )}
              {/* Stats Overlay */}
              <View style={styles.imageStatsOverlay}>
                <View style={styles.imageStatItem}>
                  <Text style={styles.imageStatIcon}>❤️</Text>
                  <Text style={styles.imageStatText}>{formatNumber(image.likes)}</Text>
                </View>
                <View style={styles.imageStatItem}>
                  <Text style={styles.imageStatIcon}>👁</Text>
                  <Text style={styles.imageStatText}>{formatNumber(image.views)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expand Arrow */}
        <View style={styles.expandSection}>
          <View style={styles.expandArrow}>
            <Text style={styles.expandIcon}>⌄</Text>
          </View>
        </View>

        {/* Category Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesCarousel}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem} activeOpacity={0.8}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={showImageModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            onPress={() => setShowImageModal(false)}
            activeOpacity={1}
          >
            {selectedImage && (
              <Image source={{ uri: selectedImage.url }} style={styles.modalImage} />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    backgroundColor: '#000000',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },
  usernameBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  usernameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  profileHeader: {
    minHeight: 300,
    position: 'relative',
    paddingBottom: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  profileContent: {
    position: 'relative',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImageWrapper: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileImageBorder: {
    width: 128,
    height: 128,
    borderRadius: 64,
    padding: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  creatorInfoSection: {
    alignItems: 'center',
  },
  creatorName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nationalityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nationalityLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginRight: 8,
  },
  nationalityFlags: {
    fontSize: 16,
  },
  statsRow1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  bioText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  bookmarkButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  bookmarkText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bidButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  bidText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridLockRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  gridIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIconText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  lockIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIconText: {
    fontSize: 24,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139,92,246,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 3,
  },
  imageStatsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(139,92,246,0.7)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  imageStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStatIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  imageStatText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  expandSection: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  expandArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandIcon: {
    color: '#8B5CF6',
    fontSize: 32,
    fontWeight: 'bold',
  },
  categoriesCarousel: {
    paddingVertical: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default CreatorProfileScreen;
