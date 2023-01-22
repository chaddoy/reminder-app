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
import { useEffect, useState } from 'react';
import { TForm, TReminder } from './App.types';
import { faker } from '@faker-js/faker';
import AppStyles from './App.styles';

const hoursOptions = [...Array(25).keys()];
const minutesOptions = [...Array(61).keys()].map((i) => i + 1);

export default function Form({
  onClose = () => {},
  onSave = () => {},
  edit,
}: TForm) {
  const [dirtyHours, setDirtyHours] = useState(false);
  const [dirtyMinutes, setDirtyMinutes] = useState(false);
  const [reminder, setReminder] = useState<TReminder>(
    edit || {
      name: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      repeat: false,
      created: new Date(),
      done: false,
    },
  );
  const enabled = !edit;

  useEffect(() => {
    return () => {
      setDirtyHours(false);
      setDirtyMinutes(false);
    };
  }, []);

  return (
    <ScrollView style={AppStyles.form}>
      <View
        style={AppStyles.formInputBox}
        pointerEvents={enabled ? 'auto' : 'none'}
      >
        <TextInput
          placeholder="Name"
          style={[
            tw`border text-sm rounded-lg w-full p-2.5 pb-3.5 bg-gray-700 border-gray-600 text-white`,
            AppStyles.formInput,
          ]}
          defaultValue={reminder.name}
          onChangeText={(name) =>
            setReminder({
              ...reminder,
              name,
            })
          }
          editable={enabled}
          selectTextOnFocus={enabled}
        />
      </View>

      <View style={AppStyles.formDropdownBox}>
        <SelectDropdown
          defaultValue={edit || dirtyHours ? reminder.hours : undefined}
          onChangeSearchInputText={() => {}}
          data={hoursOptions}
          onSelect={(hours) => {
            setReminder({
              ...reminder,
              hours,
            });
            setDirtyHours(true);
          }}
          defaultButtonText={'Hours'}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={AppStyles.formDropdownButton}
          buttonTextStyle={{
            ...AppStyles.formDropdownButtonText,
            ...(edit || dirtyHours
              ? AppStyles.formFieldDirty
              : AppStyles.formFieldPistine),
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={AppStyles.formDropdown}
          rowStyle={AppStyles.formDropdownRow}
          rowTextStyle={AppStyles.formDropdownRowText}
          disabled={!enabled}
        />

        <SelectDropdown
          defaultValue={reminder.minutes}
          onChangeSearchInputText={() => {}}
          data={minutesOptions}
          onSelect={(minutes) => {
            setReminder({
              ...reminder,
              minutes,
            });
            setDirtyMinutes(true);
          }}
          defaultButtonText={'Minutes'}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonStyle={AppStyles.formDropdownButton}
          buttonTextStyle={{
            ...AppStyles.formDropdownButtonText,
            ...(edit || dirtyMinutes
              ? AppStyles.formFieldDirty
              : AppStyles.formFieldPistine),
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={AppStyles.formDropdown}
          rowStyle={AppStyles.formDropdownRow}
          rowTextStyle={AppStyles.formDropdownRowText}
          disabled={!enabled}
        />
      </View>

      <View style={AppStyles.formCheckboxBox}>
        <CheckBox
          checked={reminder.repeat}
          title="Repeat?"
          containerStyle={{ backgroundColor: 'transparent' }}
          textStyle={AppStyles.formCheckboxText}
          onPress={() =>
            setReminder({
              ...reminder,
              repeat: !reminder.repeat,
            })
          }
          disabled={!enabled}
        />
      </View>

      <View style={AppStyles.formActions}>
        <TouchableOpacity
          style={[
            tw`text-white bg-blue-700 font-medium rounded-md text-sm w-full px-5 py-4 text-center`,
            { ...AppStyles.formCancel },
          ]}
          activeOpacity={0.7}
          onPress={onClose}
        >
          <Text style={AppStyles.formCancelText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw`text-white bg-blue-700 font-medium rounded-md text-sm w-full px-5 py-4 text-center`,
            {
              ...AppStyles.formSave,
              ...AppStyles.buttonCommon,
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
              ...AppStyles.formSaveText,
              ...AppStyles.buttonTextCommon,
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
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
    color: '#FFF',
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
