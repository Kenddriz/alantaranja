import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  children: Array<Category>;
  id: Scalars['String'];
  label: Scalars['String'];
};

export type CategoryCreateInput = {
  description: Scalars['String'];
  label: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
};

export type CreatePaymentInput = {
  documents: Array<PaymentCartInput>;
  note: Scalars['String'];
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  family?: Maybe<Family>;
  files: Array<FileProperty>;
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  notifyUser: Scalars['Boolean'];
  price: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DocumentCreateInput = {
  description: Scalars['String'];
  familyId?: InputMaybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  price: Scalars['Float'];
  sizes: Array<Scalars['Float']>;
  title: Scalars['String'];
};

export type DocumentsPagination = {
  __typename?: 'DocumentsPagination';
  items: Array<Document>;
  meta: Meta;
};

export type Family = {
  __typename?: 'Family';
  category: Category;
  description: Scalars['String'];
  id: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
};

export type FamilyUpdateInput = {
  description: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
};

export type FileProperty = {
  __typename?: 'FileProperty';
  name: Scalars['String'];
  size: Scalars['Float'];
};

export type LoginDto = {
  __typename?: 'LoginDto';
  token: Scalars['String'];
  user: User;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  messageId?: Maybe<Scalars['String']>;
  reactions: Array<MessageReaction>;
  responses: Array<Message>;
  topicId: Scalars['String'];
  user?: Maybe<User>;
};

export type MessageCreateInput = {
  body: Scalars['String'];
  messageId?: InputMaybe<Scalars['String']>;
  topicId: Scalars['String'];
};

export type MessageReaction = {
  __typename?: 'MessageReaction';
  label: Scalars['String'];
  value: Scalars['Float'];
};

export type MessageReactionInput = {
  label: Scalars['String'];
  messageId: Scalars['String'];
};

export type MessageUpdateInput = {
  body: Scalars['String'];
  id: Scalars['String'];
};

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems: Scalars['Float'];
  totalPages: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  categoryCreate: Family;
  documentCreate: Document;
  familyRemove: Scalars['String'];
  familyUpdate: Family;
  login: LoginDto;
  messageCreate: Scalars['Boolean'];
  messageRemove: Scalars['Boolean'];
  messageUpdate: Scalars['Boolean'];
  paymentCreate: Payment;
  paymentStatus: Payment;
  reactMessage: Scalars['Boolean'];
  resetPassword: User;
  sendCode: Scalars['Boolean'];
  subjectRemove: Scalars['String'];
  topicCreate: Topic;
  topicUpdate: Topic;
  updatePassword?: Maybe<User>;
  userCreate: User;
  userResendEmailCreated: Scalars['Boolean'];
  userUpdate: User;
  userVerifyEmail: User;
};


export type MutationCategoryCreateArgs = {
  input: CategoryCreateInput;
};


export type MutationDocumentCreateArgs = {
  files: Array<Scalars['Upload']>;
  input: DocumentCreateInput;
};


export type MutationFamilyRemoveArgs = {
  id: Scalars['String'];
};


export type MutationFamilyUpdateArgs = {
  input: FamilyUpdateInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationMessageCreateArgs = {
  input: MessageCreateInput;
};


export type MutationMessageRemoveArgs = {
  id: Scalars['String'];
};


export type MutationMessageUpdateArgs = {
  input: MessageUpdateInput;
};


export type MutationPaymentCreateArgs = {
  input: CreatePaymentInput;
  proof: Scalars['Upload'];
};


export type MutationPaymentStatusArgs = {
  input: PaymentStatusInput;
};


export type MutationReactMessageArgs = {
  input: MessageReactionInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendCodeArgs = {
  input: SendCodeInput;
};


export type MutationSubjectRemoveArgs = {
  id: Scalars['String'];
};


export type MutationTopicCreateArgs = {
  input: TopicCreateInput;
};


export type MutationTopicUpdateArgs = {
  input: TopicUpdateInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUserCreateArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  input: UserCreateInput;
};


export type MutationUserResendEmailCreatedArgs = {
  email: Scalars['String'];
};


export type MutationUserUpdateArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  input: UserUpdateInput;
};


export type MutationUserVerifyEmailArgs = {
  input: UserVerifyEmailInput;
};

export type PaginationInput = {
  from?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  to?: InputMaybe<Scalars['String']>;
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime'];
  documents: Array<PaymentDocument>;
  downloadAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  note: Scalars['String'];
  proof: Scalars['String'];
  status: Scalars['String'];
  user: User;
};

export type PaymentCartInput = {
  id: Scalars['String'];
  price: Scalars['Float'];
};

export type PaymentDocument = {
  __typename?: 'PaymentDocument';
  document: Document;
  price: Scalars['Float'];
};

export type PaymentStatusInput = {
  id: Scalars['String'];
  status: Scalars['String'];
};

export type PaymentsPagination = {
  __typename?: 'PaymentsPagination';
  items: Array<Payment>;
  meta: Meta;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  documentsPaginate: DocumentsPagination;
  documentsSearch: Array<Document>;
  families: Array<Family>;
  findOne: Scalars['String'];
  myPaymentsPaginate: PaymentsPagination;
  paymentsPaginate: PaymentsPagination;
  topicGet?: Maybe<Topic>;
  topicMessages: Array<Message>;
  topicsPaginate: TopicsPagination;
  usersPaginate: UsersPagination;
  whoAmI?: Maybe<User>;
};


export type QueryDocumentsPaginateArgs = {
  input: PaginationInput;
};


export type QueryDocumentsSearchArgs = {
  input: SearchDocumentsInput;
};


export type QueryMyPaymentsPaginateArgs = {
  input: PaginationInput;
};


export type QueryPaymentsPaginateArgs = {
  input: PaginationInput;
};


export type QueryTopicGetArgs = {
  id: Scalars['String'];
};


export type QueryTopicMessagesArgs = {
  topicId: Scalars['String'];
};


export type QueryTopicsPaginateArgs = {
  input: PaginationInput;
};


export type QueryUsersPaginateArgs = {
  input: PaginationInput;
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SearchDocumentsInput = {
  title: Scalars['String'];
};

export type SendCodeInput = {
  email: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageEvent: Message;
};

export type Topic = {
  __typename?: 'Topic';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  statistics: Array<Scalars['Int']>;
  title: Scalars['String'];
  user?: Maybe<User>;
};

export type TopicCreateInput = {
  body: Scalars['String'];
  documentId: Scalars['String'];
  title: Scalars['String'];
};

export type TopicUpdateInput = {
  body: Scalars['String'];
  documentId: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type TopicsPagination = {
  __typename?: 'TopicsPagination';
  items: Array<Topic>;
  meta: Meta;
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  activationCode: Scalars['Int'];
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastConnexion?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  resetPasswordCode: Scalars['Int'];
  role: Scalars['Int'];
  status: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['Float'];
};

export type UserUpdateInput = {
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['Float'];
};

export type UserVerifyEmailInput = {
  activationCode: Scalars['String'];
  email: Scalars['String'];
};

export type UsersPagination = {
  __typename?: 'UsersPagination';
  items: Array<User>;
  meta: Meta;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthInput: AuthInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryCreateInput: CategoryCreateInput;
  CreatePaymentInput: CreatePaymentInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Document: ResolverTypeWrapper<Document>;
  DocumentCreateInput: DocumentCreateInput;
  DocumentsPagination: ResolverTypeWrapper<DocumentsPagination>;
  Family: ResolverTypeWrapper<Family>;
  FamilyUpdateInput: FamilyUpdateInput;
  FileProperty: ResolverTypeWrapper<FileProperty>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginDto: ResolverTypeWrapper<LoginDto>;
  Message: ResolverTypeWrapper<Message>;
  MessageCreateInput: MessageCreateInput;
  MessageReaction: ResolverTypeWrapper<MessageReaction>;
  MessageReactionInput: MessageReactionInput;
  MessageUpdateInput: MessageUpdateInput;
  Meta: ResolverTypeWrapper<Meta>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginationInput: PaginationInput;
  Payment: ResolverTypeWrapper<Payment>;
  PaymentCartInput: PaymentCartInput;
  PaymentDocument: ResolverTypeWrapper<PaymentDocument>;
  PaymentStatusInput: PaymentStatusInput;
  PaymentsPagination: ResolverTypeWrapper<PaymentsPagination>;
  Query: ResolverTypeWrapper<{}>;
  ResetPasswordInput: ResetPasswordInput;
  SearchDocumentsInput: SearchDocumentsInput;
  SendCodeInput: SendCodeInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Topic: ResolverTypeWrapper<Topic>;
  TopicCreateInput: TopicCreateInput;
  TopicUpdateInput: TopicUpdateInput;
  TopicsPagination: ResolverTypeWrapper<TopicsPagination>;
  UpdatePasswordInput: UpdatePasswordInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
  UserVerifyEmailInput: UserVerifyEmailInput;
  UsersPagination: ResolverTypeWrapper<UsersPagination>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthInput: AuthInput;
  Boolean: Scalars['Boolean'];
  Category: Category;
  CategoryCreateInput: CategoryCreateInput;
  CreatePaymentInput: CreatePaymentInput;
  DateTime: Scalars['DateTime'];
  Document: Document;
  DocumentCreateInput: DocumentCreateInput;
  DocumentsPagination: DocumentsPagination;
  Family: Family;
  FamilyUpdateInput: FamilyUpdateInput;
  FileProperty: FileProperty;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  LoginDto: LoginDto;
  Message: Message;
  MessageCreateInput: MessageCreateInput;
  MessageReaction: MessageReaction;
  MessageReactionInput: MessageReactionInput;
  MessageUpdateInput: MessageUpdateInput;
  Meta: Meta;
  Mutation: {};
  PaginationInput: PaginationInput;
  Payment: Payment;
  PaymentCartInput: PaymentCartInput;
  PaymentDocument: PaymentDocument;
  PaymentStatusInput: PaymentStatusInput;
  PaymentsPagination: PaymentsPagination;
  Query: {};
  ResetPasswordInput: ResetPasswordInput;
  SearchDocumentsInput: SearchDocumentsInput;
  SendCodeInput: SendCodeInput;
  String: Scalars['String'];
  Subscription: {};
  Topic: Topic;
  TopicCreateInput: TopicCreateInput;
  TopicUpdateInput: TopicUpdateInput;
  TopicsPagination: TopicsPagination;
  UpdatePasswordInput: UpdatePasswordInput;
  Upload: Scalars['Upload'];
  User: User;
  UserCreateInput: UserCreateInput;
  UserUpdateInput: UserUpdateInput;
  UserVerifyEmailInput: UserVerifyEmailInput;
  UsersPagination: UsersPagination;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  children?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['Family']>, ParentType, ContextType>;
  files?: Resolver<Array<ResolversTypes['FileProperty']>, ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notifyUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentsPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentsPagination'] = ResolversParentTypes['DocumentsPagination']> = {
  items?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FamilyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Family'] = ResolversParentTypes['Family']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilePropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileProperty'] = ResolversParentTypes['FileProperty']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginDto'] = ResolversParentTypes['LoginDto']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reactions?: Resolver<Array<ResolversTypes['MessageReaction']>, ParentType, ContextType>;
  responses?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  topicId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageReaction'] = ResolversParentTypes['MessageReaction']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meta'] = ResolversParentTypes['Meta']> = {
  currentPage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  itemCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  itemsPerPage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  categoryCreate?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationCategoryCreateArgs, 'input'>>;
  documentCreate?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<MutationDocumentCreateArgs, 'files' | 'input'>>;
  familyRemove?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationFamilyRemoveArgs, 'id'>>;
  familyUpdate?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationFamilyUpdateArgs, 'input'>>;
  login?: Resolver<ResolversTypes['LoginDto'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  messageCreate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMessageCreateArgs, 'input'>>;
  messageRemove?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMessageRemoveArgs, 'id'>>;
  messageUpdate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMessageUpdateArgs, 'input'>>;
  paymentCreate?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<MutationPaymentCreateArgs, 'input' | 'proof'>>;
  paymentStatus?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<MutationPaymentStatusArgs, 'input'>>;
  reactMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationReactMessageArgs, 'input'>>;
  resetPassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>;
  sendCode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSendCodeArgs, 'input'>>;
  subjectRemove?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSubjectRemoveArgs, 'id'>>;
  topicCreate?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<MutationTopicCreateArgs, 'input'>>;
  topicUpdate?: Resolver<ResolversTypes['Topic'], ParentType, ContextType, RequireFields<MutationTopicUpdateArgs, 'input'>>;
  updatePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'input'>>;
  userCreate?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUserCreateArgs, 'input'>>;
  userResendEmailCreated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUserResendEmailCreatedArgs, 'email'>>;
  userUpdate?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUserUpdateArgs, 'input'>>;
  userVerifyEmail?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUserVerifyEmailArgs, 'input'>>;
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  documents?: Resolver<Array<ResolversTypes['PaymentDocument']>, ParentType, ContextType>;
  downloadAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proof?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentDocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentDocument'] = ResolversParentTypes['PaymentDocument']> = {
  document?: Resolver<ResolversTypes['Document'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentsPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentsPagination'] = ResolversParentTypes['PaymentsPagination']> = {
  items?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  documentsPaginate?: Resolver<ResolversTypes['DocumentsPagination'], ParentType, ContextType, RequireFields<QueryDocumentsPaginateArgs, 'input'>>;
  documentsSearch?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType, RequireFields<QueryDocumentsSearchArgs, 'input'>>;
  families?: Resolver<Array<ResolversTypes['Family']>, ParentType, ContextType>;
  findOne?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  myPaymentsPaginate?: Resolver<ResolversTypes['PaymentsPagination'], ParentType, ContextType, RequireFields<QueryMyPaymentsPaginateArgs, 'input'>>;
  paymentsPaginate?: Resolver<ResolversTypes['PaymentsPagination'], ParentType, ContextType, RequireFields<QueryPaymentsPaginateArgs, 'input'>>;
  topicGet?: Resolver<Maybe<ResolversTypes['Topic']>, ParentType, ContextType, RequireFields<QueryTopicGetArgs, 'id'>>;
  topicMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryTopicMessagesArgs, 'topicId'>>;
  topicsPaginate?: Resolver<ResolversTypes['TopicsPagination'], ParentType, ContextType, RequireFields<QueryTopicsPaginateArgs, 'input'>>;
  usersPaginate?: Resolver<ResolversTypes['UsersPagination'], ParentType, ContextType, RequireFields<QueryUsersPaginateArgs, 'input'>>;
  whoAmI?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageEvent?: SubscriptionResolver<ResolversTypes['Message'], "messageEvent", ParentType, ContextType>;
};

export type TopicResolvers<ContextType = any, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  statistics?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicsPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicsPagination'] = ResolversParentTypes['TopicsPagination']> = {
  items?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  activationCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastConnexion?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resetPasswordCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersPagination'] = ResolversParentTypes['UsersPagination']> = {
  items?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes['Meta'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  DocumentsPagination?: DocumentsPaginationResolvers<ContextType>;
  Family?: FamilyResolvers<ContextType>;
  FileProperty?: FilePropertyResolvers<ContextType>;
  LoginDto?: LoginDtoResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageReaction?: MessageReactionResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentDocument?: PaymentDocumentResolvers<ContextType>;
  PaymentsPagination?: PaymentsPaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  TopicsPagination?: TopicsPaginationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UsersPagination?: UsersPaginationResolvers<ContextType>;
};
