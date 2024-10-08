const filterUniqueSize = (productArray: any) => {
  console.log("filterUniqueSize");
  const colorMap = new Map();
  console.log(productArray, "RES===");
  if (productArray) {
    const data = [...productArray];
    data.forEach((item: any) => {
      const colorOption = item.node.selectedOptions.find(
        (option: any) => option.name === "Size"
      );
      console.log(colorOption, "colorOption");
      if (colorOption) {
        const colorValue = colorOption.value;

        if (!colorMap.has(colorValue)) {
          colorMap.set(colorValue, []);
        }

        colorMap.get(colorValue).push(item);
      }
    });

    // Filter the objects with the same color
    const resultArray: any = [];
    console.log(colorMap, "colorMap");
    colorMap.forEach((items) => {
      console.log("items.length", items.length);
      if (items.length >= 1) {
        console.log("IFAYAJ", "if");
        // If you want only arrays with more than one object with the same color
        // resultArray.push(...items);

        // If you want to include only the first item with the same color
        resultArray.push(items[0]);
      }else{
        console.log("ELSEAYAJ", "else");
      }
    });
    console.log(resultArray, "NEW_FILTER_KATHOLANE====");
    return resultArray;
  }
};

export default filterUniqueSize;
