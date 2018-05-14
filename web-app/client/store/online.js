/**
 * ACTION TYPES
 */
const NETWORK_CONNECTION_LOST = 'NETWORK_CONNECTION_LOST';
const NETWORK_CONNECTION_RESTORED = 'NETWORK_CONNECTION_RESTORED';

/**
 * ACTION CREATORS
 */
export const acNetworkConnectionLost = () => ({
  type: NETWORK_CONNECTION_LOST
});
export const acNetworkConnectionRestored = () => ({
  type: NETWORK_CONNECTION_RESTORED
});

/**
 * REDUCER
 */
export default function (state = true, action) {
  switch (action.type) {
    case NETWORK_CONNECTION_LOST:
      return false;
    case NETWORK_CONNECTION_RESTORED:
      return true;
    default:
      return state;
  }
}
