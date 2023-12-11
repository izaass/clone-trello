/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import {
  DndContext,
  // PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLibs/DndKitSensors";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState, useCallback, useRef } from "react";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";
import { taoGiuCho } from "~/utils/formaters";
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};
function BoardContent({
  board,
  createNewCol,
  createNewCard,
  moveCol,
  moveCardInSameCol,
  moveCardToDiffCol,
  deleteColumnDetails,
}) {
  // const poiterSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  // const mySensor = useSensors(poiterSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumnsState] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState([]);

  const [activeDragItemType, setActiveDragItemType] = useState([]);

  const [activeDragItemData, setActiveDragItemData] = useState([]);

  const [oldColWhenDraggingCard, setOldColWhenDraggingCard] = useState([]);
  const lastOverId = useRef(null);
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      //tim cac diem giao nhau va cham voi con tro
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length) return;

      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      //tim over id dau tien trong dam intersections tren
      let overId = getFirstCollision(pointerIntersections, "id");

      if (overId) {
        const checkCol = orderedColumns.find((column) => column.id === overId);
        if (checkCol) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkCol?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );
  useEffect(() => {
    setOrderedColumnsState(board.columns);
  }, [board]);

  //tìm col theo card id
  const findColByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };
  //khoi tao "FUNC CHUNG"cập nhật lại state khi di chuyen giua cac col khac nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumnsState((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);

      const nextActiveCol = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverCol = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      //col cu~
      if (nextActiveCol) {
        //tim va xoa khoi col
        nextActiveCol.cards = nextActiveCol.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        //them giu cho cho card cu
        if (isEmpty(nextActiveCol.cards)) {
          nextActiveCol.cards = [taoGiuCho(nextActiveCol)];
        }
        //cap nhat lai mang trong col hien tai
        nextActiveCol.cardOrderIds = nextActiveCol.cards.map(
          (card) => card._id
        );
      }

      //col moi
      if (nextOverCol) {
        nextOverCol.cards = nextOverCol.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        //them card vua xoa vao cot moi
        nextOverCol.cards = nextOverCol.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverCol._id,
        });
        //xoa giu cho neu co cac moi
        nextOverCol.cards = nextOverCol.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );
        //cap nhat lai mang moi them vao
        nextOverCol.cardOrderIds = nextOverCol.cards.map((card) => card._id);
      }
      //neu func được goi tu handleDragEnd, moi goi API (vi handleDragEnd chi xu ly 1 lan)
      if (triggerFrom === "handleDragEnd") {
        moveCardToDiffCol(
          activeDraggingCardId,
          oldColWhenDraggingCard._id,
          nextOverCol._id,
          nextColumns
        );
      }
      return nextColumns;
    });
  };
  //xử lý bắt đầu kéo
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
    if (event?.active?.data?.current?.columnId) {
      //new keo card thi moi tac dong toi oldCol
      setOldColWhenDraggingCard(findColByCardId(event?.active?.id));
    }
  };

  //xử lý quá trình kéo
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;

    if (!active || !over) return;
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    //tìm 2 current col và destination col
    const activeColumn = findColByCardId(activeDraggingCardId);
    const overColumn = findColByCardId(overCardId);
    // neu ton 2 1 trong 2 col thi tra ve
    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        "handleDragOver"
      );
    }
  };

  //xử lý kéo xong thả
  const handleDragEnd = (event) => {
    const { active, over } = event;
    //neu khong ton tai 1 trong 2 thi ko lam j ca

    if (!active || !over) return;
    //keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      //tìm 2 current col và destination col
      const activeColumn = findColByCardId(activeDraggingCardId);
      const overColumn = findColByCardId(overCardId);
      // neu ton 2 1 trong 2 col thi tra ve
      if (!activeColumn || !overColumn) return;
      if (oldColWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          "handleDragEnd"
        );
      } else {
        //keo tha card trong 1 col
        //lay vi tri cu tu active
        const oldCardIndex = oldColWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        //lay vi tri moi tu over
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        //dung arrayMove
        const dndOrderedCards = arrayMove(
          oldColWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id);
        setOrderedColumnsState((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          //tim toi Col dang tha
          const targetCol = nextColumns.find(
            (col) => col._id === overColumn._id
          );
          targetCol.cards = dndOrderedCards;
          targetCol.cardOrderIds = dndOrderedCardIds;

          //tra ve state moi dung vi tri
          return nextColumns;
        });
        moveCardInSameCol(
          dndOrderedCards,
          dndOrderedCardIds,
          oldColWhenDraggingCard._id
        );
      }
    }

    //keo tha col trong boardcontent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id != over.id) {
        //lay vi tri cu tu active
        const oldColIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );
        //lay vi tri moi tu over
        const newColIndex = orderedColumns.findIndex((c) => c._id === over.id);

        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColIndex,
          newColIndex
        );
        // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
        setOrderedColumnsState(dndOrderedColumns);

        // set api zo db
        //goi len props func moveCol nam o (boards/_id.jsx)
        moveCol(dndOrderedColumns);
      }
    }
    // Nhung du lieu sau khi keo tha luon phai gan bang null
    setActiveDragItemData(null);
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setOldColWhenDraggingCard(null);
  };
  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.soTay.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewCol={createNewCol}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
