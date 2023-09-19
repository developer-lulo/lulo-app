import {ChannelStatus} from '../gql/types';
import {useChannelsMutations} from './ChannelService';
import {refreshChannels} from './GlobalVarService';
import {useLocalDbMethods} from './SQLiteService';

export const useCharactersMutations = () => {
  const {localGetOrangeChannel} = useLocalDbMethods();
  const {changeStatus} = useChannelsMutations();

  const activateOrInactivateOrangeChannel = async () => {
    const channel = await localGetOrangeChannel();
    const newStatus =
      channel.channelStatus === ChannelStatus.Inuse
        ? ChannelStatus.Stored
        : ChannelStatus.Inuse;
    await changeStatus({
      channelId: channel.id,
      channelStatus: newStatus,
    });
    refreshChannels(true);
  };

  return {
    activateOrInactivateOrangeChannel,
  };
};
