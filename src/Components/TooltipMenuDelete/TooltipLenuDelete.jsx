import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RiCloseFill } from 'react-icons/ri';
export const TooltipMenuDelete = (props) => {
  const { className, iconSize, iconColor, label, cssModule, tag: Tag, ...attributes } = props;

  const classes = mapToCssModules(classNames(className, 'TooltipMenu__menu-item'), cssModule);

  return (
    <Tag {...attributes} className={classes}>
      <RiCloseFill size={iconSize} color={iconColor} />{' '}
      <span style={{ color: 'red' }} className='TooltipMenu__menu-item-text'>
        {label}
      </span>
    </Tag>
  );
};

TooltipMenuDelete.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  /** Pass in a Component to override default element */
  tag: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
      ])
    ),
  ]),
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  label: PropTypes.string,
};
TooltipMenuDelete.defaultProps = {
  tag: 'button',
  iconSize: 19,
  iconColor: 'red',
  label: 'Supprimer',
};
let globalCssModule;

function mapToCssModules(className = '', cssModule = globalCssModule) {
  if (!cssModule) return className;
  return className
    .split(' ')
    .map((c) => cssModule[c] || c)
    .join(' ');
}
