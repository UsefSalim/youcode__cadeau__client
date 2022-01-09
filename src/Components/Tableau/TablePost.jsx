import React, { useState } from 'react';
import { Table } from '@laazyry/sobrus-design-system';
import CustomSearch from '../CustomSearch/CustomSearch';
import {
  Thead,
  Theader,
  EmtyDataTableau,
  TableauPagination,
  TableauLoading,
} from './TableElements';

export const TablePost = ({
  storageName,
  theaderTitle,
  thData,
  initialQueryState,
  FetchPost,
  setFormData,
  formData,
  localstorageSearch,
  queryState,
  setQueryState,
  actions,
  inTabs,
  children,
  loading,
  pages,
  data,
  title,
  message,
  tableActions,
}) => {
  const dataFromLocalstorage = JSON.parse(localStorage.getItem(storageName));
  const searchDataFromLocalStorage = dataFromLocalstorage && localstorageSearch;
  const [toggleSearch, setToggleSearch] = useState((searchDataFromLocalStorage && true) || false);
  const [storageData, setStorageData] = useState(dataFromLocalstorage || {});
  const handelRefresh = () => {
    localStorage.removeItem(storageName);
    setFormData({});
    setStorageData({});
    setQueryState(initialQueryState);
    setToggleSearch(false);
  };
  const handelChange = (e, input, name) => {
    const fieldsCopy = formData;
    const storageDataCopy = storageData;
    if (input === 'showInMenu') {
      fieldsCopy[name] = name === 'city' ? e?.label : e?.value;
      storageDataCopy[name] = e;
      FetchPost(1, fieldsCopy);
    } else if (input === 'date') {
      fieldsCopy[name] = e;
      storageDataCopy[name] = e;
      FetchPost(1, fieldsCopy);
    } else {
      fieldsCopy[e?.target?.name] = e?.target?.value;
      storageDataCopy[e?.target?.name] = e?.target?.value;
    }
    localStorage.removeItem(storageName);
    localStorage.setItem(storageName, JSON.stringify(storageDataCopy));
    setFormData(fieldsCopy);
    setStorageData(storageDataCopy);
  };
  return (
    <div className={!tableActions ? 'table__widthoutaction' : ''}>
      <div className={`${!inTabs ? 'table__container' : ''}`}>
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
            fetch={FetchPost}
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

TablePost.defaultProps = {
  inTabs: false,
};
