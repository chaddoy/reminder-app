import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import SelectDropdown from 'react-native-select-dropdown';
import { CheckBox } from '@rneui/themed';
import { useState } from 'react';
import { TForm, TReminder } from './App.types';
import { faker } from '@faker-js/faker';

const hoursOptions = [...Array(13).keys()];
const minutesOptions = [...Array(60).keys()].map((i) => i + 1);

export default function Form({
  onClose = () => {},
  onSave = () => {},
  onDelete = () => {},
  edit,
}: TForm) {
  const [reminder, setReminder] = useState<TReminder>(
    edit || {
      name: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      repeat: false,
      created: new Date(),
    },
  );

  return (
    <ScrollView style={{ height: '72%', overflow: 'scroll' }}>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#48484A',
          padding: 18,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TextInput
          placeholder="Name"
          style={[
            tw`border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white`,
          ]}
          defaultValue={reminder.name}
          onChangeText={(name) =>
            setReminder({
              ...reminder,
              name,
            })
          }
        />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#48484A',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <SelectDropdown
          defaultValue={reminder.hours}
          onChangeSearchInputText={() =>
            setReminder({
              ...reminder,
              hours: reminder.hours,
            })
          }
          data={hoursOptions}
          onSelect={(hours) => {
            setReminder({
              ...reminder,
              hours,
            });
          }}
          defaultButtonText={'Hours'}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />

        <SelectDropdown
          defaultValue={reminder.minutes}
          onChangeSearchInputText={() =>
            setReminder({
              ...reminder,
              minutes: reminder.minutes,
            })
          }
          data={minutesOptions}
          onSelect={(minutes) => {
            setReminder({
              ...reminder,
              minutes,
            });
          }}
          defaultButtonText={'Minutes'}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#48484A',
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <CheckBox
          checked={reminder.repeat}
          title="Repeat?"
          containerStyle={{ backgroundColor: '#202936' }}
          textStyle={{ color: '#9CA3AF' }}
          onPress={() =>
            setReminder({
              ...reminder,
              repeat: !reminder.repeat,
            })
          }
        />
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#48484A',
          paddingTop: 20,
          paddingBottom: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={[
            tw`text-white bg-blue-700 font-medium rounded-md text-sm w-full px-5 py-4 text-center`,
            {
              backgroundColor: 'transparent',
              borderColor: '#2089DC',
              width: '40%',
              borderWidth: 2,
            },
          ]}
          activeOpacity={0.7}
          onPress={onClose}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: 18,
              fontFamily: 'raleway-bold',
              color: '#2089DC',
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>

        {edit ? (
          <TouchableOpacity
            style={[
              tw`text-white bg-blue-700 font-medium rounded-md text-sm w-full px-5 py-4 text-center`,
              {
                backgroundColor: '#B30000',
                width: '40%',
              },
            ]}
            activeOpacity={0.7}
            onPress={() => onDelete(edit)}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 18,
                fontFamily: 'raleway-bold',
                color: '#fff',
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              tw`text-white bg-blue-700 font-medium rounded-md text-sm w-full px-5 py-4 text-center`,
              {
                backgroundColor: '#30D158',
                width: '40%',
              },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              if (reminder.name && (reminder.hours || reminder.minutes)) {
                const newReminder = {
                  ...reminder,
                  id: reminder.id || faker.datatype.uuid(),
                  created: new Date(),
                };
                onSave(newReminder);
              }
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 18,
                fontFamily: 'raleway-bold',
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          borderColor: '#48484A',
          height: 150,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 8,
    borderColor: '#4B5563',
    borderWidth: 1,
    fontSize: 14,
    width: '43%',
  },
  dropdown2BtnTxtStyle: {
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'raleway-regular',
    fontSize: 14,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
