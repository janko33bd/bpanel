import * as types from '../constants/node';
import { setChainInfo, getGenesisBlock } from './chainActions';

export function setNodeInfo(info) {
  return {
    type: types.SET_NODE,
    payload: info
  };
}

export function requestingNode(loadingState) {
  return {
    type: types.SET_LOADING,
    payload: loadingState
  };
}

export function setBcoinUri(uri) {
  return {
    type: types.SET_BCOIN_URI,
    payload: uri
  };
}

export function getNodeInfo() {
  return dispatch => {
    dispatch(requestingNode(true));
    dispatch(getServerInfo());
    dispatch(getGenesisBlock());
    return fetch('/node')
      .then(response => response.json())
      .then(nodeInfo => {
        dispatch(requestingNode(false));
        dispatch(setNodeInfo(nodeInfo));
        dispatch(setChainInfo(nodeInfo.chain));
      })
      .catch(e => e);
  };
}

export function getServerInfo() {
  return dispatch => {
    return fetch('/server')
      .then(response => response.json())
      .then(serverInfo => {
        dispatch(setBcoinUri(serverInfo.bcoinUri));
      })
      .catch(e => e);
  };
}
export default {
  setNodeInfo,
  requestingNode,
  getNodeInfo
};
