import {GraphQLResolveInfo} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChangeChannelStatusInput = {
  channelId: Scalars['String'];
  channelStatus?: InputMaybe<ChannelStatus>;
};

export type ChangeMessageStatusInput = {
  messageId: Scalars['String'];
  messageStatus?: InputMaybe<ChannelMessageStatus>;
};

export type Channel = {
  __typename?: 'Channel';
  channelCharacter?: Maybe<ChannelCharacter>;
  channelCharacterId?: Maybe<Scalars['String']>;
  channelStatus?: Maybe<ChannelStatus>;
  count?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ChannelCharacter = {
  __typename?: 'ChannelCharacter';
  createdAt?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export enum ChannelMessageStatus {
  Done = 'DONE',
  Pending = 'PENDING',
  Stored = 'STORED',
}

export enum ChannelMessageType {
  Task = 'TASK',
}

export enum ChannelStatus {
  Inuse = 'INUSE',
  Stored = 'STORED',
}

export type CreateChannelInput = {
  channelCharacterId: Scalars['String'];
  displayName: Scalars['String'];
  imageUrl: Scalars['String'];
  userChannelsIds: Array<InputMaybe<Scalars['String']>>;
};

export type Message = {
  __typename?: 'Message';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  messageStatus?: Maybe<ChannelMessageStatus>;
  messageType?: Maybe<ChannelMessageType>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeChannelStatus?: Maybe<Channel>;
  changeMessageStatus?: Maybe<Message>;
  createChannel?: Maybe<Channel>;
  sendMessageOnChannel?: Maybe<Message>;
  updateMessageBasicInfo?: Maybe<Message>;
};

export type MutationChangeChannelStatusArgs = {
  input?: InputMaybe<ChangeChannelStatusInput>;
};

export type MutationChangeMessageStatusArgs = {
  input?: InputMaybe<ChangeMessageStatusInput>;
};

export type MutationCreateChannelArgs = {
  input?: InputMaybe<CreateChannelInput>;
};

export type MutationSendMessageOnChannelArgs = {
  input?: InputMaybe<SendMessageInput>;
};

export type MutationUpdateMessageBasicInfoArgs = {
  input?: InputMaybe<UpdateMessageBasicInfo>;
};

export type Query = {
  __typename?: 'Query';
  channelCharacters?: Maybe<Array<Maybe<ChannelCharacter>>>;
  channelMessages?: Maybe<Array<Maybe<Message>>>;
  channelUsers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  userChannels?: Maybe<Array<Maybe<Channel>>>;
};

export type QueryChannelMessagesArgs = {
  channelId: Scalars['String'];
};

export type QueryChannelUsersArgs = {
  channelId: Scalars['String'];
};

export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type QueryUserChannelsArgs = {
  userId: Scalars['String'];
};

export type SendMessageInput = {
  channelId: Scalars['String'];
  text: Scalars['String'];
};

export type SignInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  checkSubscriptionService?: Maybe<Scalars['String']>;
  messageCreatedOnChannel?: Maybe<Message>;
};

export type SubscriptionMessageCreatedOnChannelArgs = {
  channelId: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
  user?: Maybe<User>;
};

export type UpdateMessageBasicInfo = {
  description?: InputMaybe<Scalars['String']>;
  messageId: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  availableChannelCharacters?: Maybe<Array<Maybe<ChannelCharacter>>>;
  avatar?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChangeChannelStatusInput: ChangeChannelStatusInput;
  ChangeMessageStatusInput: ChangeMessageStatusInput;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelCharacter: ResolverTypeWrapper<ChannelCharacter>;
  ChannelMessageStatus: ChannelMessageStatus;
  ChannelMessageType: ChannelMessageType;
  ChannelStatus: ChannelStatus;
  CreateChannelInput: CreateChannelInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SendMessageInput: SendMessageInput;
  SignInput: SignInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  UpdateMessageBasicInfo: UpdateMessageBasicInfo;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ChangeChannelStatusInput: ChangeChannelStatusInput;
  ChangeMessageStatusInput: ChangeMessageStatusInput;
  Channel: Channel;
  ChannelCharacter: ChannelCharacter;
  CreateChannelInput: CreateChannelInput;
  Int: Scalars['Int'];
  Message: Message;
  Mutation: {};
  Query: {};
  SendMessageInput: SendMessageInput;
  SignInput: SignInput;
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  UpdateMessageBasicInfo: UpdateMessageBasicInfo;
  User: User;
};

export type ChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel'],
> = {
  channelCharacter?: Resolver<
    Maybe<ResolversTypes['ChannelCharacter']>,
    ParentType,
    ContextType
  >;
  channelCharacterId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  channelStatus?: Resolver<
    Maybe<ResolversTypes['ChannelStatus']>,
    ParentType,
    ContextType
  >;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelCharacterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChannelCharacter'] = ResolversParentTypes['ChannelCharacter'],
> = {
  createdAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message'],
> = {
  createdAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messageStatus?: Resolver<
    Maybe<ResolversTypes['ChannelMessageStatus']>,
    ParentType,
    ContextType
  >;
  messageType?: Resolver<
    Maybe<ResolversTypes['ChannelMessageType']>,
    ParentType,
    ContextType
  >;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  changeChannelStatus?: Resolver<
    Maybe<ResolversTypes['Channel']>,
    ParentType,
    ContextType,
    Partial<MutationChangeChannelStatusArgs>
  >;
  changeMessageStatus?: Resolver<
    Maybe<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    Partial<MutationChangeMessageStatusArgs>
  >;
  createChannel?: Resolver<
    Maybe<ResolversTypes['Channel']>,
    ParentType,
    ContextType,
    Partial<MutationCreateChannelArgs>
  >;
  sendMessageOnChannel?: Resolver<
    Maybe<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    Partial<MutationSendMessageOnChannelArgs>
  >;
  updateMessageBasicInfo?: Resolver<
    Maybe<ResolversTypes['Message']>,
    ParentType,
    ContextType,
    Partial<MutationUpdateMessageBasicInfoArgs>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  channelCharacters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ChannelCharacter']>>>,
    ParentType,
    ContextType
  >;
  channelMessages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Message']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelMessagesArgs, 'channelId'>
  >;
  channelUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelUsersArgs, 'channelId'>
  >;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'userId'>
  >;
  userChannels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Channel']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryUserChannelsArgs, 'userId'>
  >;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  checkSubscriptionService?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'checkSubscriptionService',
    ParentType,
    ContextType
  >;
  messageCreatedOnChannel?: SubscriptionResolver<
    Maybe<ResolversTypes['Message']>,
    'messageCreatedOnChannel',
    ParentType,
    ContextType,
    RequireFields<SubscriptionMessageCreatedOnChannelArgs, 'channelId'>
  >;
};

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token'],
> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  availableChannelCharacters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ChannelCharacter']>>>,
    ParentType,
    ContextType
  >;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>;
  ChannelCharacter?: ChannelCharacterResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
