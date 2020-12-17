export const objectToArray = (userId, obj) =>
  obj.allIds.reduce((acc, currId) => {
    if (obj.byId[currId].userId === Number(userId)) {
      acc.push(obj.byId[currId]);
    }
    return acc;
  }, []);

export const filterObjectById = (obj, criteria) => {
  const newObject = {};
  for (let key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      key !== Number(criteria)
    ) {
      newObject[key] = obj[key];
    }
  }
  return newObject;
};
