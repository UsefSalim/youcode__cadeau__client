import { CustomBreadcrumb, TableGet } from 'Components';
import React, { useContext, useEffect, useState } from 'react';
import { Button, IconButton } from '@laazyry/sobrus-design-system';
import { Link, useHistory } from 'react-router-dom';
import { useCrud, useOptions } from 'Hooks';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'Context';

const Articles = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const initialQueryState = {
    page: 1,
    limit: 20,
    order: 'DESC',
    orderBy: 'id',
  };
  const dataFromLocalstorage = JSON.parse(localStorage.getItem('articles'));
  const localstorageSearch = dataFromLocalstorage && {
    openForRecruitment: dataFromLocalstorage?.openForRecruitment?.value,
    job_name: dataFromLocalstorage?.job_name,
  };
  const history = useHistory();
  const [queryState, setQueryState] = useState(
    localstorageSearch ? { ...initialQueryState, ...localstorageSearch } : initialQueryState
  );
  const { data, loading, pages, FetchGet, Delete } = useCrud(
    `/articles/${user?._id}`,
    'data',
    queryState
  );

  const categoriesOptions = useOptions('/categories', ['_id', 'name'], 'get', 'data');
  console.log(categoriesOptions);
  const tableProps = {
    storageName: 'articles',
    theaderTitle: 'Liste des articles',
    thData: [
      {
        orderBy: 'name',
        nom: 'nom',
        type: 'text',
      },
      {
        orderBy: 'prix',
        nom: 'Prix',
        type: 'number',
      },
      {
        orderBy: 'description',
        nom: 'Description',
        type: 'text',
      },
      {
        orderBy: 'brand',
        nom: 'Marque',
        type: 'text',
      },
      {
        orderBy: 'countInStock',
        nom: 'Nombre en stock',
        type: 'number',
      },
      {
        orderBy: 'category',
        nom: 'Categorie',
        type: 'select',
        options: categoriesOptions,
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
  return (
    <div className='Home_container'>
      <CustomBreadcrumb title='Tableau de bord' body={[{ el: 'Articles' }]}>
        <div>
          <Button
            style={{ backgroundColor: '#785ea8', marginRight: 0 }}
            color='primary'
            onClick={() => {
              history.push('/admin/articles/add_or_update');
            }}
          >
            Ajouter une article
          </Button>
        </div>
      </CustomBreadcrumb>
      <TableGet {...tableProps}>
        {data?.map((d) => (
          <tr key={d._id}>
            <td>{d?.name}</td>
            <td>{d?.prix}.00 MAD</td>
            <td>{d?.description || '--'}</td>
            <td>{d?.brand || '--'}</td>
            <td>{d?.countInStock || '--'}</td>
            <td>{d?.categorie?.name || '--'}</td>

            <td style={{ textAlign: 'right' }}>
              <IconButton
                style={{
                  margin: '0 4px',
                  lineHeight: 1,
                }}
                onClick={() => Delete(`/article`, d?._id, 'Article')}
                color='danger'
                title='supprimer'
              >
                <IoCloseSharp size={20} />
              </IconButton>
              <Link to={`/admin/articles/add_or_update/${d?._id}`}>
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

export default Articles;
