import {
  Animated,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { TReminderItem } from './App.types';
import AppStyles from './App.styles';
import Icon from './Icon';
import { SwipeListView } from 'react-native-swipe-list-view';

const rowTranslateAnimatedValues: {
  [key: string]: Animated.Value;
} = {};
Array(20)
  .fill('')
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

export default function Reminder({ reminders }: TReminderItem) {
  return (
    <SwipeListView
      disableRightSwipe
      data={reminders}
      keyExtractor={(rowData) => (rowData?.id || '')?.toString()}
      renderItem={({ item: { name, hours, minutes, repeat, done }, index }) => (
        <Animated.View>
          <TouchableHighlight>
            <View
              style={{
                ...AppStyles.reminder,
                ...AppStyles.borderColor,
                borderBottomWidth: reminders.length === index + 1 ? 1 : 0,
              }}
            >
              <Icon status={done ? 'done' : repeat ? 'repeat' : 'once'} />

              <Text style={AppStyles.reminderName}>{name}</Text>

              <View style={AppStyles.reminderTimeBox}>
                <Text
                  style={AppStyles.reminderTime}
                >{`${hours}h ${minutes}m`}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </Animated.View>
      )}
      renderHiddenItem={() => (
        <View style={AppStyles.reminderRowBack}>
          <View
            style={[
              AppStyles.reminderBackRightBtn,
              AppStyles.reminderBackRightBtnRight,
            ]}
          >
            <Text style={AppStyles.reminderBackText}>REMOVE</Text>
          </View>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-Dimensions.get('window').width}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onSwipeValueChange={(test) => {
        console.log(test);
      }}
      useNativeDriver={false}
    />
  );
}
