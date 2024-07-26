export const SearchFilter = (data, searchTerm) => {
  if (!searchTerm) return data;
  return data.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        const lowerCaseValue = value.toString().toLowerCase();
        return lowerCaseValue.includes(searchTerm.toLowerCase());
      }
      return false;
    });
  });
};
