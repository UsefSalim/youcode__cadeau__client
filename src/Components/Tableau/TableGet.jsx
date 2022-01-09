import React, { useState } from 'react';
import { Table } from '@laazyry/sobrus-design-system';
import CustomBreadcrumb from '../CustomBreadcrumb/CustomBreadcrumb';
import CustomSearch from '../CustomSearch/CustomSearch';
import {
  Thead,
  Theader,
  EmtyDataTableau,
  TableauPagination,
  TableauLoading,
} from './TableElements';

export const TableGet = ({
  storageName,
  theaderTitle,
  thData,
  // tableProps
  initialQueryState,
  FetchGet,
  data,
  localstorageSearch,
  pages,
  queryState,
  setQueryState,
  loading,
  actions,
  // tableProps
  inTabs,
  children,
  tableActions,
  title,
  message,
}) => {
  const dataFromLocalstorage = JSON.parse(localStorage.getItem(storageName));
  const searchDataFromLocalStorage = dataFromLocalstorage && localstorageSearch;
  const [toggleSearch, setToggleSearch] = useState(searchDataFromLocalStorage || false);
  const [storageData, setStorageData] = useState(dataFromLocalstorage || {});
  const handelRefresh = () => {
    localStorage.removeItem(storageName);
    setStorageData({});
    setQueryState(initialQueryState);
  };

  const handelChange = (e, input, name) => {
    const fieldsCopy = queryState;
    const storageDataCopy = storageData;
    if (input === 'showInMenu') {
      fieldsCopy[name] = name === 'city' ? e?.label : e?.value;
      storageDataCopy[name] = e;
      FetchGet(1, fieldsCopy);
    } else if (input === 'date') {
      fieldsCopy[name] = e;
      storageDataCopy[name] = e;
      FetchGet(1, fieldsCopy);
    } else {
      fieldsCopy[e?.target?.name] = e?.target?.value;
      storageDataCopy[e?.target?.name] = e?.target?.value;
    }
    localStorage.removeItem(storageName);
    localStorage.setItem(storageName, JSON.stringify(storageDataCopy));
    setQueryState(fieldsCopy);
    setStorageData(storageDataCopy);
  };
  return (
    <div className={!tableActions ? 'table__widthoutaction' : ''}>
      <div className={`${!inTabs ? 'table__container' : 'table__notintabs'}`}>
        <Theader
          {...{
            theaderTitle,
            handelRefresh,
            toggleSearch,
            setToggleSearch,
            tableActions,
          }}
        >
          <CustomSearch
            fetch={FetchGet}
            handelChange={handelChange}
            data={thData}
            storageName={storageName}
          />
        </Theader>
        <Table>
          <Thead {...{ thData, setQueryState, queryState, actions, tableActions }} />
          {loading && <TableauLoading thData={thData} actions={actions} />}
          <tbody>
            {children}
            <EmtyDataTableau
              data={data}
              pages={pages}
              loading={loading}
              title={title}
              message={message}
            />
            <TableauPagination
              queryState={queryState}
              pages={pages}
              setQueryState={setQueryState}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const defaultProps = {
  breadcrumb: true,
  tableActions: true,
  initialQueryState: {
    page: 1,
    limit: 20,
    order: 'DESC',
    orderBy: 'departmentName',
  },
};
TableGet.defaultProps = defaultProps;
