export const homePush = (...args: any) => {
  const [updatedCategories, findCategoryIndex, products] = args;
  return new Promise<any>((resolve, reject) => {
    if (products.length > 0) resolve(updatedCategories[findCategoryIndex].item.push(...products));
  });
};
