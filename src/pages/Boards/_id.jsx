// Details Board content
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";
import { taoGiuCho } from "~/utils/formaters";
import { mapOrder } from "~/utils/sorts";
import CircularProgress from "@mui/material/CircularProgress";

import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  fetchBoardDetailsAPI,
  createNewColAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDiffColAPI,
  deleteColumnDetailsAPI,
} from "~/apis";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "656ffd4fc1987e9138a82a73";

    //call API
    fetchBoardDetailsAPI(boardId).then((board) => {
      //sap xep thu tu cac col
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      board.columns.forEach((col) => {
        //xu ly giu cho, tao card trong vao 1 colum rong khi f5 trang tao giu cho cho col rong
        if (isEmpty(col.cards)) {
          col.cards = [taoGiuCho(col)];
          col.cardOrderIds = [taoGiuCho(col)._id];
        } else {
          //sap xep thu tu card trc
          col.cards = mapOrder(col.cards, col.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  //Func nay co nhiem vu goi API tao moi col va refresh laij state board
  const createNewCol = async (newCol) => {
    const createdCol = await createNewColAPI({ ...newCol, boardId: board._id });

    //khi tao column moi thi phai tao giu trong(card rong)
    createdCol.cards = [taoGiuCho(createdCol)];
    createdCol.cardOrderIds = [taoGiuCho(createdCol)._id];

    //cap nhat state board
    const newBoard = { ...board };
    newBoard.columns.push(createdCol);
    newBoard.columnOrderIds.push(createdCol._id);
    setBoard(newBoard);
  };

  //Func nay co nhiem vu goi API tao moi card va refresh lai state board
  const createNewCard = async (newCard) => {
    const createdCard = await createNewCardAPI({
      ...newCard,
      boardId: board._id,
    });
    //cap nhat state board
    const newBoard = { ...board };
    const colToUpdate = newBoard.columns.find(
      (col) => col._id === createdCard.columnId
    );
    if (colToUpdate) {
      // Todo: Nếu col rỗng thì phải xóa card giữ chỗ đi (placeholder-card)
      if (colToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        colToUpdate.cards = [createdCard];
        colToUpdate.cardOrderIds = [createdCard._id];
      } else {
        colToUpdate.cards.push(createdCard);
        colToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    setBoard(newBoard);
  };

  //Func xu ly keo tha col
  const moveCol = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

    //cap nhat state board
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    //goi api update vi tri board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  /**
   * Khi di chuyen card trong cung col
   * chi can goi API de cap nhat mang cardorderids cua col chua no(thay doi vi tri trong mang)
   */
  const moveCardInSameCol = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //Update chuan du lieu state
    const newBoard = { ...board };
    const colToUpdate = newBoard.columns.find((col) => col._id === columnId);
    if (colToUpdate) {
      colToUpdate.cards = dndOrderedCards;
      colToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);
    //Goi api update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
  };

  /**
   * Khi di chuyen card khac col
   * b1: cap nhat mang CardOrderIds cua col ban dau cua no (xoa card ra khoi mang)
   * b2: cap nhat mang cardOrderIds của col tiep theo (them _id của card vao mang)
   * b3: Cap nhat lại truong column id mới của card da xoa
   * => Làm một API ho tro rieng
   */
  const moveCardToDiffCol = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    //update state board

    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    //Goi API xu ly
    moveCardToDiffColAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  //Todo: Xử ly xoa col va cards
  const deleteColumnDetails = (columnId) => {
    console.log(columnId);
    //Todo: Update state board
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    );
    setBoard(newBoard);
    //Todo: Gọi API xử lý
    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult);
    });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          //! đẩy qua redux
          createNewCol={createNewCol}
          createNewCard={createNewCard}
          moveCol={moveCol}
          moveCardInSameCol={moveCardInSameCol}
          moveCardToDiffCol={moveCardToDiffCol}
          deleteColumnDetails={deleteColumnDetails}
        />
      </Container>
    </>
  );
}

export default Board;
