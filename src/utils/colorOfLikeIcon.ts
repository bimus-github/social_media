interface colorOfLikeIconProps {
  likes: string[];
  currentUserId: string;
}

export const colorOfLikeIcon = (props: colorOfLikeIconProps) => {
  const { currentUserId, likes } = props;

  const liked = likes.find((like) => like === currentUserId);
  if (liked?.length) {
    return true;
  }

  return false;
};
