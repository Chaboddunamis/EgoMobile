import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanGestureHandler,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { PanGestureHandler as RNGHPanGestureHandler, State } from 'react-native-gesture-handler';

const DraggableBidSlider = ({
  minBid = 50, // Base minimum of $50
  maxBid = 250000, // Updated to match specs ($250K max)
  currentBid = 0,
  onBidChange,
  onBidSubmit,
  disabled = false
}) => {
  const { width } = useWindowDimensions();
  // Calculate dynamic minimum bid: higher of base minimum ($50) or current bid + $1
  const dynamicMinBid = Math.max(minBid, currentBid + 1);
  const [bidAmount, setBidAmount] = useState(dynamicMinBid + 50); // Start $50 above minimum
  const [customBidInput, setCustomBidInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const sliderWidth = width - 80; // Account for padding
  const knobSize = 40;
  const trackHeight = 60;

  const calculateBidFromPosition = (position) => {
    const percentage = Math.max(0, Math.min(1, position / (sliderWidth - knobSize)));
    const range = maxBid - dynamicMinBid;
    return Math.round(dynamicMinBid + (percentage * range));
  };

  const calculatePositionFromBid = (bid) => {
    const range = maxBid - dynamicMinBid;
    const percentage = (bid - dynamicMinBid) / range;
    return percentage * (sliderWidth - knobSize);
  };

  const updateBidAmount = (newBid) => {
    setBidAmount(newBid);
    const newPosition = calculatePositionFromBid(newBid);
    
    Animated.spring(translateX, {
      toValue: newPosition,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
    
    onBidChange && onBidChange(newBid);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { 
      useNativeDriver: false,
      listener: (event) => {
        const newPosition = Math.max(0, Math.min(sliderWidth - knobSize, event.nativeEvent.translationX));
        const newBid = calculateBidFromPosition(newPosition);
        setBidAmount(newBid);
        onBidChange && onBidChange(newBid);
      }
    }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const finalPosition = Math.max(0, Math.min(sliderWidth - knobSize, event.nativeEvent.translationX));
      
      Animated.spring(translateX, {
        toValue: finalPosition,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  const handleQuickBid = (amount) => {
    const newBid = currentBid + amount;
    if (newBid <= maxBid) {
      updateBidAmount(newBid);
    } else {
      Alert.alert('Bid Too High', `Maximum bid is $${maxBid.toLocaleString()}`);
    }
  };

  const handleCustomBidSubmit = () => {
    const customAmount = parseFloat(customBidInput.replace(/[^0-9.]/g, ''));
    
    if (isNaN(customAmount) || customAmount <= 0) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount.');
      return;
    }

    if (customAmount < dynamicMinBid) {
      Alert.alert('Bid Too Low', `Your bid must be at least $${dynamicMinBid.toLocaleString()}.`);
      return;
    }

    if (customAmount > maxBid) {
      Alert.alert('Bid Too High', `Maximum bid is $${maxBid.toLocaleString()}.`);
      return;
    }

    updateBidAmount(customAmount);
    setCustomBidInput('');
    setShowCustomInput(false);
    Alert.alert('Bid Updated', `Your bid has been set to $${customAmount.toLocaleString()}.`);
  };

  const handleSubmitBid = () => {
    if (bidAmount >= dynamicMinBid && !disabled) {
      onBidSubmit && onBidSubmit(bidAmount);
    }
  };

  const getBidColor = () => {
    if (bidAmount < dynamicMinBid) return '#FF6B6B';
    if (bidAmount < dynamicMinBid + 100) return '#FF9800';
    if (bidAmount < dynamicMinBid + 500) return '#FFD700';
    return '#4CAF50';
  };

  const getBidStatus = () => {
    if (bidAmount < dynamicMinBid) return 'Bid too low';
    if (bidAmount < dynamicMinBid + 100) return 'Minimum bid';
    if (bidAmount < dynamicMinBid + 500) return 'Good bid';
    return 'Excellent bid';
  };

  return (
    <View style={[styles.container, disabled && styles.containerDisabled]}>
      {/* Hidden Bid Info */}
      <View style={styles.hiddenBidInfo}>
        <Text style={styles.hiddenBidText}>
          🔒 Current highest bid is hidden for competitive bidding
        </Text>
      </View>

      {/* Current Bid Display */}
      <View style={styles.bidDisplay}>
        <Text style={styles.bidLabel}>Your Bid Amount</Text>
        <Text style={[styles.bidAmount, { color: getBidColor() }]}>
          ${bidAmount.toLocaleString()}
        </Text>
        <Text style={[styles.bidStatus, { color: getBidColor() }]}>
          {getBidStatus()}
        </Text>
      </View>

      {/* Quick Bid Buttons */}
      <View style={styles.quickBidContainer}>
        <Text style={styles.quickBidLabel}>Quick Add:</Text>
        <View style={styles.quickBidButtons}>
          <TouchableOpacity
            style={styles.quickBidButton}
            onPress={() => handleQuickBid(50)}
            disabled={disabled}
          >
            <Text style={styles.quickBidButtonText}>+$50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBidButton}
            onPress={() => handleQuickBid(100)}
            disabled={disabled}
          >
            <Text style={styles.quickBidButtonText}>+$100</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBidButton}
            onPress={() => handleQuickBid(250)}
            disabled={disabled}
          >
            <Text style={styles.quickBidButtonText}>+$250</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBidButton}
            onPress={() => handleQuickBid(500)}
            disabled={disabled}
          >
            <Text style={styles.quickBidButtonText}>+$500</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Bid Input */}
      <View style={styles.customBidContainer}>
        <TouchableOpacity
          style={styles.customBidToggle}
          onPress={() => setShowCustomInput(!showCustomInput)}
          disabled={disabled}
        >
          <Text style={styles.customBidToggleText}>
            {showCustomInput ? '✕ Cancel Custom Bid' : '✎ Enter Custom Amount'}
          </Text>
        </TouchableOpacity>
        
        {showCustomInput && (
          <View style={styles.customBidInputContainer}>
            <TextInput
              style={styles.customBidInput}
              value={customBidInput}
              onChangeText={setCustomBidInput}
              placeholder={`Min: $${dynamicMinBid.toLocaleString()}`}
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="numeric"
              maxLength={10}
            />
            <TouchableOpacity
              style={styles.customBidSubmit}
              onPress={handleCustomBidSubmit}
            >
              <Text style={styles.customBidSubmitText}>SET</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Draggable Slider */}
      <View style={styles.sliderContainer}>
        <View style={[styles.sliderTrack, { width: sliderWidth }]}>
          {/* Progress Fill */}
          <Animated.View
            style={[
              styles.sliderFill,
              {
                width: Animated.add(translateX, knobSize),
                backgroundColor: getBidColor(),
              },
            ]}
          />
          
          {/* Draggable Knob */}
          <RNGHPanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            enabled={!disabled}
          >
            <Animated.View
              style={[
                styles.sliderKnob,
                {
                  transform: [{ translateX }],
                  backgroundColor: getBidColor(),
                },
                disabled && styles.sliderKnobDisabled,
              ]}
            >
              <Text style={styles.knobIcon}>💰</Text>
            </Animated.View>
          </RNGHPanGestureHandler>
        </View>
        
        {/* Slider Labels */}
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>Min: ${dynamicMinBid.toLocaleString()}</Text>
          <Text style={styles.sliderLabel}>Max: ${maxBid.toLocaleString()}</Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          bidAmount < dynamicMinBid && styles.submitButtonDisabled,
          disabled && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmitBid}
        disabled={bidAmount < dynamicMinBid || disabled}
      >
        <Text style={[
          styles.submitButtonText,
          (bidAmount < dynamicMinBid || disabled) && styles.submitButtonTextDisabled,
        ]}>
          {disabled ? 'Auction Ended' : `Place Bid - $${bidAmount.toLocaleString()}`}
        </Text>
      </TouchableOpacity>

      {/* Bid Guidelines */}
      <View style={styles.guidelines}>
        <Text style={styles.guidelinesTitle}>Bidding Guidelines:</Text>
        <Text style={styles.guidelinesText}>
          • Drag the slider or use quick add buttons{'\n'}
          • Enter custom amounts for precise bidding{'\n'}
          • You'll be notified if someone outbids you{'\n'}
          • Higher bids have better chances of winning{'\n'}
          • Only the highest bid across ALL items wins
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  hiddenBidInfo: {
    backgroundColor: 'rgba(255,152,0,0.2)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,152,0,0.3)',
  },
  hiddenBidText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  bidDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bidLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 5,
  },
  bidAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bidStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickBidContainer: {
    marginBottom: 20,
  },
  quickBidLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  quickBidButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickBidButton: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  quickBidButtonText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  customBidContainer: {
    marginBottom: 20,
  },
  customBidToggle: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    marginBottom: 10,
  },
  customBidToggleText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  customBidInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  customBidInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 0,
  },
  customBidSubmit: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  customBidSubmitText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderTrack: {
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 30,
    opacity: 0.3,
  },
  sliderKnob: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sliderKnobDisabled: {
    opacity: 0.5,
  },
  knobIcon: {
    fontSize: 16,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(255,215,0,0.3)',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonTextDisabled: {
    color: 'rgba(0,0,0,0.5)',
  },
  guidelines: {
    backgroundColor: 'rgba(76,175,80,0.1)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(76,175,80,0.2)',
  },
  guidelinesTitle: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guidelinesText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    lineHeight: 16,
  },
});

export default DraggableBidSlider;

