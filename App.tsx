import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Form from './Form';
import Reminders from './Reminders';
import { TReminder } from './App.types';
import AppStyles from './App.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [_expoPushToken, setExpoPushToken] = useState('');
  const [_notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

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
    registerForPushNotificationsAsync().then((token = '') =>
      setExpoPushToken(token),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('response', response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Subscription,
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as Subscription,
      );
    };
  }, []);

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
    const scheduledNotif =
      await Notifications.getAllScheduledNotificationsAsync();
    console.log('scheduledNotif', scheduledNotif);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <View style={AppStyles.mainBox}>
          <View style={AppStyles.subBox}>
            <Text style={AppStyles.title}>
              {openForm
                ? editReminder
                  ? 'Reminder'
                  : 'Create a reminder'
                : 'Reminders'}
            </Text>

            {!openForm ? (
              <Reminders
                reminders={reminders}
                onPress={(reminder) => {
                  setEditReminder(reminder);
                  setOpenForm(true);
                }}
              />
            ) : (
              <Form
                onClose={() => {
                  setOpenForm(false);
                  setEditReminder(undefined);
                }}
                onSave={async (reminder) => {
                  const identifier = await schedulePushNotification(reminder);

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
            <View style={AppStyles.addBox}>
              <TouchableOpacity
                style={AppStyles.addTouch}
                activeOpacity={0.7}
                onPress={() => setOpenForm(!openForm)}
              >
                <Text style={AppStyles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </SafeAreaProvider>
    );
  }
}

function toSeconds(hours: number, minutes: number, seconds: number) {
  return hours * 3600 + minutes * 60 + seconds;
}

async function schedulePushNotification(data: TReminder) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hey! Just a heads up! 👋',
      body: data.name,
      data,
      sound: true,
    },
    trigger: {
      seconds: toSeconds(data.hours, data.minutes, data.seconds),
      repeats: data.repeat,
    },
  });
}

async function cancelNotification(identifier: string = '') {
  await Notifications.cancelScheduledNotificationAsync(identifier);
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('token', token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
