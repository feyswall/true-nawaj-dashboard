export const isAuthorized = (role: string | null, allowedRoles: string[]): boolean => {
  return allowedRoles.includes(role || '');
};
