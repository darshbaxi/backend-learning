import { RoleType } from "@prisma/client";

const allRoles = {
  [RoleType.CLIENT]: [],
  [RoleType.ARTIST]: [],
  [RoleType.ADMIN]: ['getUsers', 'manageUsers'],
  [RoleType.SUPER_ADMIN]: ['getUsers', 'manageUsers', 'manageAdmins']
}

export const roles = Object.keys(allRoles)
export const roleRights = new Map(Object.entries(allRoles))