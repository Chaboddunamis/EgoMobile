import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Alert,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import dummyData from '../data/dummyData';

const AuctionRoomScreen = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const { creator, creatorId } = route.params || {};
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState({ minutes: 50, seconds: 21 });
  const [bids, setBids] = useState({});

  // Find creator data
  const creatorData = creator || dummyData.creators.find(c => c.id === creatorId);

  if (!creatorData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Creator not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Auction items data
  const auctionItems = [
    {
      id: 1,
      title: 'GO ON A DATE WITH ME',
      description: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      startingBid: 5000,
      maxBid: 250000,
    },
    {
      id: 2,
      title: 'ITEM 2',
      description: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      startingBid: 3000,
      maxBid: 250000,
    },
    {
      id: 3,
      title: 'ITEM 3',
      description: 'The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.',
      startingBid: 2500,
      maxBid: 250000,
    },
  ];

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    // If can't go back, stay on auction room
  };

  const handlePlaceBid = (itemId, bidAmount) => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please log in to place a bid.');
      return;
    }

    if (user.accountType === 'creator') {
      Alert.alert('Creator Account', 'Creators cannot place bids. Switch to a viewer account to bid.');
      return;
    }

    // Update local bid state
    setBids(prev => ({ ...prev, [itemId]: bidAmount }));

    // Add bid to dummy data for tracking
    const newBid = {
      id: Date.now(),
      userId: user.id,
      creatorId: creatorData.id,
      creatorName: creatorData.name,
      item: auctionItems.find(item => item.id === itemId)?.title || 'Unknown Item',
      amount: bidAmount,
      status: 'active',
      timestamp: new Date().toISOString(),
      type: 'bid',
    };

    dummyData.bids.push(newBid);

    Alert.alert(
      'Bid Placed Successfully!',
      `Your bid of $${bidAmount.toLocaleString()} has been placed.`,
      [
        { text: 'OK', style: 'default' },
        { 
          text: 'View Dashboard', 
          onPress: () => {
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`;
  };

  const AuctionItemCard = ({ item }) => {
    const startingBid = item.startingBid || 1000;
    const [sliderValue, setSliderValue] = useState(startingBid);
    const maxBid = item.maxBid || 250000;

    return (
      <View style={styles.auctionItem}>
        {/* Item Title */}
        <Text style={styles.itemTitle}>{item.title}</Text>
        
        {/* Item Description */}
        <Text style={styles.itemDescription}>{item.description}</Text>
        
        {/* Starting Bid Label */}
        <Text style={styles.startingBidLabel}>Starting Bid: {formatCurrency(startingBid)}</Text>

        {/* Bid Section */}
        <View style={styles.bidSection}>
          {/* Purple Square */}
          <View style={styles.purpleSquare} />
          
          {/* Slider */}
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={startingBid}
              maximumValue={maxBid}
              value={sliderValue}
              onValueChange={setSliderValue}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.3)"
              thumbTintColor="#8B5CF6"
            />
            <View style={styles.bidAmountContainer}>
              <Text style={styles.bidAmount}>{formatCurrency(Math.round(sliderValue))}</Text>
            </View>
          </View>
          
          {/* Place Bid Button */}
          <TouchableOpacity
            style={styles.placeBidButton}
            onPress={() => handlePlaceBid(item.id, Math.round(sliderValue))}
            activeOpacity={0.8}
          >
            <Text style={styles.placeBidText}>PLACE BID</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Auction Room</Text>
        <View style={styles.headerRight}>
          <Image 
            source={{ uri: creatorData?.profilePic || 'https://picsum.photos/100/100?random=user' }}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerUsername}>ugobekee_23</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Text style={styles.bookmarkIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Auction Rules Section */}
        <View style={styles.rulesSection}>
          <Text style={styles.sectionTitle}>AUCTION RULES</Text>
          <Text style={styles.rulesDescription}>
            The icon Instagram uses on a multi-photo or video post (also known as a carousel) is a small stack of overlapping squares located in the top right corner of the post.
          </Text>
          
          {/* Timer */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>⏰</Text>
            <Text style={styles.timerText}>
              Auction Duration Countdown: {timeLeft.minutes} mins: {timeLeft.seconds.toString().padStart(2, '0')} secs
            </Text>
          </View>
        </View>

        {/* Auction Items */}
        {auctionItems.map((item) => (
          <AuctionItemCard key={item.id} item={item} />
        ))}

        {/* Auction History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historySectionTitle}>AUCTION HISTORY</Text>
          <Text style={styles.noDataText}>No Data</Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 16,
  },
  headerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  headerUsername: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  rulesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  rulesDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  timerText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  auctionItem: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
  },
  itemTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  startingBidLabel: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  bidSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  purpleSquare: {
    width: 48,
    height: 48,
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
  },
  sliderContainer: {
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  bidAmountContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bidAmount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  placeBidButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  placeBidText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
  historySection: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  historySectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noDataText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default AuctionRoomScreen;
