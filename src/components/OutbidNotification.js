import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const OutbidNotification = ({
  visible,
  onClose,
  auctionData,
  onUpdateBid,
  onViewAuction
}) => {
  const { width, height } = useWindowDimensions();
  const [showUpdateBid, setShowUpdateBid] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState('');
  const slideAnim = useRef(new Animated.Value(height)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Slide up animation
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      // Pulse animation for urgency
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Auto-close after 10 seconds if not interacted with
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, 10000);

      return () => clearTimeout(autoCloseTimer);
    } else {
      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleUpdateBid = () => {
    if (!newBidAmount || isNaN(newBidAmount)) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
      return;
    }

    const bidValue = parseFloat(newBidAmount);
    const minimumBid = (auctionData?.currentBid || 0) + 1;

    if (bidValue < minimumBid) {
      Alert.alert(
        'Bid Too Low', 
        `Your bid must be at least $${minimumBid.toLocaleString()}.`
      );
      return;
    }

    onUpdateBid(bidValue);
    handleClose();
  };

  const handleViewAuction = () => {
    onViewAuction();
    handleClose();
  };

  if (!visible || !auctionData) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateY: slideAnim },
                { scale: pulseAnim }
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53', '#FF6B6B']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.alertIcon}>⚠️</Text>
              <Text style={styles.title}>You've Been Outbid!</Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Auction Info */}
            <View style={styles.auctionInfo}>
              <Text style={styles.auctionTitle}>{auctionData.title}</Text>
              <Text style={styles.creatorName}>by {auctionData.creatorName}</Text>
              
              <View style={styles.bidInfo}>
                <View style={styles.bidRow}>
                  <Text style={styles.bidLabel}>Your Previous Bid:</Text>
                  <Text style={styles.previousBid}>${auctionData.yourBid?.toLocaleString()}</Text>
                </View>
                <View style={styles.bidRow}>
                  <Text style={styles.bidLabel}>New Leading Bid:</Text>
                  <Text style={styles.currentBid}>${auctionData.currentBid?.toLocaleString()}</Text>
                </View>
                <View style={styles.bidRow}>
                  <Text style={styles.bidLabel}>Time Remaining:</Text>
                  <Text style={styles.timeRemaining}>{auctionData.timeLeft}</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.updateBidButton}
                onPress={() => setShowUpdateBid(!showUpdateBid)}
              >
                <Text style={styles.updateBidButtonText}>
                  💰 Update My Bid
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewAuctionButton}
                onPress={handleViewAuction}
              >
                <Text style={styles.viewAuctionButtonText}>
                  👁️ View Auction
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Bid Update */}
            {showUpdateBid && (
              <View style={styles.quickBidSection}>
                <Text style={styles.quickBidTitle}>Quick Bid Update</Text>
                
                {/* Suggested Bid Amounts */}
                <View style={styles.suggestedBids}>
                  {[50, 100, 250, 500].map((increment) => {
                    const suggestedBid = (auctionData.currentBid || 0) + increment;
                    return (
                      <TouchableOpacity
                        key={increment}
                        style={styles.suggestedBidButton}
                        onPress={() => {
                          setNewBidAmount(suggestedBid.toString());
                          handleUpdateBid();
                        }}
                      >
                        <Text style={styles.suggestedBidText}>
                          +${increment}
                        </Text>
                        <Text style={styles.suggestedBidAmount}>
                          ${suggestedBid.toLocaleString()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Custom Bid Input */}
                <View style={styles.customBidSection}>
                  <Text style={styles.customBidLabel}>Or enter custom amount:</Text>
                  <View style={styles.customBidRow}>
                    <TextInput
                      style={styles.customBidInput}
                      placeholder={`Min: $${((auctionData.currentBid || 0) + 1).toLocaleString()}`}
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      value={newBidAmount}
                      onChangeText={setNewBidAmount}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={styles.customBidSubmit}
                      onPress={handleUpdateBid}
                    >
                      <Text style={styles.customBidSubmitText}>Bid</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {/* Urgency Indicator */}
            <View style={styles.urgencyIndicator}>
              <Text style={styles.urgencyText}>
                🔥 Act fast! This auction is competitive
              </Text>
            </View>

            {/* Dismiss Options */}
            <View style={styles.dismissOptions}>
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={handleClose}
              >
                <Text style={styles.dismissButtonText}>Maybe Later</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.snoozeButton}
                onPress={() => {
                  // Snooze for 5 minutes
                  setTimeout(() => {
                    // In a real app, this would check if still outbid
                    // and show notification again if needed
                  }, 5 * 60 * 1000);
                  handleClose();
                }}
              >
                <Text style={styles.snoozeButtonText}>Snooze 5min</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: SCREEN_HEIGHT * 0.8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  alertIcon: {
    fontSize: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  auctionInfo: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  auctionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  creatorName: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 15,
  },
  bidInfo: {
    gap: 8,
  },
  bidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  previousBid: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentBid: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeRemaining: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  updateBidButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  updateBidButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewAuctionButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  viewAuctionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quickBidSection: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  quickBidTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  suggestedBids: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  suggestedBidButton: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  suggestedBidText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestedBidAmount: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 2,
  },
  customBidSection: {
    marginTop: 10,
  },
  customBidLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 8,
  },
  customBidRow: {
    flexDirection: 'row',
    gap: 10,
  },
  customBidInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  customBidSubmit: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  customBidSubmitText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  urgencyIndicator: {
    backgroundColor: 'rgba(255,107,107,0.2)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  urgencyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dismissOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  dismissButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  dismissButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  snoozeButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  snoozeButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
});

export default OutbidNotification;

