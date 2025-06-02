const productHasVariantSize = (productArray = [], value: string) => {
  let hasSize = false;
  productArray.forEach((item: any) => {
    if (item?.node?.selectedOptions) {
      // console.log(item, 'itemitem');

      item.node.selectedOptions.forEach((option: any) => {
        
        if (option?.name === value  ) {
          hasSize = true;
        }
      });
    }
  });
  return hasSize;
};

export default productHasVariantSize;
