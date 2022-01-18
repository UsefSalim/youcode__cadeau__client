import { lazy } from 'react';

export const Home = lazy(() => import('./Home/Home'));
export const AdminProfile = lazy(() => import('./Admin/AdminProfile/AdminProfile'));
export const AdminProfileCategories = lazy(() => import('./Admin/Categories/Categories'));
export const AdminProfileCategoriesAddOrUpdate = lazy(() =>
  import('./Admin/Categories/CategorieAddOrUpdate/CategorieAddOrUpdate')
);

// ------------------------------ //
export const UserProfile = lazy(() => import('./User/UserProfile/UserProfile'));
export const Checkout = lazy(() => import('./Checkout/Checkout'));
// ------------------------------ //

export const SellerProfile = lazy(() => import('./Seller/SellerProfile/SellerProfile'));
export const SellerArticles = lazy(() => import('./Seller/Articles/Articles'));
export const SellerArticlesAddOrUpdate = lazy(() =>
  import('./Seller/Articles/ArticlesAddOrUpdate/ArticlesAddOrUpdate')
);
