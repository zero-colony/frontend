export const ReplaceABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_GameManager',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'gameManager',
    outputs: [
      {
        internalType: 'contract IGameManager',
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
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getCoord',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint32',
                name: 'x',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'y',
                type: 'uint32',
              },
            ],
            internalType: 'struct IGameManager.PlaceOnLand',
            name: 'base',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'x',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'y',
                type: 'uint32',
              },
            ],
            internalType: 'struct IGameManager.PlaceOnLand',
            name: 'transport',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'x',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'y',
                type: 'uint32',
              },
            ],
            internalType: 'struct IGameManager.PlaceOnLand',
            name: 'robot',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint32',
                name: 'x',
                type: 'uint32',
              },
              {
                internalType: 'uint32',
                name: 'y',
                type: 'uint32',
              },
            ],
            internalType: 'struct IGameManager.PlaceOnLand',
            name: 'power',
            type: 'tuple',
          },
        ],
        internalType: 'struct GetCoords.Coordinates',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
