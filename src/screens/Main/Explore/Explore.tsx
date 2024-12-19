import React, {useCallback, useEffect, useState} from 'react';
import {CategoryItem, Header} from '../../../components';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import Colors from '../../../Theme/Colors';
import strings from '../../../assets/i18n/strings';
import {useGetCollections} from '../../../Api/hooks';
import {getHeight} from '../../../Theme/Constants';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import screens from '../../../Navigation/screens';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import ExploreItems from './ExploreItems';
import SkeletonCard from '../../../components/skeletonCard/SkeletonCard';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const Explore = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {collections} = useGetCollections(100);
  const [categoryList, setCategoryList] = useState<any>([]);
  const {count} = useSelector((state: RootState) => state.CartReducer);
  const [searchText, setSearchText] = useState('');
  const [homeDecor, setDecor] = useState<any>([]);
  const [kitchenSuppliesList, setKitchenSupplies] = useState<any>([]);
  const [BathLaundryList, setBathLaundry] = useState<any>();
  const [momBabyList, setMomBaby] = useState<any>([]);
  const [fationFitnessList, setFationFitness] = useState<any>([]);
  const [travelOUtDoorList, setTravelOutDoor] = useState<any>([]);
  const [diyTools, setDiyTools] = useState<any>([]);
  const [electronicLightingList, setElectronic] = useState<any>([]);

  console.log(categoryList, 'this cato list ');

  const decorUpdate = useCallback(() => {
    if (categoryList.length > 0) {
      const decorProducts = categoryList?.filter((edge: any) => {
        return (
          edge.node.handle === 'home-organization' ||
          edge.node.handle === 'home-cleaning' ||
          edge.node.handle === 'rugs-floor-mats' ||
          edge.node.handle === 'bedsheet-mattress' ||
          edge.node.handle === 'wardrobe-organization' ||
          edge.node.handle === 'racks-storage' ||
          edge.node.handle === 'shoe-racks-cabinets' ||
          edge.node.handle === 'home-care'
        );
      });

      setDecor(decorProducts);
    }
  }, [categoryList]);
  const UpdateKitchenSupplies = useCallback(() => {
    if (categoryList.length > 0) {
      const KitchenSupplies = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'cooking-appliances' ||
          edge.node.handle === 'kitchen-improvement' ||
          edge.node.handle === 'kitchen-organization' ||
          edge.node.handle === 'kitchen-cleaning' ||
          edge.node.handle === 'cookware-cutleries-mugs' ||
          edge.node.handle === 'food-dispensers-storage' ||
          edge.node.handle === 'refrigeration-storage' ||
          edge.node.handle === 'juicers-blenders-grinders'
        );
      });

      setKitchenSupplies(KitchenSupplies);
    }
  }, [categoryList]);

  const UpdateBathAndLaundry = useCallback(() => {
    if (categoryList.length > 0) {
      const BathLaundry = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'bathroom-organization' ||
          edge.node.handle === 'laundry-baskets' ||
          edge.node.handle === 'bathroom-laundry-supplies' ||
          edge.node.handle === 'faucet-shower'
        );
      });

      setBathLaundry(BathLaundry);
    }
  }, [categoryList]);

  const UpdateMomBaby = useCallback(() => {
    if (categoryList.length > 0) {
      const MomBaby = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'baby-care' ||
          edge.node.handle === 'mom-essentials' ||
          edge.node.handle === 'diaper-bags' ||
          edge.node.handle === 'child-toddler'
        );
      });

      setMomBaby(MomBaby);
    }
  }, [categoryList]);
  const UpdateFationFitness = useCallback(() => {
    if (categoryList.length > 0) {
      const fationFitness = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'bags-pouches' ||
          edge.node.handle === 'cosmetics-makeup' ||
          edge.node.handle === 'fitness-personal-care' ||
          edge.node.handle === 'air-perfumes'
        );
      });
      setFationFitness(fationFitness);
    }
  }, [categoryList]);

  const UpdateTravelOutDoor = useCallback(() => {
    if (categoryList.length > 0) {
      const TravelOutDoor = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'travel-bags-organization' ||
          edge.node.handle === 'travel-essentials' ||
          edge.node.handle === 'Camping Goods & Supplies' ||
          edge.node.handle === 'car-accessories' ||
          edge.node.handle === 'gardening-outdoor' ||
          edge.node.handle === 'pet-supplies'
        );
      });
      setTravelOutDoor(TravelOutDoor);
    }
  }, [categoryList]);

  const UpdateDiyTools = useCallback(() => {
    if (categoryList.length > 0) {
      const DiyTools = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'diy-tools' ||
          edge.node.handle === 'tech-gadgets' ||
          edge.node.handle === 'mobile-computer-accessories' ||
          edge.node.handle === 'iphone-cases'
        );
      });
      setDiyTools(DiyTools);
    }
  }, [categoryList]);

  const UpdateElectronicLighting = useCallback(() => {
    if (categoryList.length > 0) {
      const ElectronicLighting = categoryList.filter((edge: any) => {
        return (
          edge.node.handle === 'indoor-lighting-shade-lamps' ||
          edge.node.handle === 'outdoor-lighting' ||
          edge.node.handle === 'electronics-smart-home'
        );
      });
      setElectronic(ElectronicLighting);
    }
  }, [categoryList]);

  useEffect(() => {
    if (collections && collections.length > 0) {
      setCategoryList(collections);
    }
  }, [collections]);

  useEffect(() => {
    decorUpdate();
    UpdateKitchenSupplies();
    UpdateBathAndLaundry();
    UpdateMomBaby();
    UpdateFationFitness();
    UpdateTravelOutDoor();
    UpdateDiyTools();
    UpdateElectronicLighting();
  }, [categoryList]);

  const filteredProducts = homeDecor.filter((edge: any) =>
    edge.node.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);
  return (
    <>
      <View style={{backgroundColor: Colors.white}}>
        <Header
          title={strings.categories}
          cartCount={count}
          searchValue={searchText}
          onSearch={(text: any) => setSearchText(text)}
          onCloseSearch={() => setSearchText('')}
          hideSearch={true}
        />
        {/* <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          
          data={filteredProducts.filter(
            (edge: any) => edge.node.products?.edges.length > 0
          )}
          removeClippedSubviews
          numColumns={2}
          renderItem={({ item, index }: any) => {
            return (
              <>
                {item?.node?.products?.edges.length > 0 && (
                  <CategoryItem
                    key={index}
                    onPress={() =>
                      navigation.navigate(screens.productList, {
                        title: item?.node?.title,
                        category: item?.node?.handle,
                      })
                    }
                    image={item?.node?.image?.originalSrc}
                    name={item?.node?.title}
                  />
                )}
              </>
            );
          }}
        /> */}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{
          minHeight: getHeight(1.5),
          backgroundColor: Colors.white,
          paddingBottom: getHeight(60),
        }}>
        {categoryList.length > 0 ? (
          <>
            <ExploreItems
              title="Home Decor"
              items={homeDecor}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Home Care',
                  category: 'home-care',
                })
              }
            />
            <ExploreItems
              title="Kitchen Supplies"
              items={kitchenSuppliesList}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Kitchen Supplies',
                  category: 'kitchen-improvement',
                })
              }
            />
            <ExploreItems
              title="Bath Laundry"
              items={BathLaundryList}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Bath Laundry',
                  category: 'bathroom-organization',
                })
              }
            />
            <ExploreItems
              title="Mom Baby"
              items={momBabyList}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Mom Baby',
                  category: 'baby-care',
                })
              }
            />
            <ExploreItems
              title="Fashion Fitness"
              items={fationFitnessList}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Fashion Fitness',
                  category: 'fitness-personal-care',
                })
              }
            />
            <ExploreItems
              title="Travel Outdoor"
              items={travelOUtDoorList}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Travel Outdoor',
                  category: 'home-care',
                })
              }
            />
            <ExploreItems
              title="DIY Gadgets"
              items={diyTools}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'DIY Gadgets',
                  category: 'diy-tools',
                })
              }
            />
            <ExploreItems
              title="Electronics Lighting"
              items={electronicLightingList}
              viewAllPress={() =>
                navigation.navigate(screens.productList, {
                  title: 'Electronics Lighting',
                  category: 'indoor-lighting-shade-lamps',
                })
              }
            />
          </>
        ) : (
          <>
            <SkeletonCard
              data={[1, 2, 34, 4]}
              childViewHeight={10}
              chaildVieWidth={4}
              containerMarginTop={15}
              ContainerHeight={6}
            />
            <SkeletonCard
              data={[1, 2, 34, 4]}
              childViewHeight={10}
              chaildVieWidth={4}
              containerMarginTop={15}
              ContainerHeight={6}
            />
            <SkeletonCard
              data={[1, 2, 34, 4]}
              childViewHeight={10}
              chaildVieWidth={4}
              containerMarginTop={15}
              ContainerHeight={6}
            />
            <SkeletonCard
              data={[1, 2, 34, 4]}
              childViewHeight={10}
              chaildVieWidth={4}
              containerMarginTop={15}
              ContainerHeight={6}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    minHeight: getHeight(1),
    marginTop: getHeight(45),
    paddingRight: getHeight(45),
    paddingBottom: getHeight(5),
    alignSelf: 'center',
  },
});
export default Explore;
