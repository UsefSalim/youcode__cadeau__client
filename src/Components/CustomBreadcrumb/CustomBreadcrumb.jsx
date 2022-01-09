import React from 'react';
import PropTypes from 'prop-types';
import {
  Breadcrumb,
  BreadcrumbBody,
  BreadcrumbItem,
  BreadcrumbTitle,
  IconButton,
} from '@laazyry/sobrus-design-system';
import { Link, useHistory } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const CustomBreadcrumb = ({ title, body = [], children, back }) => {
  const history = useHistory();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className={body.length === 0 ? 'sob-breadcrumb-singletitle' : ''}
    >
      <Breadcrumb>
        {back && (
          <IconButton
            style={{ margin: '0  1rem 0 0', lineHeight: 1 }}
            onClick={() => history.goBack()}
            className='cart_title_header_container_button'
          >
            <MdKeyboardArrowLeft size={24} color='rgb(120, 94, 168)' />
          </IconButton>
        )}
        <BreadcrumbTitle>{title}</BreadcrumbTitle>
        <BreadcrumbBody>
          {body?.map((item, key) => (
            <BreadcrumbItem key={key} active={key === body?.length - 1}>
              {key !== body?.length - 1 ? <Link to={item?.to}> {item?.el} </Link> : <>{item?.el}</>}
            </BreadcrumbItem>
          ))}
        </BreadcrumbBody>
      </Breadcrumb>
      {children}
    </div>
  );
};

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  body: PropTypes.arrayOf(
    PropTypes.shape({
      el: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ),
  back: PropTypes.bool,
};
const defaultProps = {
  back: false,
};
CustomBreadcrumb.propTypes = propTypes;
CustomBreadcrumb.defaultProps = defaultProps;
export default CustomBreadcrumb;
