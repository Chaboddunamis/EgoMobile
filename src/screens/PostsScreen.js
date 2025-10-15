import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PostsScreen = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const { creator, creatorId } = route.params || {};
  const { user } = useAuth();
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  // Posts data matching the design
  const posts = [
    {
      id: 1,
      creatorName: 'ugobekee_23',
      creatorAvatar: 'https://picsum.photos/100/100?random=creator1',
      isVerified: true,
      image: 'https://picsum.photos/600/900?random=post1',
      isVideo: true,
      likes: 800,
      views: 9900,
      caption: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      date: '25 July 2025',
    },
    {
      id: 2,
      creatorName: 'ugobekee_23',
      creatorAvatar: 'https://picsum.photos/100/100?random=creator1',
      isVerified: true,
      image: 'https://picsum.photos/600/900?random=post2',
      isVideo: false,
      likes: 2400000,
      views: 36800000,
      caption: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      date: '23 July 2025',
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleLikePost = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const renderPost = (post) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.creatorInfo}>
          <Image source={{ uri: post.creatorAvatar }} style={styles.creatorAvatar} />
          <View style={styles.creatorDetails}>
            <View style={styles.creatorNameRow}>
              <Text style={styles.creatorName}>{post.creatorName}</Text>
              {post.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Post Image/Video */}
      <TouchableOpacity
        style={styles.postImageContainer}
        onPress={() => openPostModal(post)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: post.image }} style={styles.postImage} />

        {/* Carousel Indicator Icon (Top Right Corner) */}
        <View style={styles.carouselIndicator}>
          <View style={styles.carouselIconStack}>
            <View style={[styles.carouselSquare, styles.carouselSquare1]} />
            <View style={[styles.carouselSquare, styles.carouselSquare2]} />
            <View style={[styles.carouselSquare, styles.carouselSquare3]} />
          </View>
        </View>

        {/* Video Play Button */}
        {post.isVideo && (
          <View style={styles.playButtonOverlay}>
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Post Info Section */}
      <View style={styles.postInfoSection}>
        {/* Stats */}
        <View style={styles.postStats}>
          <TouchableOpacity 
            style={styles.statItem}
            onPress={() => handleLikePost(post.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.statIcon}>❤️</Text>
            <Text style={styles.statText}>{formatNumber(post.likes)}</Text>
          </TouchableOpacity>
          
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>👁️</Text>
            <Text style={styles.statText}>{formatNumber(post.views)}</Text>
          </View>
        </View>

        {/* Caption */}
        <View style={styles.postCaption}>
          <Text style={styles.captionText}>{post.caption}</Text>
        </View>

        {/* Date */}
        <View style={styles.postDate}>
          <Text style={styles.dateText}>{post.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={styles.bookmarkIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {posts.map(renderPost)}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Post Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          
          {selectedPost && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedPost.image }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              
              {/* Modal Stats */}
              <View style={styles.modalStats}>
                <TouchableOpacity 
                  style={styles.modalStatItem}
                  onPress={() => handleLikePost(selectedPost.id)}
                >
                  <Text style={styles.modalStatIcon}>
                    {likedPosts.has(selectedPost.id) ? '❤️' : '🤍'}
                  </Text>
                  <Text style={styles.modalStatText}>
                    {formatNumber(selectedPost.likes)} likes
                  </Text>
                </TouchableOpacity>
                
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatIcon}>👁️</Text>
                  <Text style={styles.modalStatText}>
                    {formatNumber(selectedPost.views)} views
                  </Text>
                </View>
              </View>
              
              {/* Modal Caption */}
              <View style={styles.modalCaption}>
                <Text style={styles.modalCaptionText}>{selectedPost.caption}</Text>
              </View>
            </View>
          )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
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
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#000000',
    marginBottom: 0,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 6,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  postImageContainer: {
    width: '100%',
    aspectRatio: 2/3,
    position: 'relative',
    backgroundColor: '#1A1A1A',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  carouselIconStack: {
    position: 'relative',
    width: 28,
    height: 28,
  },
  carouselSquare: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  carouselSquare1: {
    top: 0,
    right: 0,
    zIndex: 3,
  },
  carouselSquare2: {
    top: 4,
    right: 4,
    zIndex: 2,
    opacity: 0.7,
  },
  carouselSquare3: {
    top: 8,
    right: 8,
    zIndex: 1,
    opacity: 0.4,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(139,92,246,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    marginLeft: 4,
  },
  postInfoSection: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  postCaption: {
    marginBottom: 8,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  postDate: {
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '300',
  },
  modalContent: {
    alignItems: 'center',
    width: '90%',
  },
  modalImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.6,
  },
  modalStats: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  modalStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  modalStatIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  modalStatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCaption: {
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    maxWidth: '90%',
  },
  modalCaptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default PostsScreen;
