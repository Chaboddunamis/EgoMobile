import React from 'react';
import { Alert, Platform } from 'react-native';

// Screenshot and Screen Recording Protection
export const enableScreenProtection = async () => {
  try {
    // Try to import expo-screen-capture if available
    const ScreenCapture = await import('expo-screen-capture');
    await ScreenCapture.preventScreenCaptureAsync();
    console.log('Screen capture prevention enabled.');
    return true;
  } catch (error) {
    console.warn('Screen capture prevention not available:', error.message);
    return false;
  }
};

export const disableScreenProtection = async () => {
  try {
    const ScreenCapture = await import('expo-screen-capture');
    await ScreenCapture.allowScreenCaptureAsync();
    console.log('Screen capture prevention disabled.');
    return true;
  } catch (error) {
    console.warn('Screen capture control not available:', error.message);
    return false;
  }
};

// Facial Verification (Mock Implementation)
export const performFacialVerification = async () => {
  return new Promise((resolve) => {
    // Simulate facial verification process
    setTimeout(() => {
      const isVerified = Math.random() > 0.1; // 90% success rate for demo
      resolve({
        success: isVerified,
        confidence: isVerified ? 0.95 : 0.45,
        message: isVerified 
          ? 'Facial verification successful!' 
          : 'Facial verification failed. Please try again.',
      });
    }, 3000); // 3 second simulation
  });
};

// Camera Permission Check
export const checkCameraPermission = async () => {
  try {
    const { Camera } = await import('expo-camera');
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.warn('Camera permission check not available:', error.message);
    // Return true for demo purposes
    return true;
  }
};

// Face Detector Availability Check
export const isFaceDetectorAvailable = () => {
  // Return false since we're not using expo-face-detector
  return false;
};

export const getFaceDetector = () => {
  // Return null since we're not using expo-face-detector
  return null;
};

export const requestCameraPermissions = async () => {
  try {
    const { Camera } = await import('expo-camera');
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.warn('Camera permissions not available:', error.message);
    return true; // Return true for demo purposes
  }
};

// Security Alert
export const showSecurityAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        style: 'default',
      },
    ],
    { cancelable: false }
  );
};

// App Protection Status
export const getProtectionStatus = () => {
  return {
    screenCaptureProtected: true, // Assume protected for demo
    facialVerificationEnabled: false, // Disabled since expo-face-detector not available
    cameraPermissionGranted: true,
  };
};

// Mock Facial Scan for Demo
export const performMockFacialScan = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate
      resolve({
        success: isSuccess,
        confidence: isSuccess ? 95 + Math.random() * 5 : 40 + Math.random() * 10,
        error: isSuccess ? null : 'Face not clearly visible. Please try again.',
      });
    }, 3000);
  });
};

