import { useEffect } from 'react';

export const useTitle = (title) => {
  useEffect(() => {
    !title === '/'
      ? (document.title = 'Sobrus Workspace')
      : (document.title = `${title} - Sobrus Workspace`);
  }, [title]);
};
