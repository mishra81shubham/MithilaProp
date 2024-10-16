import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getData} from '../common/common';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Loader from '../common/Loader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {max} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
export default function ScrollViewImage({props}) {
  const [data, SetData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [newListData, SetNewListData] = useState([]);
  const [onLoadingBtn, setOnLoadingBtn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setOnLoadingBtn(true);
        let res = await getData(`home-screen-data`);
        // console.log("responce---", res)
        setOnLoadingBtn(false);
        if (res.statusCode == 200) {
          // console.log("responce---1235", res.new_listed)
          SetData(res.feature_property);
          SetNewListData(res.new_listed);
          setCityData(res.cities);
        }

        return;
      }

      fetchData();
    }, []),
  );
  const handelSearchDetails = id => {
    props.navigation.navigate('PropertyDetailsPage', {id: id});
  };
  const handelCityData = id => {
    props.navigation.navigate('PropertyList', {id: id});
  };

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const ListItem = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => handelSearchDetails(item.id)}
        style={{
          height: height / 2,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          marginTop: 20,
        }}>
        <Image style={styles.propertyImage} source={{uri: item.image}} />
        <View style={styles.positionMngAcormy}>
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
                {`${item.price && item.price} ${item?.price_unit}`}
              </Text>
            </View>
            <View style={styles.mngContentView}>
              <FontAwesome5
                style={styles.icon}
                color="#FFF000"
                name="rupee-sign"
                size={15}
              />
              <Text style={styles.featureNameDisplay}>
                {`${item.price_per_sqft && item.price_per_sqft} Sq.Ft`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rowComplex}>
          <TouchableOpacity style={styles.mngSocialMedia} onPress={openDialer}>
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
            <Text style={[styles.callUsMsg, {color: '#4DC247'}]}>Whatsapp</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#ccc',
          height: 3,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      />
    </>
  );

  const ListItemFeature = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => handelSearchDetails(item.id)}
        style={{
          height: height / 2,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          marginTop: 20,
        }}>
        <Image style={styles.propertyImage} source={{uri: item.image}} />
        <View style={styles.positionMngAcormy}>
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
                {`${item.price && item.price} ${item?.price_unit}`}
              </Text>
            </View>
            <View style={styles.mngContentView}>
              <FontAwesome5
                style={styles.icon}
                color="#FFF000"
                name="rupee-sign"
                size={15}
              />
              <Text style={styles.featureNameDisplay}>
                {`${item.price_per_sqft && item.price_per_sqft} Sq.Ft`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rowComplex}>
          <TouchableOpacity style={styles.mngSocialMedia} onPress={openDialer}>
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
            <Text style={[styles.callUsMsg, {color: '#4DC247'}]}>Whatsapp</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <>
      {onLoadingBtn ? <Loader /> : ''}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.featureProperties}>Featured Properties</Text>
        <View
          style={{
            height: height / 2 + 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / width).toFixed(0));
            }}
            horizontal
            renderItem={({item}) => <ListItemFeature item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          {data.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  width: currentIndex == index ? 40 : 8,
                  height: currentIndex == index ? 10 : 8,
                  borderRadius: currentIndex == index ? 5 : 4,
                  backgroundColor: currentIndex == index ? '#fbc531' : 'gray',
                  marginLeft: 5,
                }}></View>
            );
          })}
        </View>
      </View>
      <View style={styles.newFeatureProList}>
        <Text style={[styles.featureProperties, {marginBottom: 20}]}>
          New Listed Properties
        </Text>
        <FlatList
          data={newListData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListItem item={item} />}
        />
      </View>

      <Text style={styles.featureProperties}>City</Text>
      <View
        style={{
          height: height / 2 + 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={cityData}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width).toFixed(0));
          }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handelCityData(item.id)}
                style={{
                  width: width - 50,
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.propertyImage}
                  source={{uri: item.image}}
                />

                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: '600',
                    color: '#002046',
                    fontSize: 18,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  propertyImage: {
    width: '90%',
    height: '60%',
  },
  imageNewList: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  featureProperties: {
    fontSize: 22,
    fontWeight: '600',
    color: '#002046',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  itemNewListed: {
    marginBottom: 30,
  },
  mngContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    padding: 10,
  },
  msngImageView: {
    position: 'relative',
  },

  // -----------------------------
  imageNewList: {
    width: '100%',
    height: 300,
    // borderRadius: 10,
  },
  newFeatureProList: {
    marginTop: 20,
  },
  titleNewList: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 15,
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
  positionMngAcor: {
    backgroundColor: '#000',
    width: 310,
  },

  positionMngAcormy: {
    backgroundColor: '#000',
    width: '90%',
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
    margin: 10,
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
    marginBottom: 40,
  },
});
