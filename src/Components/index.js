import { lazy } from 'react';
import { PrivatRoutes } from './AuthComponent/PrivateRoutes';
import PagesLoader from './Loaders/PagesLoader';
import ProtectedHeader from './Header/ProtectedHeader';
import { TableGet } from './Tableau/TableGet';
import { TablePost } from './Tableau/TablePost';
import Tracabilite from './Tracabilite/Tracabilite';
import { CardLikeAndComment } from './CardLikeAndComment/CardLikeAndComment';

import {
  Thead,
  Theader,
  TableauLoading,
  EmtyDataTableau,
  TableauPagination,
} from './Tableau/TableElements';

const FailureComponent = lazy(() => import('./AuthComponent/FailureComponent'));
const SuccessComponent = lazy(() => import('./AuthComponent/SuccessComponent'));
const CustomBreadcrumb = lazy(() => import('./CustomBreadcrumb/CustomBreadcrumb'));

const CustomDatePicker = lazy(() => import('./Forms/CustomDatePicker/CustomDatePicker'));
const CustomInput = lazy(() => import('./Forms/CustomInput/CustomInput'));
const CustomInputSelect = lazy(() => import('./Forms/CustomInputSelect/CustomInputSelect'));

const UnauthorizedComponent = lazy(() => import('./UnauthorizedComponent/UnauthorizedComponent'));

export {
  PrivatRoutes,
  FailureComponent,
  SuccessComponent,
  CustomBreadcrumb,
  CustomDatePicker,
  CustomInput,
  CustomInputSelect,
  ProtectedHeader,
  PagesLoader,
  Thead,
  Theader,
  TableauLoading,
  EmtyDataTableau,
  TableauPagination,
  TableGet,
  TablePost,
  Tracabilite,
  CardLikeAndComment,
  UnauthorizedComponent,
};
