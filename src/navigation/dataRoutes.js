import { lazy } from 'react';
import  { SellerProfile, AdminProfile, UserProfile } from 'Pages'

export const sellerRoutes = [
  {
    path: '/shope',
    component: SellerProfile,
  },
];
export const adminRoutes = [
  {
    path: '/dashboard',
    component: AdminProfile,
  },
];
export const userRoutes = [
  {
    path: '/profile',
    component: UserProfile,
  },
];
