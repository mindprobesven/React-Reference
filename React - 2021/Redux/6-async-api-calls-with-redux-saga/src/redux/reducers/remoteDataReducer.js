import { UPDATE_REMOTE_DATA_STATE } from '../constants/remoteData';

/*
The posts data fetched from the API is stored by categoryID in
remoteDataState
*/
export default function remoteDataReducer(state = {}, action) {
  switch (action.type) {
  case UPDATE_REMOTE_DATA_STATE: {
    console.log('remoteDataReducer: (UPDATE_REMOTE_DATA_STATE)');

    const { categoryId, postsData } = action.payload;
    return { ...state, [categoryId]: postsData };
  }
  default:
    return state;
  }
}
