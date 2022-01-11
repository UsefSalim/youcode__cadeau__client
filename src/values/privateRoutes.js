import {AdminProfile ,UserProfile ,SellerProfile} from 'Pages'

export const privateRoutes = [
   {
      to:"/dashboard",
      component:AdminProfile,
      role:"Admin"
   },
   {
      to:"/profile",
      component:UserProfile,
      role:"User"
   },
   {
      to:"/shope",
      component:SellerProfile,
      role:"Seller"
   }
]