'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

export interface UserProfile {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: 'CUSTOMER' | 'ADMIN';
  gender?: 'male' | 'female' | 'other';
  birthdate?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'raqi_user_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, rememberMe = true): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulate network request delay for realistic feel
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!email || !password) {
        return { success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' };
      }

      if (password.length < 6) {
        return { success: false, error: 'كلمة المرور يجب ألا تقل عن 6 أحرف' };
      }

      // Format name from email or default
      const nameFromEmail = email.split('@')[0];
      const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      const authenticatedUser: UserProfile = {
        id: `user-${Date.now().toString().slice(-6)}`,
        name: email === 'omar.ahmad@example.com' ? 'عمر الأحمد' : capitalizedName,
        firstName: email === 'omar.ahmad@example.com' ? 'عمر' : capitalizedName,
        lastName: email === 'omar.ahmad@example.com' ? 'الأحمد' : '',
        email: email.toLowerCase().trim(),
        phone: '+971 50 123 4567',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
        gender: 'male',
        birthdate: '1995-04-15',
        createdAt: new Date().toISOString()
      };

      setUser(authenticatedUser);

      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      }

      showToast(`مرحباً بعودتك، ${authenticatedUser.name}!`, 'success');
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.message || 'تعذر تسجيل الدخول، يرجى المحاولة لاحقاً';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (!name.trim()) {
        return { success: false, error: 'يرجى إدخال الاسم الكامل' };
      }
      if (!email || !email.includes('@')) {
        return { success: false, error: 'يرجى إدخال بريد إلكتروني صالح' };
      }
      if (!password || password.length < 6) {
        return { success: false, error: 'كلمة المرور يجب أن تتكون من 6 خانات على الأقل' };
      }

      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || name;
      const lastName = nameParts.slice(1).join(' ') || '';

      const newUser: UserProfile = {
        id: `user-${Date.now().toString().slice(-6)}`,
        name: name.trim(),
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || '+971 50 000 0000',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        role: 'CUSTOMER',
        createdAt: new Date().toISOString()
      };

      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

      showToast(`تم إنشاء حسابك بنجاح! أهلاً بك في راقِي، ${firstName}`, 'success');
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.message || 'حدث خطأ أثناء إنشاء الحساب';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    showToast('تم تسجيل الخروج بنجاح. نراك قريباً!', 'info');
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    showToast('تم حفظ وتحديث بيانات الملف الشخصي بنجاح', 'success');
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
