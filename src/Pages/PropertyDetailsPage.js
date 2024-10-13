import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Swiper from 'react-native-swiper';
import {getData} from '../common/common';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../common/Loader';

const PropertyDetailsPage = props => {
  const FirstRoute = () => (
    <View style={{borderWidth: 1, borderColor: '#fbc531'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="bed"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].room} Rooms
          </Text>
        </View>

        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="bath"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].bathroom} Bathrooms
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="car"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].car_parking} Parkings
          </Text>
        </View>

        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="expand-arrows-alt"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].square_feet} Sqft
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="newspaper"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].unit} Unit
          </Text>
        </View>

        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="home"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].kitchen} Kitchen
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="expand-arrows-alt"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].floor} Floor
          </Text>
        </View>

        <View style={styles.mngContentViewTabbing}>
          <FontAwesome5
            style={styles.icon}
            color="#464646"
            name="chevron-left"
            size={17}
          />
          <Text style={styles.featureNameDisplayTabbing}>
            {data && data[0] && data[0].lefts} Left
          </Text>
        </View>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={{borderWidth: 1, borderColor: '#fbc531'}}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '400',
          textAlign: 'justify',
          color: '#464646',
          margin: 10,
          lineHeight: 25,
        }}>
        {data && data[0] && data[0].description}
      </Text>
    </View>
  );
  const ThirdRoute = () => (
    <View style={{borderWidth: 1, borderColor: '#fbc531'}}>
      <FlatList
        data={amenityInfo}
        keyExtractor={item => item.aminity_name.toString()}
        numColumns={2}
        renderItem={({item, index}) => (
          <View key={index} style={styles.mngContentViewTabbing}>
            <FontAwesome5
              style={styles.icon}
              color="#464646"
              name="check"
              size={17}
            />
            <Text style={styles.featureNameDisplayTabbing}>
              {item.aminity_name}
            </Text>
          </View>
        )}
      />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={{
          backgroundColor: '#ccc',
        }}
        indicatorStyle={{
          backgroundColor: '#fbc531',
          height: 100,
        }}
        labelStyle={{
          color: '#002046',
          fontWeight: '600',
          fontSize: 12,
        }}
        activeLabelStyle={{
          color: 'yellow',
        }}
      />
    );
  };

  const propId = props && props.route.params.id;

  const [data, SetData] = useState([]);
  const [sliderImages, SetSliderImages] = useState([]);
  const [amenityInfo, SetAmenityInfo] = useState([]);
  const [onLoadingBtn, setOnLoadingBtn] = useState(false);

  console.log('amenityInfo----', amenityInfo);

  // const images = data && data[0].all_image;

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setOnLoadingBtn(true);
        let res = await getData(`property-detail/${propId}`);
        console.log('responce123---', res.data);
        setOnLoadingBtn(false);
        if (res.statusCode == 200) {
          for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            if (element.all_image) {
              SetSliderImages(element.all_image);
              SetAmenityInfo(element.amenity);
            }
          }

          SetData(res.data);
        }

        return;
      }

      fetchData();
    }, [propId]),
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Overview'},
    {key: 'second', title: 'Description'},
    {key: 'third', title: 'Amenities'},
  ]);

  const handleBack = () => {
    props.navigation.navigate('HomePage');
  };

  // const newListData = [
  //     { id: 1, title: 'Green Valley', cityName: "Tappal, Jewar", price: "425000", availableFrom: "04 Oct 2023" },
  // ];

  const ListItem = ({item}) => (
    <View style={styles.itemNewListed}>
      <View style={styles.msngImageView}>
        <View style={styles.positionMngAcor}>
          <Text style={styles.titleNewList}>{item.title}</Text>

          <View style={styles.mngContentView}>
            <FontAwesome5
              style={styles.icon}
              color="#FFF000"
              name="map-marked-alt"
              size={20}
            />
            <Text style={styles.cityPriceName}>
              {item.location}, {item.city}
            </Text>
          </View>

          <View style={styles.featurePropBottom}>
            <View style={styles.mngContentView}>
              <FontAwesome5
                style={styles.icon}
                color="#FFF000"
                name="rupee-sign"
                size={15}
              />
              <Text style={styles.featureNameDisplay}>
                {item.price && item.price}
              </Text>
            </View>
            <View style={styles.mngContentView}>
              <Fontisto
                style={styles.icon}
                color="#FFF000"
                name="date"
                size={15}
              />
              <Text style={styles.featureNameDisplay}>
                {item.available_time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const openWhatsApp = () => {
    const phoneNumber = '9971681165';
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

    Linking.openURL(whatsappUrl).catch(error =>
      console.error('Error opening WhatsApp: ', error),
    );
  };

  const openDialer = () => {
    const phoneNumber = '8588880022'; // Replace with the desired phone number
    const dialerUrl = `tel:${phoneNumber}`;

    Linking.openURL(dialerUrl).catch(error =>
      console.error('Error opening phone dialer: ', error),
    );
  };

  return (
    <>
      {onLoadingBtn ? <Loader /> : ''}
      <View style={styles.topTitleMsg}>
        <TouchableOpacity style={styles.topArrowMnsg} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={25} color="#000" />
          <Text style={styles.topMsgComponent}>Property Details</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.newFeatureProList}>
          <View style={styles.container}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              showsPagination={false}>
              {sliderImages.map((image, index) => (
                <View key={index} style={styles.slide}>
                  <Image source={{uri: image.images}} style={styles.image} />
                </View>
              ))}
            </Swiper>
          </View>

          <FlatList
            data={data}
            keyExtractor={item => item.city.toString()}
            renderItem={({item}) => <ListItem item={item} />}
          />

          <View style={styles.rowComplex}>
            <TouchableOpacity
              style={styles.mngSocialMedia}
              onPress={openDialer}>
              <Feather
                style={styles.icon}
                color="#FFF000"
                name="phone-call"
                size={22}
              />
              <Text style={[styles.callUsMsg, {color: '#FFF000'}]}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mngSocialMedia}
              onPress={openWhatsApp}>
              <FontAwesome
                style={styles.icon}
                color="#4DC247"
                name="whatsapp"
                size={22}
              />
              <Text style={[styles.callUsMsg, {color: '#4DC247'}]}>
                Whatsapp
              </Text>
            </TouchableOpacity>
          </View>

          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            style={{height: 300}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PropertyDetailsPage;

const styles = StyleSheet.create({
  topTitleMsg: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topArrowMnsg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topMsgComponent: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    fontSize: 17,
  },
  // --------------------------------------

  imageNewList: {
    width: '100%',
    height: 300,
    // borderRadius: 10,
  },
  newFeatureProList: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleNewList: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 10,
    marginTop: 15,
  },

  itemNewListed: {
    marginBottom: 0,
    marginTop: 0,
  },
  mngContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    padding: 10,
  },
  cityPriceName: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
  },
  featureNameDisplay: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
  },
  featurePropBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  msngImageView: {},
  positionMngAcor: {
    backgroundColor: '#000',
  },
  mngContentViewTabbing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    padding: 10,
  },
  featureNameDisplayTabbing: {
    fontSize: 17,
    color: '#464646',
    marginLeft: 10,
    fontWeight: '500',
  },
  // ------------------------------
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  // ------------------------------
  mngSocialMedia: {
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15,
    marginTop: 10,
  },
  callUsMsg: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '600',
  },
  rowComplex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
