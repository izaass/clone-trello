export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

export const taoGiuCho = (col) => {
  return {
    _id: `${col._id}-placeholder-card`,
    boardId: col.boardId,
    columnId: col._id,
    FE_PlaceholderCard: true,
  };
};
