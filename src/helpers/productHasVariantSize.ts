const productHasVariantSize = (productArray = []) => {
  let hasSize = false;

  productArray.forEach((item:any) => {
    if (item?.node?.selectedOptions) {
      item.node.selectedOptions.forEach((option:any) => {

        if (option?.name === "Size") {
          hasSize = true;
        }
      });
    }
  });

  return hasSize;
};

export default productHasVariantSize;
