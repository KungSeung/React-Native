import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { year, month, day } from './calender.js';
import { SelectList } from 'react-native-dropdown-select-list';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';

// Slider는 4.2.4 사용해야됨

// radio button -> npm install react-native-paper
export default function App() {
  const [checked, setChecked] = useState('');

  const [gender, setGender] = useState('');

  const [yearSelected, setYearSelected] = useState('');
  const [monthSelected, setMonthSelected] = useState('');
  const [daySelected, setDaySelected] = useState('');

  // React Native 객체(json -> stringify)로 데이터 넘겨주기
  // userInfo : User Data 저장
  const [userInfo, setUserUnfo] = useState({});
  // animalInfo : Animal(Dog) Data 저장
  const [animalInfo, setAnimalInfo] = useState({});
  // matchingInfo : 매칭 상대 Info Data 저장
  const [matchingInfo, setMatchingInfo] = useState({});

  // npm start --reset-cache 메트로 서버 캐시 초기화(refresh)
  return (
    // 데이터를 입력받은걸 json 형식으로 저장
    <View style={{ flex: 1 }}>
      <View>
        <Text style={{ flexDirection: 'row', paddingLeft: 15, paddingTop: 50 }}>당신의 성별은 무엇인가요?</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
        <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('first');
            setGender('man');
          }}
        ></RadioButton>
        <Text style={{ fontSize: 15 }}>남성</Text>
        <RadioButton
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('second');
            setGender('man');
          }}
        ></RadioButton>
        <Text style={{ fontSize: 15 }}>여성</Text>
      </View>
      <View style={{ paddingLeft: 15 }}>
        <Text>생년월일을 입력해주세요.</Text>
      </View>
      <View style={{ paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
        <DropDown name="출생연도" data={year} selected={setYearSelected} />
        <DropDown name="월" data={month} selected={setMonthSelected} />
        <DropDown name="일" data={day} selected={setDaySelected} />
      </View>
      <InputText question="당신의 이름은 무엇인가요?" example="Ex)김초코, 바나나" />
      <InputText question="직업은 무엇인가요?" example="Ex) 대학생, 직장인, 프리랜서" />
      <InputText question="당신의 Mbti는?" example="Ex) Enfp, Infp, Entj" />
      <View style={{ margin: 10, marginTop: 15 }}>
        <Text>지인을 차단하시겠습니까?</Text>
        <Text style={{ fontSize: 10 }}>*카카오톡 친구 목록 기반</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center' }}>
        <RadioButton value="first" status={checked === 'first' ? 'checked' : 'unchecked'} onPress={() => setChecked('first')}></RadioButton>
        <Text style={{ fontSize: 15 }}>예</Text>
        <RadioButton value="second" status={checked === 'second' ? 'checked' : 'unchecked'} onPress={() => setChecked('second')}></RadioButton>
        <Text style={{ fontSize: 15 }}>아니오</Text>
      </View>
      <View>
        <NextButton />
      </View>
      <RangeSlider step={1} />
      {/* 이미지 업로드 npm install expo-image-picker */}
      <IamgePickerComponent />

      <StatusBar style="auto" />
    </View>
  );
}

const DropDown = (props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingtop: 20 }}>
      <Text>{props.name}</Text>
      <SelectList
        data={props.data}
        setSelected={props.selected}
        dropdownStyles={{ backgroundColor: 'gray' }}
        dropdownItemStyles={{ marginHorizontal: 5 }}
        dropdownTextStyles={{ color: 'white' }}
        placeholder=" "
        maxHeight={200}
      />
    </View>
  );
};

const InputText = (props) => {
  return (
    <View>
      <Text style={{ padding: 15 }}>{props.question}</Text>
      <TextInput style={{ marginLeft: 10, marginRight: 10, padding: 15, backgroundColor: 'grey', borderRadius: 15 }} placeholder={props.example}></TextInput>
      <></>
    </View>
  );
};

const NextButton = (props) => {
  <View style={{ alignItems: 'center', justifyContent: 'cen' }}>
    <TouchableOpacity activeOpacity={0.8} hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }} style={{ backgroundColor: 'gray', borderRadius: 15 }}>
      <Text style={{ fontSize: 10, color: 'white' }}>다음</Text>
    </TouchableOpacity>
  </View>;
};

// 범위 슬라이더
const RangeSlider = (props) => {
  const [sliderValue, setSliderValue] = useState(0);
  <Slider value={sliderValue} onValueChange={(e) => setSliderValue(e)} minimumValue={0} maximumValue={100} minimumTrackTintColor="blue" maximumTrackTintColor="blue" step={props.step} />;
};

// 이미지 업로드
const IamgePickerComponent = () => {
  // 현재 이미지 주소
  const [imageUrl, setImageUrl] = useState('');
  // 권한 요청을 위한 hooks
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    // 권한 확인 코드 : 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permssion = await requestPermission();
      if (!permssion.granted) {
        return null;
      }
    }

    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    // 이미지 업로드 취소
    if (result.canceled) return null;

    // 이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    setImageUrl(result.assets[0].uri);
  };

  return (
    <Pressable onPress={uploadImage} style={{ alignItems: 'flex-start', padding: 15, justifyContent: 'center' }}>
      <Image style={{ borderRadius: 15, width: 100, height: 100 }} source={{ uri: imageUrl }} />
    </Pressable>
  );
};
