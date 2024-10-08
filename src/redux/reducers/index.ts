import { combineReducers } from "redux";
import globalReducer from "./GlobalReducer";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import TokenReducer from "./TokenReducer";

const rootReducer = combineReducers({
  globalReducer: globalReducer,
  AuthReducer: AuthReducer,
  CartReducer: CartReducer,
  TokenReducer: TokenReducer,
});

export default rootReducer;
