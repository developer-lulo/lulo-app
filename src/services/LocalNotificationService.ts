// import notifee, {
//   AndroidMessagingStyle,
//   AndroidMessagingStyleMessage,
//   AndroidStyle,
//   EventDetail,
//   InitialNotification,
//   Notification,
//   NotificationAndroid,
//   NotificationIOS,
// } from '@notifee/react-native';

// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
// import {Platform} from 'react-native';

// import {notification as globalNotification} from './GlobalVarService';
// import {Notification as InAppNotification} from 'react-native-in-app-message';

// export interface Message extends FirebaseMessagingTypes.RemoteMessage {
//   data?:
//     | {
//         deeplink: string;
//         imageUrl: string;
//         userId: string;
//         userName: string;
//         messageText: string;
//         channelId: string;
//         channelTitle: string;
//         [key: string]: string;
//       }
//     | {[key: string]: any};
// }

// const CATEGORY_N_CHANNEL_ID = 'chat';

// const initialize = async () => {
//   if (Platform.OS === 'android') {
//     // Android setup
//     await notifee
//       .createChannel({
//         id: CATEGORY_N_CHANNEL_ID,
//         name: CATEGORY_N_CHANNEL_ID.toUpperCase(),
//       })
//       .catch(e => console.log('Error creating notifee Android channels:', e));
//   }

//   if (Platform.OS === 'ios') {
//     // required for iOS but we already request permissions.
//     // await notifee.requestPermission();
//     // iOS setup
//     await notifee
//       .setNotificationCategories([
//         {
//           id: CATEGORY_N_CHANNEL_ID,
//         },
//       ])
//       .catch(e => console.log('Error Setting up notifee iOS categories:', e));
//   }
// };

// const findRelatedNotifications = async (channelId: string) => {
//   const notifications = await notifee.getDisplayedNotifications();

//   const relatedNotifications = notifications
//     .map(n => {
//       const notifChannelId = n.notification?.data?.channelId || '';
//       const channelIdsExists = Boolean(notifChannelId) && Boolean(channelId); // void string is a falsy value
//       if (channelIdsExists && notifChannelId === channelId) {
//         return n || undefined;
//       }
//     })
//     .filter(Boolean);
//   return relatedNotifications;
// };

// const getNotificationAndroid = async (
//   message: Message,
//   userName: string,
// ): Promise<NotificationAndroid> => {
//   // Possibly we have displayed notifications, so we get the related notifications (if exists must be only one for Android)
//   // and use the first record

//   const currentNotifChannelId = message.data?.channelId;
//   const displayedNotif = (
//     await findRelatedNotifications(currentNotifChannelId)
//   )[0];

//   let prevMessages: AndroidMessagingStyleMessage[] = [];
//   if (displayedNotif) {
//     // If we have a notification displayed we need to get the current messages inside it
//     // more info about this kind of notification here https://notifee.app/react-native/docs/android/styles#messaging
//     const styleNot = displayedNotif.notification.android
//       ?.style as AndroidMessagingStyle;
//     prevMessages = styleNot.messages || [];
//   }

//   // Create a new message object based on the notifee types (this is the incomming message)
//   const currentMessage: AndroidMessagingStyleMessage = {
//     text: message.data?.messageText || '',
//     timestamp: Date.now(),
//     person: {
//       name: message.data?.userName || 'Anonymous',
//       id: message.data?.userId,
//       icon: message.data?.imageUrl,
//     },
//   };

//   // build the new notification for android using the new messages array and custom title, this title will replace the general title.
//   const notificationAndroid: NotificationAndroid = {
//     channelId: CATEGORY_N_CHANNEL_ID,
//     style: {
//       title: message.data?.channelTitle,
//       type: AndroidStyle.MESSAGING,
//       person: {
//         name: userName || 'BetQL', // current user
//       },
//       messages: [...prevMessages, currentMessage],
//     },
//     // we need to use actions to open the app when tap the notification
//     // check this section to know more https://notifee.app/react-native/docs/events#app-open-events
//     // this is needed for android https://notifee.app/react-native/docs/android/interaction#press-action
//     pressAction: {
//       id: 'default',
//     },
//   };
//   return notificationAndroid;
// };

// const getNotificationIOS = async (
//   message: Message,
// ): Promise<NotificationIOS> => {
//   // For iOS we will use the same title and body from general notification, so only assign the catefory and thread for make groups
//   // https://notifee.app/react-native/docs/ios/categories this allow us to integrate then custom quick actions

//   const notificationIOS: NotificationIOS = {
//     categoryId: CATEGORY_N_CHANNEL_ID,
//     threadId: message.data?.channelId || 'default',
//   };
//   return notificationIOS;
// };

// const closeNotifications = async (
//   message: EventDetail | InitialNotification,
// ) => {
//   // we can cancel displayed notifications by ids, or all at once, but we want to remove
//   // them by ids mainly for iOS because we cant make a only notification for many messages
//   if (Platform.OS === 'ios') {
//     // get related notifications and create an array with the ids to close only those notifications
//     const tappedNotifChannelId = message.notification?.data?.channelId || '';
//     const relatedNotifIds = (
//       await findRelatedNotifications(tappedNotifChannelId)
//     ).map(n => n?.id);
//     if (relatedNotifIds && relatedNotifIds.length) {
//       // @ts-ignore
//       await notifee.cancelDisplayedNotifications(relatedNotifIds);
//     }
//   }
// };

// const notificationHandler = async (
//   currentUserName: string,
//   message: Message,
//   routeName: string | undefined,
//   isBackgroundHandler: Boolean = false,
// ) => {
//   const isChannelView = routeName === 'ChannelView';
//   const isMessageNotif = message?.data?.deeplink?.includes('channel');

//   const isNotChannelViewAndIsAMessage =
//     !isChannelView || (isChannelView && !isMessageNotif);

//   // use in app notifications
//   const shouldUseInAppNot =
//     !isBackgroundHandler && isNotChannelViewAndIsAMessage;

//   // use Notifee to display the notifications // If notification object comes, FCM create automatically the notification
//   const shouldUseNotifee = !message.notification && !isChannelView;

//   if (shouldUseInAppNot) {
//     globalNotification({
//       notification: {
//         body: `${message.data?.userName}: ${message.data?.messageText}`,
//         title: message.data?.channelTitle,
//       },
//       ...message,
//     });
//     // @ts-ignore
//     InAppNotification.show();
//   } else if (shouldUseNotifee) {
//     let android = {},
//       ios = {},
//       id = '';

//     if (Platform.OS === 'android') {
//       // For Android we use the channelId as notification id, so we need to use the same to replace the notification or create it
//       android = await getNotificationAndroid(message, currentUserName);
//       id = message.data?.channelId || '';
//     }
//     if (Platform.OS === 'ios') {
//       // For iOS we just need to create the notification because we dont have the same option as android, then
//       // we dont need to use a specific id, so use the message.messageId
//       ios = await getNotificationIOS(message);
//       id = message.messageId || '';
//     }

//     // At this level, the notification object not comes, so we need to generate the title, and body here,
//     // but for each platform this could be replaced if the ios or android object has the same properties inside
//     let notification: Notification = {
//       id,
//       body: `${message.data?.userName}: ${message.data?.messageText}`,
//       title: message.data?.channelTitle,
//       ios: ios,
//       android: android,
//       data: message.data,
//     };
//     await notifee.displayNotification(notification);
//   }
// };

// export {initialize, notificationHandler, closeNotifications};

import {useReactiveVar} from '@apollo/client';
import notifee from '@notifee/react-native';
import {Platform} from 'react-native';
import {channels} from './GlobalVarService';
import {useEffect} from 'react';
import {ChannelCharacterKey} from '../gql/types';

const CATEGORY_N_CHANNEL_ID = 'lulo.channels';

const initialize = async () => {
  // currently not deploying to android
  //   if (Platform.OS === 'android') {
  //     // Android setup
  //     await notifee
  //       .createChannel({
  //         id: CATEGORY_N_CHANNEL_ID,
  //         name: CATEGORY_N_CHANNEL_ID.toUpperCase(),
  //       })
  //       .catch(e => console.log('Error creating notifee Android channels:', e));
  //   }

  if (Platform.OS === 'ios') {
    // required for iOS but we already request permissions.
    await notifee.requestPermission();
    // iOS setup
    await notifee
      .setNotificationCategories([
        {
          id: CATEGORY_N_CHANNEL_ID,
        },
      ])
      .catch(e => console.log('Error Setting up notifee iOS categories:', e));
  }
};

interface NotificationInput {
  title: string;
  body: string;
}
const displayNotification = async (input: NotificationInput) => {
  try {
    await notifee.displayNotification({
      title: input.title,
      body: input.body,
    });
  } catch (error) {
    console.error(
      `Error displaying the notification ${JSON.stringify(input, null, 2)}`,
      error,
    );
  }
};

const updateBadgeCount = async (count: number) => {
  try {
    await notifee.setBadgeCount(count);
  } catch (error) {
    console.error(`Error updating badge count to ${count}`, error);
  }
};

export const localNotificationService = {
  initialize,
  displayNotification,
};

// hooks

export const useBadgeCount = async () => {
  const $channels = useReactiveVar(channels);

  useEffect(() => {
    $channels.forEach(channel => {
      if (channel.channelCharacter?.key === ChannelCharacterKey.Orange) {
        updateBadgeCount(channel.count || 0);
      }
    });
  }, [$channels]);
};
