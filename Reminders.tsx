import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Defs, Polyline } from 'react-native-svg';
import { TReminderItem } from './App.types';

export default function Reminder({
  onPress = () => {},
  reminders,
}: TReminderItem) {
  return (
    <ScrollView style={{ height: '72%', overflow: 'scroll' }}>
      {reminders.map((reminder, index) => {
        const { name, hours, minutes, seconds, repeat } = reminder;
        return (
          <TouchableOpacity
            key={`reminder-${index}`}
            activeOpacity={0.5}
            onPress={() => onPress(reminder)}
          >
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#48484A',
                padding: 18,
                paddingTop: 24,
                paddingBottom: 24,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'raleway-regular',
                  fontSize: 18,
                  width: '66%',
                }}
              >
                {name}
              </Text>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'raleway-regular',
                    fontSize: 20,
                  }}
                >
                  {`${hours}h ${minutes}m`}
                </Text>

                {repeat ? (
                  <Svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    style={{ marginTop: 10 }}
                  >
                    <Defs></Defs>
                    <Path
                      d="M13.5,22a9.75,9.75,0,1,0-9.75-9.75V13"
                      fill="none"
                      stroke="#E4E6EA"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5px"
                    ></Path>
                    <Polyline
                      points="0.75 9.997 3.75 12.997 6.75 9.997"
                      fill="none"
                      stroke="#E4E6EA"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5px"
                    ></Polyline>
                    <Polyline
                      points="12.75 6.247 12.75 12.997 18 12.997"
                      fill="none"
                      stroke="#E4E6EA"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5px"
                    ></Polyline>
                  </Svg>
                ) : (
                  ''
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#48484A',
          height: 150,
        }}
      ></View>
    </ScrollView>
  );
}
