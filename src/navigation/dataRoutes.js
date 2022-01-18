
import {
  SellerProfile,
  SellerArticles,
  SellerArticlesAddOrUpdate,
  //
  AdminProfile,
  AdminProfileCategories,
  AdminProfileCategoriesAddOrUpdate,
  //
  UserProfile,
  Checkout,
} from 'Pages';

export const sellerRoutes = [
  {
    path: '/shope',
    component: SellerProfile,
    name:"Shope"
  },
  {
    path: '/shope/article',
    component: SellerArticles,
    name:"article"
  },
  {
    path: '/shope/article/add_or_update',
    component: SellerArticlesAddOrUpdate,
  },
  {
    path: '/shope/article/add_or_update/:id',
    component: SellerArticlesAddOrUpdate,
  },
];
export const adminRoutes = [
  {
    path: '/dashboard',
    component: AdminProfile,
  },
  {
    path: '/dashboard/category',
    component: AdminProfileCategories,
  },
  {
    path: '/dashboard/category/add_or_update',
    component: AdminProfileCategoriesAddOrUpdate,
  },
  {
    path: '/dashboard/category/add_or_update/:id',
    component: AdminProfileCategoriesAddOrUpdate,
  },

];
export const userRoutes = [
  {
    path: '/profile',
    component: UserProfile,
  },
  {
    path: '/checkout',
    component: Checkout,
  },
];
