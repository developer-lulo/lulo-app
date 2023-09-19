import {useApolloClient} from '@apollo/client';
import {getMeQuery} from './UserService';
import {getChannelMessages, getChannels} from './ChannelService';
import {Channel, ChannelStatus} from '../gql/types';
import {useSQLite} from './SQLiteService';

import {CHARACTERS} from '../constants';

export const useBulkSyncToLocalScript = () => {
  const client = useApolloClient();
  const {executeQuery} = useSQLite();

  const syncToLocal = async () => {
    const data = await getMeQuery(client);

    const user = data.me;

    const result = await getChannels(client, user.id);
    const channels = result.userChannels;

    await executeQuery('DELETE FROM user;'); // delete default user
    await executeQuery(
      'INSERT OR IGNORE INTO user (id, display_name, email) VALUES (?, ?, ?);',
      [user.id, user.displayName, user.email],
    );

    // are filled with default values
    // const characters = data.me.availableChannelCharacters;
    // if (characters) {
    //   characters.forEach(async character => {
    //     if (!character) {
    //       return;
    //     }

    //     await executeQuery(
    //       'INSERT OR IGNORE INTO characters (id, display_name, image_url, description, action, key) VALUES (?, ?, ?, ?, ?, ?);',
    //       [
    //         character.id,
    //         character.displayName,
    //         character.imageUrl,
    //         character.description,
    //         character.action,
    //         character.key,
    //       ],
    //     );
    //   });
    // }

    if (channels) {
      channels.forEach(async channel => {
        // orange channel was created with default values, so ignore it here
        if (!channel || channel.channelCharacterId === CHARACTERS[0].id) {
          return;
        }

        await executeQuery(
          'INSERT OR IGNORE INTO channels (id, display_name, channel_character_id, image_url, channel_status, sort_index, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
          [
            channel.id,
            channel.displayName,
            channel.channelCharacterId,
            channel.imageUrl,
            ChannelStatus.Inuse,
            9999,
            new Date().toString(),
            new Date().toString(),
          ],
        );
      });
    }

    // setting messages

    channels.forEach(async (channel: Channel) => {
      const messages = await getChannelMessages(client, channel.id);

      if (!messages) {
        return;
      }

      messages.forEach(async message => {
        if (!message) {
          return;
        }

        await executeQuery(
          'INSERT OR IGNORE INTO messages (id, channel_id, text, message_type, message_status, description, created_at, updated_at, source_channel_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
          [
            message.id,
            channel.id,
            message.text,
            message.messageType,
            message.messageStatus,
            message.description,
            new Date().toString(),
            new Date().toString(),
            channel.id,
          ],
        );
      });
    });
  };

  return {
    syncToLocal,
  };
};
