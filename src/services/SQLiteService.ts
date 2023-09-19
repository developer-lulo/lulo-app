import SQLite from 'react-native-sqlite-storage';
import {GetChannelsQueryData, GetMeQueryData} from '../gql/queries';
import {
  ChangeChannelStatusInput,
  ChangeMessageStatusInput,
  Channel,
  ChannelCharacterAction,
  ChannelCharacterKey,
  ChannelMessageStatus,
  ChannelMessageType,
  ChannelStatus,
  CreateChannelInput,
  MoveMessageToChannelInput,
  SendMessageInput,
  UpdateMessageBasicInfo,
  User,
} from '../gql/types';
import {
  ChangeChannelStatusResult,
  ChangeMessageStatusResult,
  MoveMessageToChannelResult,
  SendMessageOnChannelResult,
  UpdateMessageBasicInfoResult,
} from '../gql/mutations';

import {v4 as uuid} from 'uuid';
import {CHARACTERS} from '../constants';

// Constants
const DB_NAME = 'lulo.db';

// Open the SQLite database when the module is first loaded
const db = SQLite.openDatabase(
  {
    name: DB_NAME,
    location: 'default',
  },
  () => {
    console.log('[SQLiteService]: Database opened');
  },
  error => {
    console.log('[SQLiteService]: Error - ' + error);
  },
);

// Custom hook to provide database access
export const useSQLite = () => {
  // Define functions to perform database operations

  // Function to execute a SQL query
  const executeQuery = (
    sql: string,
    params: Array<string | number | undefined | null> = [],
  ) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx: SQLite.Transaction) => {
        tx.executeSql(
          sql,
          params,
          (tx, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          },
        );
      });
    });
  };

  // Function to create tables, insert data, and perform other database operations

  // Return functions and objects that provide access to the database
  return {
    db,
    executeQuery,
    // Add more functions here as needed
  };
};

export const useLocalDbMethods = () => {
  const {executeQuery} = useSQLite();

  const localGetMe = async (): Promise<GetMeQueryData> => {
    const userData = await executeQuery('SELECT * FROM user', []);
    const charactersData = await executeQuery('SELECT * FROM characters', []);

    let user: User = {
      id: '',
      displayName: 'Tu',
      email: '',
    };
    let availableChannelCharacters = [];
    try {
      const _user = userData.rows.item(0);
      user = {
        id: _user.id,
        displayName: _user.display_name,
        email: _user.email,
      };
      availableChannelCharacters = charactersData.rows.raw().map(c => ({
        description: c.description,
        displayName: c.display_name,
        imageUrl: c.image_url,
        id: c.id,
        key: c.key as ChannelCharacterKey,
        action: c.action as ChannelCharacterAction,
      }));
    } catch (error) {
      console.log('Error getting local user and characters', error);
    }

    const me = {
      ...user,
      availableChannelCharacters,
    };

    return {
      me,
    };
  };

  const localGetChannels = async (
    _: string | undefined | null,
  ): Promise<GetChannelsQueryData> => {
    const channelsData = await executeQuery(
      `
      SELECT
      channels.id AS id,
      channels.display_name AS displayName,
      channels.channel_status AS channelStatus,
      channels.created_at AS createdAt,
      channels.updated_at AS updatedAt,
      channels.channel_character_id AS channelCharacterId,
      channels.image_url AS imageUrl,
      characters.id AS characterId,
      characters.display_name AS CharacterName,
      characters.image_url AS characterImageUrl,
      characters.description AS characterDescription,
      characters.action AS characterAction,
      characters.key AS characterKey,
      (
        SELECT COUNT(*)
        FROM messages
        WHERE messages.channel_id = channels.id
          AND messages.message_status = 'PENDING'
      ) AS messageCount
    FROM channels
    LEFT JOIN characters ON channels.channel_character_id = characters.id
    WHERE channels.channel_status OR channelStatus = 'INUSE';
    `,
      [],
    );

    const channels = channelsData.rows
      .raw()
      .map(c => ({
        channelCharacter: {
          id: c.characterId,
          displayName: c.CharacterName,
          imageUrl: c.characterImageUrl,
          description: c.characterDescription,
          action: c.characterAction as ChannelCharacterAction,
          key: c.characterKey as ChannelCharacterKey,
        },
        channelCharacterId: c.channelCharacterId,
        channelStatus: ChannelStatus.Inuse,
        count: c.messageCount,
        createdAt: c.createdAt,
        displayName: c.displayName,
        id: c.id,
        imageUrl: c.imageUrl,
        updatedAt: c.updatedAt,
      }))
      .sort((a, b) => {
        // sort by updatedAt
        const aTimestamp = new Date(a.updatedAt).getTime();
        const bTimestamp = new Date(b.updatedAt).getTime();
        if (aTimestamp > bTimestamp) {
          return -1;
        }
        if (aTimestamp < bTimestamp) {
          return 1;
        }
        return 0;
      })
      .sort((a, b) => {
        // sort by channel character
        if (a.channelCharacter.key === ChannelCharacterKey.Orange) {
          return -1;
        }
      });

    return {
      userChannels: channels,
    };
  };

  const localGetMessages = async (channelId: string) => {
    const messagesData = await executeQuery(
      'select * from messages where channel_id = ? and message_status != "STORED"',
      [channelId],
    );

    return {
      channelMessages: messagesData.rows.raw().map(m => ({
        id: m.id,
        channelId: m.channel_id,
        text: m.text,
        messageStatus: m.message_status as ChannelMessageStatus,
        createdAt: m.created_at,
        updatedAt: m.updated_at,
        messageType: m.message_type as ChannelMessageType,
        sourceChannelId: m.source_channel_id,
        description: m.description,
      })),
    };
  };

  const localUpdateMessageStatus = async (input: ChangeMessageStatusInput) => {
    await executeQuery('update messages set message_status = ? where id = ?', [
      input.messageStatus,
      input.messageId,
    ]);
    const newMessage = await executeQuery(
      'select * from messages where id = ?',
      [input.messageId],
    );

    // update channel updated_at
    await executeQuery('update channels set updated_at = ? where id = ?', [
      new Date().toString(),
    ]);

    const _message = newMessage.rows.item(0);

    // update channel updated_at
    await executeQuery('update channels set updated_at = ? where id = ?', [
      new Date().toString(),
      _message.channel_id,
    ]);

    const messageResult: ChangeMessageStatusResult = {
      changeMessageStatus: {
        createdAt: _message.created_at,
        id: _message.id,
        messageStatus: _message.message_status as ChannelMessageStatus,
        messageType: _message.message_type as ChannelMessageType,
        text: _message.text,
        updatedAt: _message.updated_at,
      },
    };

    return messageResult.changeMessageStatus;
  };

  const localUpdateMessageBasicInfo = async (input: UpdateMessageBasicInfo) => {
    await executeQuery(
      'update messages set text = ?, description = ? where id = ?',
      [input.text, input.description, input.messageId],
    );
    const newMessage = await executeQuery(
      'select * from messages where id = ?',
      [input.messageId],
    );

    const _message = newMessage.rows.item(0);

    const messageResult: UpdateMessageBasicInfoResult = {
      updateMessageBasicInfo: {
        createdAt: _message.created_at,
        id: _message.id,
        messageStatus: _message.message_status as ChannelMessageStatus,
        messageType: _message.message_type as ChannelMessageType,
        text: _message.text,
        updatedAt: _message.updated_at,
        description: _message.description,
      },
    };
    return messageResult.updateMessageBasicInfo;
  };

  const localMoveMessageToChannel = async (
    input: MoveMessageToChannelInput,
  ) => {
    await executeQuery('update messages set channel_id = ? where id = ?', [
      input.newChannelId,
      input.messageId,
    ]);
    const newMessage = await executeQuery(
      'select * from messages where id = ?',
      [input.messageId],
    );

    // update channel updated_at
    await executeQuery('update channels set updated_at = ? where id = ?', [
      new Date().toString(),
      input.newChannelId,
    ]);

    const _message = newMessage.rows.item(0);

    const messageResult: MoveMessageToChannelResult = {
      moveMessageToChannel: {
        createdAt: _message.created_at,
        id: _message.id,
        messageStatus: _message.message_status as ChannelMessageStatus,
        messageType: _message.message_type as ChannelMessageType,
        text: _message.text,
        updatedAt: _message.updated_at,
        description: _message.description,
      },
    };
    return messageResult.moveMessageToChannel;
  };

  const localSendMessageOnChannel = async (input: SendMessageInput) => {
    const messageId = uuid();
    await executeQuery(
      `
      INSERT INTO messages (
        id,
        channel_id,
        text,
        message_status,
        message_type,
        source_channel_id,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        messageId,
        input.channelId,
        input.text,
        ChannelMessageStatus.Pending,
        ChannelMessageType.Task,
        input.channelId,
        '',
      ],
    );

    // update channel updated_at
    await executeQuery('update channels set updated_at = ? where id = ?', [
      new Date().toString(),
      input.channelId,
    ]);

    const newMessage = await executeQuery(
      'select * from messages where id = ?',
      [messageId],
    );

    const _message = newMessage.rows.item(0);

    const messageResult: SendMessageOnChannelResult = {
      sendMessageOnChannel: {
        createdAt: _message.created_at,
        id: _message.id,
        messageStatus: _message.message_status as ChannelMessageStatus,
        messageType: _message.message_type as ChannelMessageType,
        text: _message.text,
        updatedAt: _message.updated_at,
        description: _message.description,
      },
    };
    return messageResult.sendMessageOnChannel;
  };

  const localChangeChannelStatus = async (input: ChangeChannelStatusInput) => {
    await executeQuery('update channels set channel_status = ? where id = ?', [
      input.channelStatus,
      input.channelId,
    ]);
    const newChannel = await executeQuery(
      'select * from channels where id = ?',
      [input.channelId],
    );

    // update channel updated_at
    await executeQuery('update channels set updated_at = ? where id = ?', [
      new Date().toString(),
      input.channelId,
    ]);

    const _channel = newChannel.rows.item(0);

    const channelResult: ChangeChannelStatusResult = {
      changeChannelStatus: {
        channelStatus: _channel.channel_status as ChannelStatus,
        createdAt: _channel.created_at,
        displayName: _channel.display_name,
        id: _channel.id,
        imageUrl: _channel.image_url,
        updatedAt: _channel.updated_at,
      },
    };
    return channelResult.changeChannelStatus;
  };

  const localCreateChannel = async (input: CreateChannelInput) => {
    const channelId = uuid();
    await executeQuery(
      `
      INSERT INTO channels (
        id,
        display_name,
        channel_status,
        channel_character_id,
        image_url,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        channelId,
        input.displayName,
        ChannelStatus.Inuse,
        input.channelCharacterId,
        input.imageUrl,
        new Date().toString(),
        new Date().toString(),
      ],
    );
    const newChannel = await executeQuery(
      'select * from channels where id = ?',
      [channelId],
    );

    const _channel = newChannel.rows.item(0);

    const channelResult: ChangeChannelStatusResult = {
      changeChannelStatus: {
        channelStatus: _channel.channel_status as ChannelStatus,
        createdAt: _channel.created_at,
        displayName: _channel.display_name,
        id: _channel.id,
        imageUrl: _channel.image_url,
        updatedAt: _channel.updated_at,
      },
    };
    return channelResult.changeChannelStatus;
  };

  // characters methods

  const localGetOrangeChannel = async (): Promise<Channel> => {
    const orangeDb = await executeQuery(
      `
      select * from characters where key = ?
    `,
      [ChannelCharacterKey.Orange],
    );

    const orange = orangeDb.rows.item(0);

    const result = await executeQuery(
      `
      select * from channels where channel_character_id = ?
    `,
      [orange.id],
    );

    const channel = result.rows.item(0);
    return {
      id: channel.id,
      channelStatus: channel.channel_status as ChannelStatus,
    };
  };

  return {
    localGetMe,
    localGetChannels,
    localGetMessages,
    localUpdateMessageStatus,
    localUpdateMessageBasicInfo,
    localMoveMessageToChannel,
    localSendMessageOnChannel,
    localChangeChannelStatus,
    localCreateChannel,
    localGetOrangeChannel,
  };
};

export const useLocalDBSetup = () => {
  const {executeQuery} = useSQLite();

  const createLocalDB = async () => {
    // setting user
    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS user (
          id TEXT PRIMARY KEY NOT NULL,
          display_name TEXT,
          email TEXT
      );
  `,
    );

    await executeQuery(
      `
      CREATE TABLE IF NOT EXISTS characters (
          id TEXT PRIMARY KEY NOT NULL,
          display_name TEXT,
          image_url TEXT,
          description TEXT,
          action TEXT,
          key TEXT
      );
  `,
    );

    await executeQuery(
      `
    CREATE TABLE IF NOT EXISTS messages
      (
        id TEXT PRIMARY KEY NOT NULL,
        channel_id TEXT,
        text TEXT,
        message_type TEXT,
        message_status TEXT,
        description text,
        created_at text,
        updated_at text,
        source_channel_id text,
        FOREIGN KEY (channel_id) REFERENCES channels (id),
        FOREIGN KEY (source_channel_id) REFERENCES channels (id)
      );
  `,
    );

    await executeQuery(
      `
  CREATE TABLE IF NOT EXISTS channels
    (
      id TEXT PRIMARY KEY NOT NULL,
      display_name TEXT,
      channel_character_id TEXT,
      image_url TEXT,
      channel_status TEXT,
      sort_index integer,
      created_at text,
      updated_at text,
      FOREIGN KEY (channel_character_id) REFERENCES characters (id)
    );
    `,
    );
  };

  const fillDBwithDefaultValues = async () => {
    // insert default user

    const user = await executeQuery('select * from user', []);
    if (user.rows.length === 0) {
      await executeQuery(
        `
        INSERT INTO user (
          id,
          display_name,
          email
        )
        VALUES (?, ?, ?)
        `,
        [uuid(), 'Tu', ''],
      );
    }

    // insert characters

    const promises = CHARACTERS.map(async c => {
      return executeQuery(
        `
      INSERT OR IGNORE INTO characters (
        id,
        display_name,
        image_url,
        description,
        action,
        key
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
        [c.id, c.display_name, c.image_url, c.description, c.action, c.key],
      );
    });
    await Promise.all(promises);

    // insert Orange Channel STORED
    const orangeChannel = await executeQuery(
      `
      select * from channels where channel_character_id = ?
    `,
      [CHARACTERS[0].id],
    );

    if (orangeChannel.rows.length === 0) {
      await executeQuery(
        `
      INSERT INTO channels (
        id,
        display_name,
        channel_character_id,
        image_url,
        channel_status,
        sort_index,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          uuid(),
          'Hoy es tu día',
          CHARACTERS[0].id,
          CHARACTERS[0].image_url,
          ChannelStatus.Inuse,
          1,
          new Date().toString(),
          new Date().toString(),
        ],
      );
    }
  };

  const initLocalDb = async () => {
    await createLocalDB();
    await fillDBwithDefaultValues();
  };

  return {
    initLocalDb,
  };
};
