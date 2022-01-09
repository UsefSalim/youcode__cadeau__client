import { useState, useCallback, useReducer } from 'react';
import { notify } from '@laazyry/sobrus-design-system';
import API from 'Services/API';

export const useNotifications = (id, queryState) => {
  const initialState = {
    pages: 0,
    historyPages: 0,
    notifications: [],
    historynotifications: [],
    totalnotifications: 0,
    totalhistorynotifications: 0,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_PAGES':
        return { ...state, pages: action.value };
      case 'SET_HISTORY_PAGES':
        return { ...state, historyPages: action.value };
      case 'SET_NOTIFICATIONS':
        return { ...state, notifications: action.value };
      case 'SET_HISTORY_NOTIFICATIONS':
        return { ...state, historynotifications: action.value };
      case 'SET_TOTAL_NOTIFICATIONS':
        return { ...state, totalnotifications: action.value };
      case 'SET_TOTAL_HISTORY_NOTIFICATIONS':
        return { ...state, totalhistorynotifications: action.value };
      case 'NOTIFICATION_VU':
        return { ...state, totalnotifications: action.value };
      case 'NOTIFICATION_RESET':
        return {
          ...state,
          totalnotifications: action.value.totalnotifications,
          notifications: action.value.notifications,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const getNotifications = useCallback(async () => {
    if (id) {
      try {
        setLoadingNotifications(true);
        const { data } = await API.get(`/collaboraters/${id}/notifications`, {
          params: queryState,
        });
        dispatch({
          type: 'SET_PAGES',
          value: Math.ceil(data?.totalUnseen / 10),
        });
        dispatch({
          type: 'SET_HISTORY_PAGES',
          value: Math.ceil(data?.totalSeen / 10),
        });
        dispatch({
          type: 'SET_NOTIFICATIONS',
          value: data?.unseenNotifications,
        });
        dispatch({
          type: 'SET_HISTORY_NOTIFICATIONS',
          value: data?.seenNotifications,
        });
        dispatch({ type: 'SET_TOTAL_NOTIFICATIONS', value: data?.totalUnseen });
        dispatch({
          type: 'SET_TOTAL_HISTORY_NOTIFICATIONS',
          value: data?.totalSeen,
        });
        setLoadingNotifications(false);
      } catch (error) {
        notify({
          type: 'danger',
          msg:
            error?.response?.data?.message || 'Erreur Serveur Veiller contacter un administrateur',
          delay: 5000,
        });
        setLoadingNotifications(false);
      }
    }
  }, [id, queryState]);
  return { state, getNotifications, loadingNotifications, dispatch };
};
