/* eslint-disable react/no-typos */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import {
  Th,
  TableHeader,
  TableHeaderTitle,
  TableHeaderActions,
  TableRefreshBtn,
  TableSearchBtn,
  TableLoader,
  EmptyData,
  TablePreviousPage,
  TablePage,
  TableNextPage,
} from '@laazyry/sobrus-design-system';

export const Thead = ({ thData, queryState, setQueryState, actions, tableActions }) => (
  <>
    {thData?.map((th) => (
      <Th
        onClick={() => {
          tableActions &&
            setQueryState((prev) => ({
              ...prev,
              orderBy: th?.orderBy,
              order: queryState?.orderBy === th?.orderBy && prev.order === 'DESC' ? 'ASC' : 'DESC',
            }));
        }}
        order={
          tableActions &&
          queryState?.orderBy === th?.orderBy &&
          (queryState?.order === 'ASC' ? 'down' : 'up')
        }
        isActive={!!(tableActions && queryState?.orderBy === th?.orderBy)}
      >
        {th?.nom}
      </Th>
    ))}
    {/* {actions && <Th>Actions</Th>} */}
  </>
);
Thead.defaultProps = {
  tableActions: true,
};
export const Theader = ({
  handelRefresh,
  theaderTitle,
  toggleSearch,
  setToggleSearch,
  children,
  tableActions,
}) => {
  const handelToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };
  return (
    <>
      <TableHeader>
        <TableHeaderTitle>{theaderTitle}</TableHeaderTitle>
        {tableActions && (
          <TableHeaderActions>
            <TableRefreshBtn style={{ margin: '0 0.5rem' }} onClick={handelRefresh} />
            <TableSearchBtn onClick={handelToggleSearch} open={toggleSearch} />
          </TableHeaderActions>
        )}
      </TableHeader>
      {children}
    </>
  );
};

Theader.defaultProps = {
  tableActions: true,
};

export const TableauLoading = ({ thData, actions = null }) => {
  const columns = [];
  actions && columns.push({ type: 'small' });
  for (let index = 0; index < thData.length; index++) {
    columns.push({ type: 'small' });
  }
  return <TableLoader loading columns={columns} />;
};

export const EmtyDataTableau = ({ data, pages, loading, title, message }) => (
  <>
    {data?.length === 0 && pages === 0 && loading === false && (
      <tr>
        <td colSpan={12}>
          <EmptyData
            title={title || 'Information non trouvée'}
            desc={message || 'Aucun résultat ne correspond à votre recherche'}
          />
        </td>
      </tr>
    )}
  </>
);

export const TableauPagination = ({ queryState, pages, setQueryState }) => {
  return (
    <>
      {pages && pages > 1 ? (
        <tr>
          <td colSpan={12}>
            <div className='sob-table-pagination'>
              <TablePreviousPage
                disabled={queryState?.page === 1 && true}
                onClick={() => setQueryState((prev) => ({ ...prev, page: queryState?.page - 1 }))}
              />
              <TablePage>{queryState?.page}</TablePage>
              <TableNextPage
                disabled={pages === queryState?.page && true}
                onClick={() => setQueryState((prev) => ({ ...prev, page: queryState?.page + 1 }))}
              />
            </div>
          </td>
        </tr>
      ) : (
        ''
      )}
    </>
  );
};
