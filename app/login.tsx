import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = () => {
    // Mock authentication - in real app, connect to Firebase/Supabase
    router.replace('/(tabs)');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
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
              />

              {isLogin && (
                <TouchableOpacity>
                  <Text className="text-violet-400 text-right">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              <Button 
                size="lg"
                className="bg-violet-500 rounded-2xl mt-4"
                onPress={handleAuth}
              >
                <ButtonText className="text-white font-bold text-lg">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </ButtonText>
              </Button>
            </VStack>
          </Box>

          {/* Divider */}
          <HStack className="items-center mb-6">
            <Divider className="flex-1 bg-slate-700" />
            <Text className="text-slate-500 mx-4">or continue with</Text>
            <Divider className="flex-1 bg-slate-700" />
          </HStack>

          {/* Social Login */}
          <HStack space="md" className="justify-center mb-8">
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('google')}
            >
              <Text size="2xl">🔵</Text>
              <Text className="text-slate-300 ml-2">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('apple')}
            >
              <Text size="2xl">🍎</Text>
              <Text className="text-slate-300 ml-2">Apple</Text>
            </TouchableOpacity>
          </HStack>

          {/* Toggle Auth Mode */}
          <Center>
            <HStack space="xs">
              <Text className="text-slate-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
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
});
