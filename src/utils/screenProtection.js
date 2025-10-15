import { Alert, Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import { useEffect, useState } from 'react';

// Screen protection hook
export const useScreenProtection = () => {
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    let subscription;

    const enableScreenProtection = async () => {
      try {
        // Prevent screenshots and screen recording
        await ScreenCapture.preventScreenCaptureAsync();
        setIsProtected(true);
        
        // Listen for screen capture attempts
        subscription = ScreenCapture.addScreenshotListener(() => {
          Alert.alert(
            'Screenshot Blocked',
            'Screenshots are not allowed in this app for privacy and security reasons.',
            [{ text: 'OK' }]
          );
        });
        
        console.log('Screen protection enabled');
      } catch (error) {
        console.warn('Screen protection not available:', error);
        // Fallback for devices that don't support screen protection
        setIsProtected(false);
      }
    };

    const disableScreenProtection = async () => {
      try {
        await ScreenCapture.allowScreenCaptureAsync();
        setIsProtected(false);
        if (subscription) {
          subscription.remove();
        }
        console.log('Screen protection disabled');
      } catch (error) {
        console.warn('Error disabling screen protection:', error);
      }
    };

    // Enable protection when component mounts
    enableScreenProtection();

    // Cleanup function
    return () => {
      disableScreenProtection();
    };
  }, []);

  return { isProtected };
};

// Screen recording detection (iOS only)
export const useScreenRecordingDetection = () => {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // Check for screen recording periodically
      const checkRecording = setInterval(() => {
        // This is a placeholder - actual implementation would require native modules
        // For now, we'll simulate detection
        const simulatedRecording = false; // Replace with actual detection
        
        if (simulatedRecording && !isRecording) {
          setIsRecording(true);
          Alert.alert(
            'Screen Recording Detected',
            'Screen recording is not allowed. Please stop recording to continue using the app.',
            [
              {
                text: 'OK',
                onPress: () => setIsRecording(false)
              }
            ]
          );
        }
      }, 2000);

      return () => clearInterval(checkRecording);
    }
  }, [isRecording]);

  return { isRecording };
};

// Watermark overlay component
export const WatermarkOverlay = ({ children, userEmail }) => {
  return (
    <>
      {children}
      {/* Invisible watermark for tracking */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        opacity: 0.01,
      }}>
        <Text style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: 8,
          color: 'white',
        }}>
          {userEmail} - {new Date().toISOString()}
        </Text>
      </View>
    </>
  );
};

// Content protection wrapper
export const ProtectedContent = ({ children, user }) => {
  const { isProtected } = useScreenProtection();
  const { isRecording } = useScreenRecordingDetection();

  if (isRecording) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
        <Text style={{ color: 'white', textAlign: 'center', padding: 20 }}>
          Screen recording detected. Please stop recording to continue.
        </Text>
      </View>
    );
  }

  return (
    <WatermarkOverlay userEmail={user?.email}>
      {children}
    </WatermarkOverlay>
  );
};

