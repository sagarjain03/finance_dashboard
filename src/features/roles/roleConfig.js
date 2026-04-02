import { ROLES } from "../../constants/roles";

export const rolePermissions = {
  [ROLES.ADMIN]: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
  },
  [ROLES.VIEWER]: {
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
};