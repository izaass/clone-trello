import axios from "axios";
import { API_ROOT } from "~/utils/constants";
//boards
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return response.data;
};

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};

export const moveCardToDiffColAPI = async (updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  );
  return response.data;
};
//colums
export const createNewColAPI = async (newCol) => {
  const response = await axios.post(`${API_ROOT}/v1/columns/`, newCol);
  return response.data;
};
//update card trong 1 col
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};

//delete column
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
  return response.data;
};

//cards
export const createNewCardAPI = async (newCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/`, newCard);
  return response.data;
};
