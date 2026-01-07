import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TextInput } from 'react-native-paper';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Spinner } from '@/components/ui/spinner';

import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { signIn, signUp, signInWithOAuth, resetPassword } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  
  // Modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('');

  const handleAuth = async () => {
    setMessage(null);
    
    if (!email.trim() || !password.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: 'Signed in successfully!' });
          router.replace('/(app)/(tabs)');
        }
      } else {
        if (!name.trim()) {
          setMessage({ type: 'error', text: 'Please enter your name' });
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, name);
        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          // Show email confirmation modal
          setModalEmail(email);
          setShowEmailModal(true);
          // Clear form
          setEmail('');
          setPassword('');
          setName('');
        }
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setMessage(null);
    setLoading(true);
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setMessage(null);
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address first' });
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Password reset email sent! Check your inbox.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalDismiss = () => {
    setShowEmailModal(false);
    setIsLogin(true); // Switch to login mode
  };

  // Skip login for demo (remove in production)
  const handleDemoLogin = () => {
    router.replace('/(app)/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Email Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEmailModal}
        onRequestClose={handleModalDismiss}
      >
        <Pressable style={styles.modalOverlay} onPress={handleModalDismiss}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Center className="mb-6">
              <Box className="w-20 h-20 bg-green-500/20 rounded-full items-center justify-center mb-4">
                <Text size="4xl">✉️</Text>
              </Box>
              <Heading size="2xl" className="text-slate-50 text-center mb-2">
                Check Your Email
              </Heading>
              <Text className="text-slate-400 text-center leading-6">
                We've sent a confirmation link to
              </Text>
              <Text className="text-violet-400 font-semibold text-center mt-1">
                {modalEmail}
              </Text>
            </Center>

            <Box className="bg-slate-700/50 rounded-2xl p-4 mb-6">
              <Text className="text-slate-300 text-center text-sm leading-5">
                Click the link in the email to verify your account. 
                Once verified, you can sign in and start liquidating!
              </Text>
            </Box>

            <VStack space="sm">
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleModalDismiss}
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-lg text-center">
                  Got it!
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalSecondaryButton}
                onPress={() => {
                  // Could implement resend logic here
                  setShowEmailModal(false);
                }}
                activeOpacity={0.8}
              >
                <Text className="text-slate-400 text-center">
                  Didn't receive it? Check spam folder
                </Text>
              </TouchableOpacity>
            </VStack>
          </Pressable>
        </Pressable>
      </Modal>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo & Welcome */}
          <Center className="mb-8">
            <Box className="w-20 h-20 bg-violet-500/20 rounded-3xl items-center justify-center mb-6">
              <Text size="4xl">💎</Text>
            </Box>
            <Heading size="3xl" className="text-slate-50 text-center">
              {isLogin ? 'Welcome Back' : 'Join LOOP'}
            </Heading>
            <Text className="text-slate-400 text-center mt-2">
              {isLogin 
                ? 'Sign in to continue liquidating' 
                : 'Create an account to start earning'}
            </Text>
          </Center>

          {/* Message Banner */}
          {message && (
            <Box 
              className={`p-4 rounded-2xl mb-6 ${
                message.type === 'error' 
                  ? 'bg-red-500/20 border border-red-500/50' 
                  : 'bg-green-500/20 border border-green-500/50'
              }`}
            >
              <Text 
                className={`text-center ${
                  message.type === 'error' ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {message.text}
              </Text>
            </Box>
          )}

          {/* Auth Form */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
            <VStack space="md">
              {!isLogin && (
                <TextInput
                  mode="outlined"
                  label="Full Name"
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  outlineColor="#475569"
                  activeOutlineColor="#8b5cf6"
                  textColor="#f8fafc"
                  theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
                  left={<TextInput.Icon icon="account" color="#94a3b8" />}
                  disabled={loading}
                />
              )}

              <TextInput
                mode="outlined"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                outlineColor="#475569"
                activeOutlineColor="#8b5cf6"
                textColor="#f8fafc"
                theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
                left={<TextInput.Icon icon="email" color="#94a3b8" />}
                disabled={loading}
              />

              <TextInput
                mode="outlined"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                outlineColor="#475569"
                activeOutlineColor="#8b5cf6"
                textColor="#f8fafc"
                theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
                left={<TextInput.Icon icon="lock" color="#94a3b8" />}
                right={
                  <TextInput.Icon 
                    icon={showPassword ? "eye-off" : "eye"} 
                    color="#94a3b8"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                disabled={loading}
              />

              {isLogin && (
                <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
                  <Text className="text-violet-400 text-right">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={[styles.authButton, loading && styles.authButtonDisabled]}
                onPress={handleAuth}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <Spinner color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg text-center">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>
            </VStack>
          </Box>

          {/* Divider */}
          <HStack className="items-center mb-6">
            <Divider className="flex-1 bg-slate-700" />
            <Text className="text-slate-500 mx-4">or continue with</Text>
            <Divider className="flex-1 bg-slate-700" />
          </HStack>

          {/* Social Login */}
          <HStack space="md" className="justify-center mb-6">
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('google')}
              disabled={loading}
            >
              <Text size="2xl">🔵</Text>
              <Text className="text-slate-300 ml-2">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('apple')}
              disabled={loading}
            >
              <Text size="2xl">🍎</Text>
              <Text className="text-slate-300 ml-2">Apple</Text>
            </TouchableOpacity>
          </HStack>

          {/* Demo Mode Button */}
          <TouchableOpacity 
            style={styles.demoButton}
            onPress={handleDemoLogin}
          >
            <Text className="text-slate-500">Skip for Demo →</Text>
          </TouchableOpacity>

          {/* Toggle Auth Mode */}
          <Center className="mt-4">
            <HStack space="xs">
              <Text className="text-slate-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={() => { setIsLogin(!isLogin); setMessage(null); }} disabled={loading}>
                <Text className="text-violet-400 font-semibold">
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </HStack>
          </Center>

          {/* Terms */}
          <Text size="xs" className="text-slate-500 text-center mt-6 leading-5">
            By continuing, you agree to LOOP's{'\n'}
            <Text className="text-violet-400">Terms of Service</Text> and{' '}
            <Text className="text-violet-400">Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#334155',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  demoButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  authButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonDisabled: {
    opacity: 0.6,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSecondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
});
