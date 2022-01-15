import { CustomBreadcrumb, TableGet } from 'Components';
import React, { useEffect, useState } from 'react';
import { Button, IconButton, Tag } from '@laazyry/sobrus-design-system';
import { Link, useHistory } from 'react-router-dom';
import { useCrud } from 'Hooks';
import { FcCheckmark ,IoCloseSharp } from 'react-icons/all';
import API from 'Services/API';

const AdminProfile = () => {
  const initialQueryState = {
    page: 1,
    limit: 20,
    order: 'ASC',
    orderBy: 'valid',
  };
  const dataFromLocalstorage = JSON.parse(localStorage.getItem('sellers'));
  const localstorageSearch = dataFromLocalstorage && {
    name: dataFromLocalstorage?.name,
  };
  const history = useHistory();
  const [queryState, setQueryState] = useState(
    localstorageSearch ? { ...initialQueryState, ...localstorageSearch } : initialQueryState
  );
  const { data, loading, pages, FetchGet, setData, Delete } = useCrud(
    '/user/sellers-not-valide',
    'data',
    queryState
  );
  const validOptions = [
    { label: 'Validée', value: true },
    { label: 'En Cour', value: false },
  ];
  const tableProps = {
    storageName: 'sellers',
    theaderTitle: 'Liste des compte vendeur ',
    thData: [
      {
        orderBy: 'name',
        nom: 'Nom Complet',
        type: 'text',
      },
      {
        orderBy: 'valid',
        nom: 'état',
        type: 'select',
        options: validOptions,
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
  useEffect(() => FetchGet(), [FetchGet]);
   console.log(data)
  const handelValidation = async (d) => {
    try {
      const { data } = await API.put(`/user/sellers-not-valide/${d?._id}`, { d, valid: true });
      console.log(data);
      setData((prev) =>
        prev.map((a) => {
          if (a._id === d._id) {
            return data;
          }
          return a;
        })
      );
    } catch (error) {}
  };
  return (
    <div className='Home_container'>
      <CustomBreadcrumb title='Tableau de bord' body={[{ el: 'Vendeurs' }]}>
        <div>
          <Button
            style={{ backgroundColor: 'red', marginRight: 0 }}
            color='primary'
            onClick={() => {
              history.push('/dashboard/category');
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
            <td onClick={() => history.push(`/admin/articles/${d?._id}`)}>
              {d?.valid ? (
                <Tag color='success'> Validée </Tag>
              ) : (
                <Tag color='danger'> En Cour </Tag>
              )}
            </td>
            <td style={{ textAlign: 'right' }}>
              {
                !d?.valid &&(
                   <IconButton
                  onClick={() => handelValidation(d)}
                  style={{ margin: '0 4px', lineHeight: 1 }}
                  color='primary'
                  title='valider'
                >
                  <FcCheckmark size={20} />
                </IconButton>
                )
              }
              <IconButton
                onClick={() => Delete(`/auth/sellers-not-valide`, d?._id, 'Vendeur')}
                style={{ margin: '0 4px', lineHeight: 1 }}
                color='primary'
                title='valider'
              >
                <IoCloseSharp size={20} />
              </IconButton>
            </td>
          </tr>
        ))}
      </TableGet>
    </div>
  );
};

export default AdminProfile;
