/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { IconButton } from '@laazyry/sobrus-design-system';
import PropTypes from 'prop-types';

export const CardLikeAndComment = (props) => {
  const { hideCommentsTag, onClickLike } = props;
  return (
    <div className='card_content_like_and_comment_section'>
      <div onClick={onClickLike} className='card_content_like_and_comment_container'>
        <IconButton style={{ margin: 1, lineHeight: 1 }} color='danger'>
          {props?.isLiked ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
        </IconButton>
        <p>{props?.likesNumber ?? 0}</p>
      </div>
      {!hideCommentsTag && (
        <div className='card_content_like_and_comment_container'>
          <IconButton style={{ margin: 1, lineHeight: 1 }} color='primary'>
            <AiOutlineComment size={20} />
          </IconButton>
          <p>{props?.commentNumber ?? 0}</p>
        </div>
      )}
    </div>
  );
};
CardLikeAndComment.propTypes = {
  commentNumber: PropTypes.string,
  likesNumber: PropTypes.string,
  isLiked: PropTypes.bool,
  hideCommentsTag: false,
};
