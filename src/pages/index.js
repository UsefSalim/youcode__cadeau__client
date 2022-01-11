import {lazy} from "react"
export const Register = lazy(()=>import('./Register/Register'))
export const Login = lazy(()=>import('./Login/Login'))
export const Home = lazy(()=>import('./Home/Home'))
export const AdminProfile = lazy(()=>import('./Admin/AdminProfile/AdminProfile'))
export const UserProfile = lazy(()=>import('./User/UserProfile/UserProfile'))
export const SellerProfile = lazy(()=>import('./Seller/SellerProfile/SellerProfile'))


