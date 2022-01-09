import React from 'react';
import { AuditCard } from '@laazyry/sobrus-design-system';

const CustomAuditCard = ({ children }) => {
  return (
    <AuditCard
      style={{
        margin: '0 0 1rem 0 ',
        backgroundColor: 'rgba(120, 94, 168, 0.23)',
      }}
    >
      <p style={{ textAlign: 'center', marginBottom: 0 }}>{children}</p>
    </AuditCard>
  );
};

export default CustomAuditCard;
