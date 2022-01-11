import { CustomBreadcrumb, TableGet } from 'Components';
import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@laazyry/sobrus-design-system';
import { Link, useHistory } from 'react-router-dom';
import { useCrud } from 'Hooks';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';

const AdminProfile = () => {
  const initialQueryState = {
    page: 1,
    limit: 20,
    order: 'DESC',
    orderBy: 'name',
  };
  const dataFromLocalstorage = JSON.parse(localStorage.getItem('categories'));
  const localstorageSearch = dataFromLocalstorage && {
    name: dataFromLocalstorage?.name,
  };
  const history = useHistory();
  const [queryState, setQueryState] = useState(
    localstorageSearch ? { ...initialQueryState, ...localstorageSearch } : initialQueryState
  );
  const { data, loading, pages, FetchGet, Delete } = useCrud('/categories', 'data', queryState);
  const tableProps = {
    storageName: 'categories',
    theaderTitle: 'Liste des categories',
    thData: [
      {
        orderBy: 'name',
        nom: 'Categorie',
        type: 'text',
      },
    ],
    initialQueryState,
    FetchGet,
    localstorageSearch,
    queryState,
    setQueryState,
    loading,
    pages,
    data,
  };
  console.log(data);
  useEffect(() => FetchGet(), [FetchGet]);
  return (
    <div className='Home_container'>
      <CustomBreadcrumb title='Tableau de bord' body={[{ el: 'Categories' }]}>
        <div>
          <Button
            style={{ backgroundColor: '#785ea8', marginRight: 0 }}
            color='primary'
            onClick={() => {
              history.push('/admin/categories/add_or_update');
            }}
          >
            Ajouter une categorie
          </Button>
        </div>
      </CustomBreadcrumb>
      <TableGet {...tableProps}>
        {data?.map((d) => (
          <tr key={d._id}>
            <td onClick={() => history.push(`/admin/articles/${d?._id}`)}>{d?.name}</td>
            <td style={{ textAlign: 'right' }}>
              <IconButton
                style={{
                  margin: '0 4px',
                  lineHeight: 1,
                }}
                onClick={() => Delete(`/categories`, d?._id, 'Categorie')}
                color='danger'
                title='supprimer'
              >
                <IoCloseSharp size={20} />
              </IconButton>
              <Link to={`/admin/categories/add_or_update/${d?._id}`}>
                <IconButton
                  style={{ margin: '0 4px', lineHeight: 1 }}
                  color='primary'
                  title='modifier'
                >
                  <AiOutlineEdit size={20} />
                </IconButton>
              </Link>
            </td>
          </tr>
        ))}
      </TableGet>
    </div>
  );
};

export default AdminProfile;
