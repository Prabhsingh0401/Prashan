const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to sign up');
  }
  return response.json();
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to verify OTP');
  }
  return response.json();
};

export const login = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to login');
  }
  return response.json();
};
