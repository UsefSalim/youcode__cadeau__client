import { convertFromRaw, SelectionState, Modifier } from 'draft-js';
import { OrderedSet } from 'immutable';
import moment from 'Services/moment';
import React, { Component } from 'react';
import { renderMarkup } from 'react-render-markup';
import { stateToHTML } from 'draft-js-export-html';

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

//// pdf

const findWithRegex = (regex, contentBlock, diff, callback) => {
  const text = contentBlock.getText();
  let matchArr, start, end;
  let i = 0;
  while ((matchArr = regex.exec(text)) !== null) {
    start = i === 0 ? matchArr.index : matchArr.index - i * diff;
    end = i === 0 ? start + matchArr[0].length : start + matchArr[0].length;
    // console.log("step " + i, { start, end });
    i++;
    callback(start, end);
  }
};
const onReplace = (content, mention, replacedWith) => {
  const regex = new RegExp(mention, 'g');
  const selectionsToReplace = [];
  const blockMap = content.getBlockMap();

  let diff = mention.length - replacedWith.length;

  blockMap.forEach((contentBlock) =>
    findWithRegex(regex, contentBlock, diff, (start, end) => {
      const blockKey = contentBlock.getKey();
      const blockSelection = SelectionState.createEmpty(blockKey).merge({
        anchorOffset: start,
        focusOffset: end,
      });

      selectionsToReplace.push(blockSelection);
    })
  );

  let contentState = content;

  selectionsToReplace.forEach((selectionState) => {
    contentState = Modifier.replaceText(
      contentState,
      selectionState,
      replacedWith,
      OrderedSet.of('BOLD')
    );
  });

  return contentState;
};
export const replaceContent = (content, contract, arrangement) => {
  let newContent = onReplace(convertFromRaw(content), '@Prénom', contract.ownerFirstName);
  newContent = onReplace(newContent, '@Nom', contract.ownerLastName);
  newContent = onReplace(newContent, "@Ordre d'article", arrangement.disposition.toString());
  newContent = !contract.ownerCin
    ? onReplace(newContent, '@CIN', '______')
    : onReplace(newContent, '@CIN', contract.ownerCin);
  newContent = !contract.ownerRib
    ? onReplace(newContent, '@RIB', '________________________')
    : onReplace(newContent, '@RIB', contract.ownerRib);
  newContent = !contract.ownerBank
    ? onReplace(newContent, '@Banque', '____________')
    : onReplace(newContent, '@Banque', contract.ownerBank);
  newContent = !contract.ownerPhoneNumber
    ? onReplace(newContent, '@Téléphone', '__________')
    : onReplace(newContent, '@Téléphone', contract.ownerPhoneNumber);
  newContent = !contract.ownerAddress
    ? onReplace(
        newContent,
        '@Adresse',
        '______________________________________________________________'
      )
    : onReplace(newContent, '@Adresse', contract.ownerAddress);
  newContent = onReplace(
    newContent,
    "@Date d'embauche",
    moment(contract.ownerHiringDate.substring(0, 10)).format('DD/MM/YYYY')
  );
  newContent = contract.ownerResignationDate
    ? onReplace(
        newContent,
        '@Date de démission',
        moment(contract.ownerResignationDate.substring(0, 10)).format('DD/MM/YYYY')
      )
    : onReplace(newContent, '@Date de démission', '___/___/______');
  newContent = contract.ownerInternshipStartDate
    ? onReplace(
        newContent,
        '@Date de début de stage',
        moment(contract.ownerInternshipStartDate.substring(0, 10)).format('DD/MM/YYYY')
      )
    : onReplace(newContent, '@Date de début de stage', '___/___/______');
  newContent = contract.ownerInternshipEndDate
    ? onReplace(
        newContent,
        '@Date de fin de stage',
        moment(contract.ownerInternshipEndDate.substring(0, 10)).format('DD/MM/YYYY')
      )
    : onReplace(newContent, '@Date de fin de stage', '___/___/______');
  newContent = contract.ownerCnss
    ? onReplace(newContent, '@CNSS', contract.ownerCnss.toString())
    : onReplace(newContent, '@CNSS', '__________');
  newContent = !contract.ownerBirthDate
    ? onReplace(newContent, '@Date de Naissance', '___/___/______')
    : onReplace(
        newContent,
        '@Date de Naissance',
        moment(contract.ownerBirthDate.substring(0, 10)).format('DD/MM/YYYY')
      );
  newContent = !contract.ownerBonusesAndCommissions
    ? onReplace(
        newContent,
        '@Primes et Commissions',
        '______________________________________________________________'
      )
    : onReplace(newContent, '@Primes et Commissions', contract.ownerBonusesAndCommissions);
  newContent = !contract.ownerNationality
    ? onReplace(newContent, '@Nationalité', '_____________')
    : onReplace(newContent, '@Nationalité', contract.ownerNationality);
  newContent = !contract.ownerCity
    ? onReplace(newContent, '@Ville', '_____________')
    : onReplace(newContent, '@Ville', contract.ownerCity);
  newContent = contract.ownerDepartment
    ? onReplace(newContent, '@Département', contract.ownerDepartment)
    : onReplace(newContent, '@Département', '__________');
  newContent = contract.ownerJob
    ? onReplace(newContent, '@Poste', contract.ownerJob)
    : onReplace(newContent, '@Poste', '__________');
  newContent = onReplace(
    newContent,
    '@Salaire net',
    parseFloat(contract.ownerSalary).toFixed(2).toString() + ' Dirhams'
  );
  newContent = onReplace(
    newContent,
    '@Salaire actuel',
    parseFloat(contract.ownerActualSalary).toFixed(2).toString() + ' Dirhams'
  );
  newContent = onReplace(
    newContent,
    "@Date d'aujourd'hui",
    moment(contract.generatedAt.substring(0, 10)).format('DD/MM/YYYY')
  );
  newContent = !contract.contractDate
    ? onReplace(newContent, '@Date de contrat', '___/___/______')
    : onReplace(
        newContent,
        '@Date de contrat',
        moment(contract.contractDate.substring(0, 10)).format('DD/MM/YYYY')
      );
  newContent = !contract.ownerCivility
    ? onReplace(newContent, '@Civilité', '_____')
    : onReplace(newContent, '@Civilité', contract.ownerCivility);

  return newContent;
};
export const options = {
  blockStyleFn: (block) => {
    if (block.getType() === 'align-center') {
      return {
        style: {
          'text-align': 'center',
        },
      };
    }
    if (block.getType() === 'align-left') {
      return {
        style: {
          'text-align': 'left',
        },
      };
    }
    if (block.getType() === 'align-right') {
      return {
        style: {
          'text-align': 'right',
        },
      };
    }
    if (block.getType() === 'justify') {
      return {
        style: {
          'text-align': 'justify',
        },
      };
    }
  },
};

export const convertToHtml = (draftContent) => {
  let content = JSON.parse(draftContent);
  let options = {
    blockStyleFn: (block) => {
      if (block.getType() === 'align-center') {
        return {
          style: {
            'text-align': 'center',
          },
        };
      }
      if (block.getType() === 'align-left') {
        return {
          style: {
            'text-align': 'left',
          },
        };
      }
      if (block.getType() === 'align-right') {
        return {
          style: {
            'text-align': 'right',
          },
        };
      }
      if (block.getType() === 'justify') {
        return {
          style: {
            'text-align': 'justify',
          },
        };
      }
    },
  };
  let markup = stateToHTML(convertFromRaw(content), options);
  markup = markup.replaceAll('\n', '');

  return <div>{renderMarkup(markup)}</div>;
};
