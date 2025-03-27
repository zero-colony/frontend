import {
  CLNY_CONTRACT,
  GAME_MANAGER_CONTRACT,
  MC_CONTRACT,
} from '@root/contracts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { createBatches } from '../utils/createBatches';

export const useCLNYBalance = () => {
  const { address } = useAccount();

  const { data: clnyBalanceWei, refetch: refetchCLNYBalance } = useReadContract(
    {
      ...CLNY_CONTRACT,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    }
  );

  const clnyBalance = useMemo(() => {
    if (!clnyBalanceWei) return undefined;
    return Number(formatEther(clnyBalanceWei)).toFixed(2);
  }, [clnyBalanceWei]);

  return { clnyBalanceWei, clnyBalance, refetchCLNYBalance };
};

export const useEthBalance = () => {
  const { address } = useAccount();
  const {
    data: ethBalanceWei,
    isLoading: isEthBalanceLoading,
    refetch: refetchEthBalance,
  } = useBalance({
    address,
  });

  const ethBalance = useMemo(() => {
    if (!ethBalanceWei) return undefined;
    return Number(formatEther(ethBalanceWei.value)).toFixed(3);
  }, [ethBalanceWei]);

  return {
    ethBalance,
    ethBalanceWei: ethBalanceWei?.value,
    refetchEthBalance,
    isEthBalanceLoading,
  };
};

export const useMyLands = () => {
  const { address } = useAccount();

  const {
    data: myLands,
    refetch: refetchMyLands,
    isLoading: isLoadingMyLands,
  } = useReadContract({
    ...MC_CONTRACT,
    functionName: 'allMyTokens',
    account: address as `0x${string}`,
    query: {
      select: (data) => {
        if (!data) return [];
        return data.map((token) => token.toString());
      },
    },
  });

  const hasNoLands = useMemo(() => {
    return myLands?.length === 0 || (!myLands && !isLoadingMyLands);
  }, [myLands, isLoadingMyLands]);

  return {
    myLands: myLands,
    refetchMyLands: refetchMyLands,
    isLoadingMyLands: isLoadingMyLands,
    hasNoLands: hasNoLands,
  };
};

export const useTotalEarning = () => {
  const { myLands: myTokens } = useMyLands();

  const {
    data,
    isLoading: isLoadingEarnedAmount,
    refetch: refetchEarnedAmount,
    error: errorEarnedAmount,
  } = useReadContract({
    ...GAME_MANAGER_CONTRACT,
    functionName: 'getEarningData',
    // @ts-expect-error it's ok bro, everything is a string
    args: [myTokens?.map((token) => token.toString()) ?? []],
    query: {
      enabled: !!myTokens,
    },
  });

  const earnedAmountWei = useMemo(() => {
    if (!data) return undefined;
    return data[0] ?? 0n;
  }, [data]);

  const earnedAmount = useMemo(() => {
    if (earnedAmountWei === 0n) return (0).toString();
    if (!earnedAmountWei) return undefined;
    return Number(formatEther(earnedAmountWei)).toFixed(2);
  }, [earnedAmountWei]);

  const earnSpeed = useMemo(() => {
    if (!data) return undefined;
    return data[1];
  }, [data]);

  return {
    earnedAmountWei,
    earnedAmount,
    earnSpeed,
    isLoadingEarnedAmount,
    errorEarnedAmount,
    refetchEarnedAmount,
  };
};

export const useResetLandStats = () => {
  const { myLands } = useMyLands();

  const queryClient = useQueryClient();

  const resetLandStats = useCallback(() => {
    const queries = queryClient.getQueryCache().getAll();
    console.log('QUERIES', { queries });

    queries.forEach((query) => {
      const queryKey = query.queryKey;

      const isReadContract = queryKey[0] === 'readContract';

      // Check for getAttributesMany queries (single land stats)
      const isGetAttributesMany =
        typeof queryKey[1] === 'object' &&
        queryKey[1] !== null &&
        'functionName' in queryKey[1] &&
        queryKey[1].functionName === 'getAttributesMany';

      // Reset individual land stats
      if (isReadContract && isGetAttributesMany) {
        queryClient.setQueryData(queryKey, (data: any) => {
          console.log('resetLandStats', {
            isReadContract,
            isGetAttributesMany,
            args: queryKey[1].args,
            queryKey,
            previousData: data,
          });
          return [{ ...data[0], earned: 0 }];
        });
      }

      // Check for getEarningData queries (total earnings)
      const isGetEarningData =
        typeof queryKey[1] === 'object' &&
        queryKey[1] !== null &&
        'functionName' in queryKey[1] &&
        queryKey[1].functionName === 'getEarningData';

      // Reset total earnings
      if (isReadContract && isGetEarningData) {
        queryClient.setQueryData(queryKey, (data: any) => {
          console.log('resetTotalEarnings', {
            isReadContract,
            isGetEarningData,
            args: queryKey[1].args,
            queryKey,
            previousData: data,
          });

          // Keep the earning speed (data[1]) but reset the earned amount (data[0]) to 0
          return [0, data[1]];
        });
      }
    });
  }, [queryClient]);

  return { resetLandStats };
};

export const useLandStats = (id: number) => {
  const {
    data: attributesMany,
    isLoading: isLoadingAttributes,
    refetch: refetchLandStats,
  } = useReadContract({
    ...GAME_MANAGER_CONTRACT,
    functionName: 'getAttributesMany',
    // @ts-expect-error it's ok bro, everything is a string
    args: [[id.toString()]],
  });

  const attributes = useMemo(() => {
    if (!attributesMany) return null;
    return attributesMany[0];
  }, [attributesMany]);

  const earned = useMemo(() => {
    if (!attributes) return null;
    return attributes.earned;
  }, [attributes]);

  const speed = useMemo(() => {
    if (!attributes) return null;
    return attributes.speed;
  }, [attributes]);

  const hasBaseStation = attributes?.baseStation.toString() === '1';
  const robotAssemblyLevel = attributes?.robotAssembly;
  const transportLevel = attributes?.transport;
  const powerProductionLevel = attributes?.powerProduction;

  return {
    speed,
    earned,
    isLoadingAttributes,
    hasBaseStation,
    robotAssemblyLevel,
    transportLevel,
    powerProductionLevel,
    refetchLandStats,
  };
};

export const useBuyLand = () => {
  const { addToast } = useToasts();
  const { refetchMyLands } = useMyLands();
  const { refetchEthBalance } = useEthBalance();

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (error) => {
        addToast(error.message);
      },
      onSuccess: () => {
        addToast('Land bought successfully');
        refetchMyLands();
        refetchEthBalance();
      },
    },
  });

  const claimToken = async (
    token: number,
    { onSuccess }: { onSuccess?: () => void } = {}
  ) => {
    await writeContractAsync({
      ...GAME_MANAGER_CONTRACT,
      functionName: 'claim',
      // @ts-expect-error it's ok bro, everything is a string
      args: [[token.toString()]],
      value: parseEther('0.009'),
    });

    onSuccess?.();
  };

  return { claimToken };
};

export const useClaimEarned = () => {
  const { addToast } = useToasts();
  const { resetLandStats } = useResetLandStats();
  const { refetchCLNYBalance } = useCLNYBalance();

  const { writeContractAsync, isPending: isClaimingEarned } = useWriteContract({
    mutation: {
      onError: (error) => {
        addToast(error.message);
      },
      onSuccess: () => {
        addToast('Earnings claimed successfully');
        resetLandStats();
        refetchCLNYBalance();
      },
    },
  });
  const { myLands: myTokens } = useMyLands();

  const claimEarned = async () => {
    if (!myTokens) return;

    const batches = createBatches(myTokens, 50);

    for (const batch of batches) {
      await writeContractAsync({
        ...GAME_MANAGER_CONTRACT,
        functionName: 'claimEarned',
        // @ts-expect-error it's ok bro, everything is a string
        args: [batch.map((token) => token.toString())],
      });
    }
  };

  return { claimEarned, isClaimingEarned };
};

export const useBuildBaseStation = (id: number) => {
  const { addToast } = useToasts();
  const { refetchCLNYBalance } = useCLNYBalance();
  const { refetchLandStats } = useLandStats(id);

  const { writeContractAsync, isPending: isPendingBuildBaseStation } =
    useWriteContract({
      mutation: {
        onError: (error) => {
          addToast(error.message);
        },
        onSuccess: () => {
          addToast('Base station built successfully');
          refetchCLNYBalance();
          refetchLandStats();
        },
      },
    });

  const buildBaseStation = async () => {
    await writeContractAsync({
      ...GAME_MANAGER_CONTRACT,
      functionName: 'buildBaseStation',
      // @ts-expect-error it's ok bro, everything is a string
      args: [id.toString()],
    });
  };

  return { buildBaseStation, isPendingBuildBaseStation };
};

export const useBuildRobotAssembly = (id: number) => {
  const { addToast } = useToasts();
  const { refetchCLNYBalance } = useCLNYBalance();
  const { refetchLandStats } = useLandStats(id);

  const { writeContractAsync, isPending: isPendingBuildRobotAssembly } =
    useWriteContract({
      mutation: {
        onError: (error) => {
          addToast(error.message);
        },
        onSuccess: () => {
          addToast('Robot assembly built successfully');
          refetchCLNYBalance();
          refetchLandStats();
        },
      },
    });
  const buildRobotAssembly = async (level: number) => {
    await writeContractAsync({
      ...GAME_MANAGER_CONTRACT,
      functionName: 'buildRobotAssembly',
      // @ts-expect-error it's ok bro, everything is a string
      args: [id.toString(), level],
    });
  };

  return { buildRobotAssembly, isPendingBuildRobotAssembly };
};

export const useBuildTransport = (id: number) => {
  const { addToast } = useToasts();
  const { refetchCLNYBalance } = useCLNYBalance();
  const { refetchLandStats } = useLandStats(id);

  const { writeContractAsync, isPending: isPendingBuildTransport } =
    useWriteContract({
      mutation: {
        onError: (error) => {
          addToast(error.message);
        },
        onSuccess: () => {
          addToast('Transport built successfully');
          refetchCLNYBalance();
          refetchLandStats();
        },
      },
    });

  const buildTransport = async (level: number) => {
    await writeContractAsync({
      ...GAME_MANAGER_CONTRACT,
      functionName: 'buildTransport',
      // @ts-expect-error it's ok bro, everything is a string
      args: [id.toString(), level],
    });
  };

  return { buildTransport, isPendingBuildTransport };
};

export const useBuildPowerProduction = (id: number) => {
  const { addToast } = useToasts();
  const { refetchCLNYBalance } = useCLNYBalance();
  const { refetchLandStats } = useLandStats(id);

  const { writeContractAsync, isPending: isPendingBuildPowerProduction } =
    useWriteContract({
      mutation: {
        onError: (error) => {
          addToast(error.message);
        },
        onSuccess: () => {
          addToast('Power production built successfully');
          refetchCLNYBalance();
          refetchLandStats();
        },
      },
    });
  const buildPowerProduction = async (level: number) => {
    await writeContractAsync({
      ...GAME_MANAGER_CONTRACT,
      functionName: 'buildPowerProduction',
      // @ts-expect-error it's ok bro, everything is a string
      args: [id.toString(), level],
    });
  };

  return { buildPowerProduction, isPendingBuildPowerProduction };
};

export const useUpdateEarnedInterval = () => {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const queries = queryClient.getQueryCache().getAll();

      queries.forEach((query) => {
        const queryKey = query.queryKey;
        const isReadContract = queryKey[0] === 'readContract';

        const isGetAttributesMany =
          typeof queryKey[1] === 'object' &&
          queryKey[1] !== null &&
          'functionName' in queryKey[1] &&
          queryKey[1].functionName === 'getAttributesMany';

        const id = isGetAttributesMany ? queryKey[1].args[0] : null;

        if (isReadContract && isGetAttributesMany) {
          queryClient.setQueryData(queryKey, (data: unknown) => {
            if (!data || !Array.isArray(data) || data.length === 0) return data;

            const landData = data[0];
            if (
              !landData ||
              typeof landData !== 'object' ||
              !('speed' in landData) ||
              !('earned' in landData)
            ) {
              return data;
            }
            const speed = Number(landData.speed || 0);
            const currentEarned = BigInt(landData.earned || 0);
            const newEarned =
              currentEarned + parseEther(speed.toString()) / BigInt(86400);

            return [{ ...landData, earned: newEarned }];
          });
        }

        const isGetEarningData =
          typeof queryKey[1] === 'object' &&
          queryKey[1] !== null &&
          'functionName' in queryKey[1] &&
          queryKey[1].functionName === 'getEarningData';

        if (isReadContract && isGetEarningData) {
          queryClient.setQueryData(queryKey, (data: unknown) => {
            if (!data || !Array.isArray(data) || data.length < 2) return data;

            const currentEarnedAmount = BigInt(data[0] || 0);
            const earnSpeed = Number(data[1] || 0);

            const newEarnedAmount =
              currentEarnedAmount +
              parseEther(earnSpeed.toString()) / BigInt(86400);

            return [newEarnedAmount, data[1]];
          });
        }
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [queryClient]);

  return null;
};
