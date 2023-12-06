/**
 * YouTube: TrungQuanDev - Một Lập Trình Viên
 * Created by trungquandev.com's author on Jun 28, 2023
 */
export const mockData = {
  board: {
    _id: "board-id-01",
    title: "TSCOVN - HandBook",
    description: "TSCOVN - HandBook",
    type: "public", // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: [
      "column-id-01",
      "column-id-02",
      "column-id-03",
      "column-id-04",
    ], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: "column-id-01",
        boardId: "board-id-01",
        title: "On Your First Day",
        cardOrderIds: ["card-id-01"],
        cards: [
          {
            _id: "card-id-01",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 01",
            description: "Markdown Syntax (sẽ ở khóa nâng cao nhé)",
            cover: "http://monitor.tscovn.com:9001/Data/GA/hungvo/3.jpg",
            memberIds: ["test-user-id-01"],
            comments: ["test comment 01", "test comment 02"],
            attachments: [
              "test attachment 01",
              "test attachment 02",
              "test attachment 03",
            ],
          },
        ],
      },
      {
        _id: "column-id-02",
        boardId: "board-id-01",
        title: "Benefits",
        cardOrderIds: ["card-id-08", "card-id-09", "card-id-10"],
        cards: [
          {
            _id: "card-id-08",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title:
              "We offer full time employees a range of great benefits! learn all about them bellow",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-09",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title: "Health",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-10",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title: "Dental",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-10",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title: "Disability Insurance",
            description: "Markdown Syntax (sẽ ở khóa nâng cao nhé)",
            cover: "http://monitor.tscovn.com:9001/Data/GA/hungvo/IMG_7713.JPG",
            memberIds: [],
            comments: [],
            attachments: [],
          },
        ],
      },
      {
        _id: "column-id-03",
        boardId: "board-id-01",
        title: "Vacation, Holidays, And Time Off ",
        cardOrderIds: ["card-id-11", "card-id-12", "card-id-13"],
        cards: [
          {
            _id: "card-id-11",
            boardId: "board-id-01",
            columnId: "column-id-03",
            title: "Vacation Policies",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-12",
            boardId: "board-id-01",
            columnId: "column-id-03",
            title: "Noel",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-13",
            boardId: "board-id-01",
            columnId: "column-id-03",
            title: "New Year",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
        ],
      },
      {
        _id: "column-id-04",
        boardId: "board-id-01",
        title: "Orther",
        cardOrderIds: ["column-id-04-placeholder-card"],
        cards: [
          {
            _id: "column-id-04-placeholder-card",
            boardId: "board-id-01",
            columnId: "column-id-04",
            FE_PlaceholderCard: true,
          },
        ],
      },
    ],
  },
};
