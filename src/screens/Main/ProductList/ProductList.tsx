import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BannerStrip, Header, SectionItem} from '../../../components';
import {useGetProducts} from '../../../Api/hooks';
import {getHeight, getWidth} from '../../../Theme/Constants';
import Colors from '../../../Theme/Colors';
import CommonStyles from '../../../Theme/CommonStyles';
import SvgIcon from '../../../assets/SvgIcon';
import Translation from '../../../assets/i18n/Translation';
import strings from '../../../assets/i18n/strings';
import screens from '../../../Navigation/screens';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import BottomSheet from '../../../components/BottomSheet/BottomSheetFilter';
import BottomSheetFilter from '../../../components/BottomSheet/BottomSheetFilter';
import BottomSheetSort, {
  sortType,
} from '../../../components/BottomSheet/BottomSheetSort';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const ProductList = ({route, navigation}: any) => {
  const {title = '', category = '', offerList = {}} = route?.params || {};
  const [search, setSearch] = useState<any>('');
  const {products} = useGetProducts(category, 200, '');
  const [productsData, setProducts] = useState<any>([]);
  const [showFilterSheet, setshowFilterSheet] = useState<boolean>(false);
  const [showSortSheet, setshowSortSheet] = useState<boolean>(false);
  const {count} = useSelector((state: RootState) => state.CartReducer);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [inStock, setInStock] = useState(true);
  const [outOfStock, setOutOfStock] = useState(true);

  useEffect(() => {
    console.log(JSON.stringify(offerList), 'LIST======');
    if (products && products.length > 0) {
      setProducts(products);
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    filter(minAmount, maxAmount, inStock, outOfStock);
  }, [search]);

  const filter = (
    minAmount: any,
    maxAmount: any,
    inStock: any,
    outOfStock: any,
  ) => {
    setMinAmount(minAmount);
    setMaxAmount(maxAmount);
    setInStock(inStock);
    setOutOfStock(outOfStock);
    let tempArray = productsData.filter(
      (edge: any) =>
        edge.node.title.toLowerCase().includes(search.toLowerCase()) &&
        (edge.node?.availableForSale == inStock ||
          !edge.node?.availableForSale == outOfStock) &&
        edge.node?.priceRange?.minVariantPrice?.amount >= minAmount &&
        edge.node?.priceRange?.minVariantPrice?.amount <= maxAmount,
    );
    setFilteredProducts(tempArray);
    setshowFilterSheet(false);
  };

  const sort = (selectedSort: any) => {
    setshowSortSheet(false);
    if (selectedSort == sortType.lowToHigh) {
      let tempArray = productsData.sort(
        (a: any, b: any) =>
          a.node?.priceRange?.minVariantPrice?.amount -
          b.node?.priceRange?.minVariantPrice?.amount,
      );
      setFilteredProducts(tempArray);
    } else if (selectedSort == sortType.highToLow) {
      let tempArray = productsData.sort(
        (a: any, b: any) =>
          b.node?.priceRange?.minVariantPrice?.amount -
          a.node?.priceRange?.minVariantPrice?.amount,
      );
      setFilteredProducts(tempArray);
    } else if (selectedSort == sortType.discending) {
      let tempArray = productsData.sort((a: any, b: any) =>
        b.node?.title.localeCompare(a.node?.title),
      );
      setFilteredProducts(tempArray);
    } else if (selectedSort == sortType.ascending) {
      let tempArray = productsData.sort((a: any, b: any) =>
        a.node?.title.localeCompare(b.node?.title),
      );
      setFilteredProducts(tempArray);
    }
  };
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);
  return (
    <View style={{backgroundColor: Colors.white}}>
      <Header
        title={title}
        cartCount={count}
        onSearch={(text: any) => setSearch(text)}
        searchValue={search}
        hideSearch={true}
        onCloseSearch={() => setSearch('')}
        page="list"
      />
      <BannerStrip />
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={filteredProducts}
        numColumns={2}
        renderItem={({item, index}: any) => {
          return (
            <SectionItem
              key={index}
              onPress={() => {
                navigation.navigate(screens.productDetails, {
                  id: item?.node?.id,
                  handle: item?.node?.handle,
                  pageNavigation: 'product_List',
                });
              }}
              marginLeft={25}
              price={item?.node?.priceRange?.minVariantPrice?.amount}
              image={{uri: item?.node?.images?.edges[0]?.node?.url}}
              name={item?.node?.title}
              offerPrice={
                item?.node?.variants?.edges[0]?.node?.compareAtPrice?.amount
              }
              offerList={offerList}
            />
          );
        }}
      />
      {/* <View style={styles.sortFilterContainer}>
        <TouchableOpacity
          style={[
            CommonStyles.containerFlex1,
            CommonStyles.contentCenter,
            CommonStyles.flexRowContainer,
            styles.borderLine,
          ]}
          onPress={() => setshowFilterSheet(true)}
        >
          <SvgIcon.FilterIcon />
          <Text style={styles.textFilter}>
            <Translation textKey={strings.filter} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            CommonStyles.containerFlex1,
            CommonStyles.contentCenter,
            CommonStyles.flexRowContainer,
          ]}
          onPress={() => setshowSortSheet(true)}
        >
          <SvgIcon.SortIcon width={getHeight(30)} height={getHeight(30)} />
          <Text style={styles.textFilter}>
            <Translation textKey={strings.sort} />
          </Text>
        </TouchableOpacity>
      </View> */}
      <BottomSheetFilter
        isVisible={showFilterSheet}
        onClose={() => setshowFilterSheet(false)}
        onApply={(minAmount, maxAmount, inStock, outOfStock) =>
          filter(minAmount, maxAmount, inStock, outOfStock)
        }
      />
      <BottomSheetSort
        isVisible={showSortSheet}
        onClose={() => setshowSortSheet(false)}
        onApply={selectedSort => sort(selectedSort)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  sortFilterContainer: {
    position: 'absolute',
    bottom: getHeight(6),
    minHeight: getHeight(16),
    backgroundColor: Colors.primary,
    width: getWidth(1.5),
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFilter: {
    color: Colors.white,
    fontWeight: '500',
    marginLeft: 10,
    fontSize: getHeight(55),
  },
  borderLine: {
    borderRightWidth: 1,
    height: '60%',
    borderRightColor: Colors.white,
  },
  listContainer: {
    minHeight: getHeight(1),
    marginTop: getHeight(45),
    paddingRight: getHeight(45),
    paddingBottom: getHeight(4),

    // alignSelf: 'center',
  },
});
export default ProductList;
