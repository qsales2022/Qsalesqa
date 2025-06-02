const filterUniqueItem = (productArray: any, value: string) => {
  // console.log(productArray[0]?.node?.selectedOptions, 'COLOR_MAP_11');

  const itemMap = new Map();
  if (productArray) {
    let data = [...productArray];
    data.forEach((item: any) => {
      const colorOption = item.node.selectedOptions.find(
        (option: any) => option.name === value,
      );

      if (colorOption) {
        const colorValue = colorOption.value;

        if (!itemMap.has(colorValue)) {
          itemMap.set(colorValue, []);
        }
        itemMap.get(colorValue).push(item);
      }
    });
    // Filter the objects with the same color
    const resultArray: any = [];
    itemMap.forEach(items => {
      if (items.length >= 1) {
        // If you want only arrays with more than one object with the same color
        // resultArray.push(...items);
        // If you want to include only the first item with the same color

        resultArray.push(items[0]);
      }
    });
    // if(resultArray?.length){
    //     console.log(resultArray,value,'resultArrayresultArray');

    //     throw new Error('dsfa')


    // }

     
    return resultArray;
  }
};
export default filterUniqueItem;
