import React from 'react';
import PropTypes from 'prop-types';
import {
  AsyncSelect,
  DatePicker,
  Input,
  InputSelect,
  TableSearch,
  TableSearchItem,
  TableSearchRow,
} from '@laazyry/sobrus-design-system';

const CustomSearch = ({ storageName, handelChange, fetch, data }) => {
  const localstorage = JSON.parse(localStorage.getItem(storageName));
  console.log(localstorage ? localstorage['collaboraterId'] : 'sdhbsdfh', 'localstajkhsqdj');
  return (
    <TableSearch
      noAdvancedSearch
      onSearch={() => {
        fetch(1);
      }}
    >
      <TableSearchRow id='simple'>
        {data.map((d, key) => (
          <React.Fragment key={key}>
            {!d?.not && d.type === 'select' ? (
              <TableSearchItem>
                <InputSelect
                  defaultValue={localstorage ? localstorage[d?.searchBy || d?.orderBy] : ''}
                  placeholder={`Chercher par ${d?.nom}`}
                  onChange={(e) => handelChange(e, 'showInMenu', d?.searchBy || d?.orderBy)}
                  isClearable
                  options={d?.options}
                  name={d?.searchBy || d?.orderBy}
                />
              </TableSearchItem>
            ) : !d?.not && (d?.type === 'text' || d?.type === 'number') ? (
              <TableSearchItem>
                <Input
                  defaultValue={localstorage ? localstorage[d?.searchBy || d?.orderBy] : ''}
                  onChange={(e) => handelChange(e, 'orderInMenu')}
                  type={d?.type}
                  placeholder={`Chercher par ${d?.nom}`}
                  name={d?.searchBy || d?.orderBy}
                />
              </TableSearchItem>
            ) : d?.type === 'asyncSelect' ? (
              <TableSearchItem>
                <AsyncSelect
                  isClearable
                  placeholder='Ville'
                  cacheOptions
                  loadOptions={d?.options?.fetchCity}
                  defaultOptions={d?.options?.cityOptions}
                  onInputChange={d?.options?.handleInputChangeCity}
                  onChange={(e) => handelChange(e, 'showInMenu', d?.searchBy || d?.orderBy)}
                />
              </TableSearchItem>
            ) : (
              !d?.not &&
              d?.type === 'date' && (
                <TableSearchItem>
                  <DatePicker
                    autoComplete='off'
                    name={d?.searchBy || d?.orderBy}
                    placeholder={`${d?.nom}`}
                    showYearDropdown
                    calendarMainColor='primary'
                    selected={
                      localstorage && localstorage[d?.searchBy || d?.orderBy]
                        ? new Date(localstorage[d?.searchBy || d?.orderBy])
                        : new Date()
                    }
                    onChange={(date) => {
                      const test = date?.toISOString().slice(0, 10);
                      handelChange(test, 'date', d?.searchBy || d?.orderBy);
                    }}
                    dateFormat='yyyy-MM-dd'
                  />
                </TableSearchItem>
              )
            )}
          </React.Fragment>
        ))}
      </TableSearchRow>
    </TableSearch>
  );
};

const propTypes = {
  storageName: PropTypes.string.isRequired,
  handelChange: PropTypes.func.isRequired,
  FetchPost: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

CustomSearch.propTypes = propTypes;

export default CustomSearch;
