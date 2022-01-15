
export const sliceText = (message, number = 15) => {
  let newMessage;
  if (message?.length > number) {
    newMessage = `${message?.slice(0, number)} . . .`;
    return newMessage;
  }
  return message;
};

export const days = (day) => {
  switch (day) {
    case 0:
      return 'Lundi';
    case 1:
      return 'Mardi';
    case 2:
      return 'Mercredi';
    case 3:
      return 'Jeudi';
    case 4:
      return 'Vendredi';
    case 5:
      return 'Samedi';
    case 6:
      return 'Dimanche';
    default:
      break;
  }
};
export const openInNewTab = (url) => {
  const setUrl = () => {
    if (!url.startsWith('https')) {
      if (url.startsWith('http')) return url;
      return  `https://${url}`
    }
    return url
  };
  console.log(setUrl());
  const newWindow = window.open(setUrl(), '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
};

export const jsonToFormData = (data) => {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
};



