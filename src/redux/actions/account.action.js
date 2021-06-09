import { CREATE_ACCOUNT, GET_USER_ACCOUNT } from '../constants';

export function createAccount(params) {
  return {
    type: CREATE_ACCOUNT,
    payload: params,
  }
}
export function getUser(params) {
    return {
      type: GET_USER_ACCOUNT,
      payload: params,
    }
  }
  
