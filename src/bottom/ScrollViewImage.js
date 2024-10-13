import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getData } from '../common/common';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../common/Loader';
const { height, width } = Dimensions.get('window');
export default function ScrollViewImage({ props }) {
  const [data, SetData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [newListData, SetNewListData] = useState([]);
  const [onLoadingBtn, setOnLoadingBtn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setOnLoadingBtn(true);
        let res = await getData(`home-screen-data`);
        console.log("responce---", res)
        setOnLoadingBtn(false);
        if (res.statusCode == 200) {
          // console.log("responce---", res)
          SetData(res.feature_property);
          SetNewListData(res.new_listed);
          setCityData(res.cities);
        }

        return;
      }

      fetchData();
    }, [])
  )
  const handelSearchDetails = (id) => {
    props.navigation.navigate("PropertyDetailsPage", { id: id });
  } 
   const handelCityData = (id) => {
    props.navigation.navigate("PropertyList", { id: id });
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const ListItem = ({ item }) => (
    <TouchableOpacity onPress={() => handelSearchDetails(item.id)} style={styles.itemNewListed} >
      <View style={styles.msngImageView}>
        <Image source={{ uri: item.image }} style={styles.imageNewList} />
        <View style={styles.positionMngAcor}>
          <View style={styles.mngContentView}>
            <FontAwesome5
              style={styles.icon}
              color="#FFF000"
              name="map-marked-alt"
              size={20}
            />
            <Text style={styles.cityPriceName}>{item.title}</Text>
          </View>
          <View style={styles.mngContentView}>
            <FontAwesome5
              style={styles.icon}
              color="#FFF000"
              name="rupee-sign"
              size={20}
            />
            <Text style={styles.cityPriceName}>{item.price}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.titleNewList}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {/* {onLoadingBtn ? <Loader /> : ""} */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.featureProperties}>Featured Properties</Text>
        <View
          style={{
            height: height / 2 + 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / width).toFixed(0));
            }}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => handelSearchDetails(item.id)}
                  style={{
                    width: width - 50,
                    height: height / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image style={styles.propertyImage} source={{ uri: item.image }} />

                  <Text style={{ marginTop: 10, fontWeight: '600', color: "#002046", fontSize: 18, }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
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
                }}
              ></View>
            );
          })}
        </View>
      </View>
      <View style={styles.newFeatureProList}>
        <Text style={[styles.featureProperties, { marginBottom: 50, }]}>New Listed Properties</Text>
        <FlatList
          data={newListData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </View>

      <Text style={styles.featureProperties}>City</Text>
      <View
        style={{
          height: height / 2 + 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FlatList
          data={cityData}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex((x / width).toFixed(0));
          }}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={()=>handelCityData(item.id)}
                style={{
                  width: width - 50,
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image style={styles.propertyImage} source={{ uri: item.image }} />

                <Text style={{ marginTop: 10, fontWeight: '600', color: "#002046", fontSize: 18, }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  propertyImage: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
  },
  imageNewList: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  featureProperties: {
    fontSize: 22,
    fontWeight: "600",
    color: "#002046",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  newFeatureProList: {
    margin: 20,
  },
  titleNewList: {
    color: "#000",
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
  },

  itemNewListed: {
    marginBottom: 30,
  },
  mngContentView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    padding: 10,
  },
  cityPriceName: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "500",
  },
  msngImageView: {
    position: "relative",
  },
  positionMngAcor: {
    position: "absolute",
    bottom: 10,
    left: 20,
    backgroundColor: 'rgba(31, 50, 80, 0.9)',
    width: "90%",
    borderRadius: 10,
    opacity: 0.65,
  },
})