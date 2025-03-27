export const COLLECTIONS_MANAGER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'd',
    outputs: [
      {
        internalType: 'contract IDependencies',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'gearLocks',
    outputs: [
      {
        internalType: 'uint64',
        name: 'transportId',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'gear1Id',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'gear2Id',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'gear3Id',
        type: 'uint64',
      },
      {
        internalType: 'bool',
        name: 'set',
        type: 'bool',
      },
      {
        internalType: 'uint16',
        name: 'locks',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'initialCommonGears',
    outputs: [
      {
        internalType: 'enum IEnums.Rarity',
        name: 'rarity',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'gearType',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'category',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'durability',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'locked',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'set',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'initialLegendaryGears',
    outputs: [
      {
        internalType: 'enum IEnums.Rarity',
        name: 'rarity',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'gearType',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'category',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'durability',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'locked',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'set',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'initialRareGears',
    outputs: [
      {
        internalType: 'enum IEnums.Rarity',
        name: 'rarity',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'gearType',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'category',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'durability',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'locked',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'set',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxTokenId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'transportGears',
    outputs: [
      {
        internalType: 'enum IEnums.Rarity',
        name: 'rarity',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'gearType',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'category',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'durability',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'locked',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'set',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IDependencies',
        name: '_d',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IDependencies',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'setDependencies',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'avatarIds',
        type: 'uint256[]',
      },
    ],
    name: 'getXP',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'avatarId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'increment',
        type: 'uint256',
      },
    ],
    name: 'addXP',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'avatarId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'increment',
        type: 'uint256',
      },
    ],
    name: 'addXPAfterCryo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'dropAvatars',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'allMyTokens',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_from',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_to',
        type: 'uint256',
      },
    ],
    name: 'allTokensPaginate',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'xp',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        internalType: 'struct CollectionManager.AvatarData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_maxTokenId',
        type: 'uint256',
      },
    ],
    name: 'setMaxTokenId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ableToMint',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'setNameByGameManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'tokenIds',
        type: 'uint256[]',
      },
    ],
    name: 'getNames',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum IEnums.Rarity',
        name: '_lootboxRarity',
        type: 'uint8',
      },
      {
        internalType: 'enum IEnums.Rarity',
        name: '_gearRarity',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
    ],
    name: 'getRandomizedGear',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IEnums.Rarity',
            name: 'rarity',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'gearType',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'category',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'durability',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'locked',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'set',
            type: 'bool',
          },
        ],
        internalType: 'struct IGears.Gear',
        name: 'gear',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum IEnums.Rarity',
        name: '_lootBoxRarity',
        type: 'uint8',
      },
    ],
    name: 'calculateGear',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IEnums.Rarity',
            name: 'rarity',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'gearType',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'category',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'durability',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'locked',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'set',
            type: 'bool',
          },
        ],
        internalType: 'struct IGears.Gear',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'transportId',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'gear1Id',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'gear2Id',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'gear3Id',
        type: 'uint64',
      },
    ],
    name: 'setLocks',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_from',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_to',
        type: 'uint256',
      },
    ],
    name: 'allMyTokensPaginate',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'enum IEnums.Rarity',
        name: '_lootBoxrarity',
        type: 'uint8',
      },
    ],
    name: 'mintGear',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_whereTo',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLootboxOpeningPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'common',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rare',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'legendary',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getLockedGears',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
      {
        components: [
          {
            internalType: 'enum IEnums.Rarity',
            name: 'rarity',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'gearType',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'category',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'durability',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'locked',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'set',
            type: 'bool',
          },
        ],
        internalType: 'struct IGears.Gear[]',
        name: '',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'locksCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'transport',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'percents',
        type: 'uint16',
      },
    ],
    name: 'increaseTransportDamage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'transport',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'percents',
        type: 'uint16',
      },
    ],
    name: 'repairTransport',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'transport',
        type: 'address',
      },
    ],
    name: 'getTransportCondition',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
