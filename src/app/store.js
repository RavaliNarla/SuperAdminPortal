import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import organizationReducer from "../pages/organizations/hooks/orgSlice";
import authReducer from "../features/auth/authSlice";
import formSchemaReducer from "../features/formSchemas/formSchemaSlice";

import eligibilityReducer from "../pages/EligibilityConfiguration/eligibilitySlice/eligibilitySlice";

const persistConfig = {
  key: "rms-super-admin",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  organizations: organizationReducer,
  auth: authReducer,
  formSchemas: formSchemaReducer,
  eligibility: eligibilityReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
