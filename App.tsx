import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import Form from './Form';
import Reminders from './Reminders';
import { TReminder } from './App.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [reminders, setReminders] = useState<TReminder[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editReminder, setEditReminder] = useState<TReminder | undefined>();

  useEffect(() => {
    getData();
    // storeData([]);
    showNotification();
    // clearAllNotification();
  }, []);

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.',
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokenData);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED');
        console.log(notification);
        const data = notification.request.content.data;
        console.log('subscription1', data);
      },
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('NOTIFICATION RESPONSE RECEIVED');
        console.log(response);
        const data = response.notification.request.content.data;
        console.log('subscription2', data);
      },
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function toSeconds(hours: number, minutes: number, seconds: number) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  async function scheduleNotificationHandler(data: TReminder) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hey! Just a heads up! 👋',
        body: data.name,
        data,
      },
      trigger: {
        seconds: toSeconds(data.hours, data.minutes, data.seconds),
        repeats: data.repeat,
      },
    });
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@reminders');
      setReminders(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log('getData', e);
      // error reading value
    }
  };

  const storeData = async (value: TReminder[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@reminders', jsonValue);
    } catch (e) {
      // saving error
      console.log('storeData', e);
    }
  };

  const showNotification = async () => {
    const getAllScheduledNotificationsAsync =
      await Notifications.getAllScheduledNotificationsAsync();
    console.log('Notifications', getAllScheduledNotificationsAsync);
  };

  const cancelNotification = async (identifier: string = '') =>
    await Notifications.cancelScheduledNotificationAsync(identifier);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View
          style={{
            backgroundColor: '#202936',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ borderWidth: 1, flex: 1 }}>
            <Text
              style={{
                marginTop: '20%',
                marginBottom: 40,
                textAlign: 'center',
                fontSize: 38,
                color: '#fff',
                fontFamily: 'raleway-bold',
              }}
            >
              {openForm
                ? `${editReminder ? 'Edit' : 'Create'} a reminder`
                : 'Reminders'}
            </Text>

            {!openForm ? (
              <ScrollView style={{ height: '72%', overflow: 'scroll' }}>
                <Reminders
                  reminders={reminders}
                  onPress={(reminder) => {
                    setEditReminder(reminder);
                    setOpenForm(true);
                  }}
                />
              </ScrollView>
            ) : (
              <Form
                onClose={() => {
                  setOpenForm(false);
                  setEditReminder(undefined);
                }}
                onSave={async (reminder) => {
                  const identifier = await scheduleNotificationHandler(
                    reminder,
                  );
                  console.log('identifier', identifier);
                  if (reminders.some((r) => r.id === reminder.id)) {
                    setReminders((rs) => {
                      const newReminders = rs.map((r) =>
                        r.id === reminder.id
                          ? {
                              ...reminder,
                              identifier,
                            }
                          : r,
                      );
                      storeData(newReminders);
                      return newReminders;
                    });
                  } else {
                    setReminders((r) => {
                      const newReminders = [...r, { ...reminder, identifier }];
                      storeData(newReminders);
                      return newReminders;
                    });
                  }
                  setEditReminder(undefined);
                  setOpenForm(false);
                }}
                onDelete={(reminder) => {
                  cancelNotification(reminder.identifier);
                  setReminders((rs) => {
                    const newReminders = [
                      ...rs.filter((r) => r.id !== reminder.id),
                    ];
                    storeData(newReminders);
                    return newReminders;
                  });
                  setEditReminder(undefined);
                  setOpenForm(false);
                }}
                edit={editReminder}
              />
            )}
          </View>

          {!openForm ? (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  marginTop: '-30%',
                  marginBottom: 0,
                  backgroundColor: '#30D158',
                }}
                activeOpacity={0.7}
                onPress={() => setOpenForm(!openForm)}
              >
                <Text
                  style={{
                    fontSize: 60,
                    marginTop: !openForm ? -6 : 6,
                    color: '#fff',
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </SafeAreaProvider>
    );
  }
}
