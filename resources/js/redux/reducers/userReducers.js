import { createReducer } from "@reduxjs/toolkit";
import {
  createUserAction,
  deleteUserAction,
  getUserAction,
  getUsersAction,
  resetResCRUDAction,
  updateUserAction,
  selectRoleAction,
  exportReportUserAction,
  selectCompanyAction,
  getCompanyAction,
  importUserAction,
} from "../actions/userAction";
import {
  NotificationError,
  NotificationSuccess,
} from "../../commons/Notification";
const initialState = {
  users: [],
  user: undefined,
  resCreateUser: undefined,
  resUpdateUser: undefined,
  resDeleteUser: undefined,
  resExportReportUser: undefined,
  resImportReportUser: undefined,
  loadingUpdateUser: false,
  loadingCreateUser: false,
  loadingExport: false,
  loadingImport: false,
  total: undefined,
  from: undefined,
  to: undefined,
  current_page: undefined,
  last_page: undefined,
  per_page: undefined,
  selectRole: undefined,
  selectCompany: undefined,
  company: undefined,
};

const userReducers = createReducer(initialState, (builder) => {
  builder.addCase(getUsersAction.fulfilled, (state, actions) => {
    return {
      ...state,
      users: actions.payload.data.data,
      total: actions.payload.data.total,
      from: actions.payload.data.from,
      to: actions.payload.data.to,
      current_page: actions.payload.data.current_page,
      last_page: actions.payload.data.last_page,
      per_page: actions.payload.data.per_page,
    };
  });

  builder.addCase(getCompanyAction.fulfilled, (state, actions) => {
    return {
      ...state,
      company: actions.payload.data,
    };
  });

  builder.addCase(getUserAction.fulfilled, (state, actions) => {
    return {
      ...state,
      user: actions.payload.data,
    };
  });

  builder
    .addCase(createUserAction.fulfilled, (state, actions) => {
      NotificationSuccess("", actions.payload.message);
      return {
        ...state,
        resCreateUser: actions.payload,
        loadingCreateUser: false,
      };
    })
    .addCase(createUserAction.pending, (state, actions) => {
      return {
        ...state,
        loadingCreateUser: true,
      };
    })
    .addCase(createUserAction.rejected, (state, actions) => {
      NotificationError("", actions.payload?.error_message || "Error");
      return {
        ...state,
        resCreateUser: actions.payload,
        loadingCreateUser: false,
      };
    });

  builder
    .addCase(updateUserAction.fulfilled, (state, actions) => {
      NotificationSuccess("", actions.payload.message);
      return {
        ...state,
        resUpdateUser: actions.payload,
        loadingUpdateUser: false,
      };
    })
    .addCase(updateUserAction.pending, (state, actions) => {
      return {
        ...state,
        loadingUpdateUser: true,
      };
    })
    .addCase(updateUserAction.rejected, (state, actions) => {
      NotificationError("", actions.payload?.error_message || "Error");
      return {
        ...state,
        resUpdateUser: actions.payload,
        loadingUpdateUser: false,
      };
    });

  builder.addCase(deleteUserAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resDeleteUser: actions.payload,
    };
  });

  builder.addCase(resetResCRUDAction.fulfilled, (state, actions) => {
    return {
      ...state,
      resCreateUser: undefined,
      resUpdateUser: undefined,
      resDeleteUser: undefined,
    };
  });

  builder.addCase(selectRoleAction, (state, actions) => {
    return {
      ...state,
      selectRole: actions.payload,
    };
  });

  builder.addCase(selectCompanyAction, (state, actions) => {
    return {
      ...state,
      selectCompany: actions.payload,
    };
  });

  builder
    .addCase(exportReportUserAction.fulfilled, (state, actions) => {
      return {
        ...state,
        loadingExport: false,
        resExportReportUser: actions.payload,
      };
    })
    .addCase(exportReportUserAction.pending, (state, actions) => {
      return {
        ...state,
        loadingExport: true,
      };
    })
    .addCase(exportReportUserAction.rejected, (state, actions) => {
      return {
        ...state,
        loadingExport: false,
        resExportReportUser: actions.payload,
      };
    });

  builder
    .addCase(importUserAction.fulfilled, (state, actions) => {
      return {
        ...state,
        loadingImport: false,
        resImportReportUser: actions.payload,
      };
    })
    .addCase(importUserAction.pending, (state, actions) => {
      return {
        ...state,
        loadingImport: true,
      };
    })
    .addCase(importUserAction.rejected, (state, actions) => {
      NotificationError("", actions.payload.error_data.file_upload[0]);
      return {
        ...state,
        loadingImport: false,
        resImportReportUser: actions.payload,
      };
    });
});
export default userReducers;
