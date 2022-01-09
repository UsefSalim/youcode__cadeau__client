import React from 'react';
import {
  AuditCard,
  AuditCardBody,
  AuditCardHeader,
  AuditCardHeaderIcon,
  AuditCardItem,
  AuditCardTitle,
} from '@laazyry/sobrus-design-system';
import moment from 'Services/moment';
const Tracabilite = ({ data }) => {
  return (
    <AuditCard style={{ margin: '0px' }}>
      <AuditCardHeader>
        <AuditCardHeaderIcon />
        <AuditCardTitle>Informations de traçabilité</AuditCardTitle>
      </AuditCardHeader>
      <AuditCardBody>
        <AuditCardItem
          label='Créer le :'
          value={
            <p>
              <strong>{moment(data?.createdAt).format('YYYY-MM-DD à HH:mm')}</strong> par{' '}
              <strong>
                {data?.createdBy?.firstName} {data?.createdBy?.lastName}
              </strong>
            </p>
          }
        />
        <AuditCardItem
          label='Mise à jours le :'
          value={
            <p>
              <strong>{moment(data?.updatedAt).format('YYYY-MM-DD à HH:mm')}</strong> par{' '}
              <strong>
                {data?.updatedBy?.firstName} {data?.updatedBy?.lastName}
              </strong>
            </p>
          }
        />
      </AuditCardBody>
    </AuditCard>
  );
};

export default Tracabilite;
