import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Animated,
} from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { performMockFacialScan, requestCameraPermissions } from '../utils/securityUtils';

const FacialScanModal = ({ visible, onClose, onSuccess, onError }) => {
  const { width, height } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const cameraRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      getCameraPermissions();
      startPulseAnimation();
    }
  }, [visible]);

  useEffect(() => {
    if (isScanning) {
      startProgressAnimation();
    }
  }, [isScanning]);

  const getCameraPermissions = async () => {
    const granted = await requestCameraPermissions();
    setHasPermission(granted);
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startProgressAnimation = () => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const handleStartScan = async () => {
    if (!cameraReady) {
      Alert.alert('Camera Not Ready', 'Please wait for the camera to initialize.');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);

    try {
      // In a real app, you would capture the image and process it
      // For demo purposes, we'll use the mock facial scan
      const result = await performMockFacialScan();
      
      if (result.success) {
        setIsScanning(false);
        Alert.alert(
          'Facial Verification Successful!',
          `Confidence: ${result.confidence.toFixed(1)}%\n\nYour identity has been verified.`,
          [
            {
              text: 'Continue',
              onPress: () => {
                onSuccess(result);
                onClose();
              }
            }
          ]
        );
      } else {
        setIsScanning(false);
        Alert.alert(
          'Facial Verification Failed',
          result.error,
          [
            { text: 'Try Again', onPress: () => setScanProgress(0) },
            { text: 'Cancel', onPress: onClose }
          ]
        );
      }
    } catch (error) {
      setIsScanning(false);
      onError(error.message);
    }
  };

  const renderCameraView = () => {
    if (hasPermission === null) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.statusText}>Requesting camera permission...</Text>
        </View>
      );
    }

    if (hasPermission === false) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.statusText}>Camera permission denied</Text>
          <Text style={styles.subText}>Please enable camera access in settings</Text>
          <TouchableOpacity style={styles.retryButton} onPress={getCameraPermissions}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.overlay}>
            {/* Face detection frame */}
            <Animated.View 
              style={[
                styles.faceFrame,
                {
                  transform: [{ scale: pulseAnim }],
                  borderColor: isScanning ? '#4CAF50' : '#FFD700'
                }
              ]}
            >
              {isScanning && (
                <View style={styles.scanningOverlay}>
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        top: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 200],
                        }),
                      },
                    ]}
                  />
                </View>
              )}
            </Animated.View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionTitle}>
                {isScanning ? 'Scanning...' : 'Position Your Face'}
              </Text>
              <Text style={styles.instructionText}>
                {isScanning 
                  ? 'Please hold still while we verify your identity'
                  : 'Center your face within the frame and ensure good lighting'
                }
              </Text>
            </View>

            {/* Progress indicator */}
            {isScanning && (
              <View style={styles.progressContainer}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </Camera>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <LinearGradient colors={['#8A2BE2', '#4B0082', '#2E0854']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Facial Verification</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Camera View */}
        {renderCameraView()}

        {/* Controls */}
        {hasPermission && !isScanning && (
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.scanButton, !cameraReady && styles.scanButtonDisabled]}
              onPress={handleStartScan}
              disabled={!cameraReady}
            >
              <Text style={styles.scanButtonText}>
                {cameraReady ? 'Start Facial Scan' : 'Initializing Camera...'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Text style={styles.securityTitle}>🔒 Security Notice</Text>
          <Text style={styles.securityText}>
            Your facial data is processed securely and used only for identity verification. 
            We do not store or share your biometric information.
          </Text>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceFrame: {
    width: 200,
    height: 250,
    borderWidth: 3,
    borderRadius: 100,
    borderStyle: 'dashed',
    position: 'relative',
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scanButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  scanButtonDisabled: {
    backgroundColor: 'rgba(255,215,0,0.5)',
  },
  scanButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityNotice: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  securityTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  securityText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default FacialScanModal;

