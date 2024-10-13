import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import ScrollViewImage from '../bottom/ScrollViewImage';
const {height, width} = Dimensions.get('window');
import {Dropdown} from 'react-native-element-dropdown';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {getData} from '../common/common';
import Loader from '../common/Loader';

const HomePage = props => {
  const [onLoadingBtn, setOnLoadingBtn] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Buy');

  const handleGoProfile = () => {
    props.navigation.navigate('ProfileScreen');
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setOnLoadingBtn(true);
        let res = await getData(`get-city`);
        setOnLoadingBtn(false);
        if (res.statusCode == 200) {
          let tempDataCity = [];
          //   console.log("responce123---", res.data)
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            if (element) {
              tempDataCity.push({value: element.id, label: element.name});
            }
            // console.log("element---",tempDataCity)
          }
          setCityData(tempDataCity);
        }

        return;
      }

      fetchData();
    }, []),
  );

  const handleValueChange = value => {
    setSelectedValue(value);
  };

  const handleSearchProperty = () => {
    if (value) {
      props.navigation.navigate('SearchPage', {selectedValue: value});
    }
  };

  return (
    <>
      {onLoadingBtn ? <Loader /> : ''}
      <TouchableOpacity style={styles.topArrowMnsg} onPress={handleGoProfile}>
        <Feather name="menu" size={28} color="#fff" />
        <View style={styles.homeHorizontal}>
          <View>
            <Image
              style={styles.logoImage}
              source={require('../assets/logo.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.HomeContainer}>
          {/* ----------- Welcome Screen ---------------- */}
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={styles.welcomeMessage}>
              Welcome to Mithila Properties
            </Text>
            <Text style={styles.PropertiesByCity}>
              Properties to buy in Delhi
            </Text>
          </View>

          <ScrollView
            horizontal={true} // Enable horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide the scroll indicator if desired
            contentContainerStyle={styles.container} // Apply styles to the scroll container
          >
            <View style={styles.containerType}>
              <TouchableOpacity
                style={[
                  styles.valueButton,
                  selectedValue === 'Buy' && styles.selectedButton,
                ]}
                onPress={() => handleValueChange('Buy')}>
                <Text
                  style={[
                    styles.valueText,
                    selectedValue === 'Buy' && styles.selectedText,
                  ]}>
                  Buy Properties
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.valueButton,
                  selectedValue === 'Rent' && styles.selectedButton,
                ]}
                onPress={() => handleValueChange('Rent')}>
                <Text
                  style={[
                    styles.valueText,
                    selectedValue === 'Rent' && styles.selectedText,
                  ]}>
                  Rent Properties
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.valueButton,
                  selectedValue === 'Commercial' && styles.selectedButton,
                ]}
                onPress={() => handleValueChange('Commercial')}>
                <Text
                  style={[
                    styles.valueText,
                    selectedValue === 'Commercial' && styles.selectedText,
                  ]}>
                  Commercial
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.valueButton,
                  selectedValue === 'Plots' && styles.selectedButton,
                ]}
                onPress={() => handleValueChange('Plots')}>
                <Text
                  style={[
                    styles.valueText,
                    selectedValue === 'Plots' && styles.selectedText,
                  ]}>
                  Plots
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* --------------- Search Box start here ------------- */}

          <View style={styles.containerSearchbox}>
            <View style={styles.containerCity}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cityData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select City' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <EvilIcons
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="location"
                    size={20}
                  />
                )}
              />
            </View>
            <TouchableOpacity
              onPress={handleSearchProperty}
              style={styles.iconSearchStyle}>
              <FontAwesome5
                style={styles.iconSearchStyle}
                color="#fff"
                name="search-location"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollViewImage props={props} />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  topTitleMsg: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    height: 20,
  },
  topArrowMnsg: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingLeft: 10,
    paddingVertical: 5,
  },
  topMsgComponent: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    fontSize: 18,
    paddingVertical: 12,
  },
  HomeContainer: {
    backgroundColor: '#000000c7',
    padding: 20,
  },
  logoImage: {
    height: 45,
    width: 150,
  },
  homeHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  // ----------------- dropdown css -----------------

  containerCity: {
    width: '100%',
    color: '#fff',
  },
  dropdown: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    color: '#fff',
    height: 40,
    width: '80%',
  },
  icon: {
    marginRight: 5,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 17,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 17,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  iconSearchStyle: {
    width: 25,
    height: 25,
  },
  iconSearchStyle: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#fbc531',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  // ----------------- dropdown css -----------------
  welcomeMessage: {
    color: '#fbc531',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
  },
  PropertiesByCity: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  // ------------------------ select type css ------------
  containerType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  valueButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  valueText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderColor: '#fbc531',
  },
  selectedText: {
    color: 'white',
  },
  // ------------------------ select type css ------------

  // -------------------------- Search List ----------------
  containerSearchbox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    marginTop: 22,
    marginBottom: 25,
    position: 'relative',
    overflow: 'hidden',
  },
  input: {
    height: 40,
    fontSize: 17,
    padding: 10,
  },
  // -------------------------- Search List ----------------
});

export default HomePage;
