import { GameLandPlot } from '@features/lands/components/gameLand/GameLandPlot';
import { OLD_NEW, PRICES } from '@features/lands/constants';
import { EnhancementsListWrapper } from '@features/lands/styles/landPlot.styles';
import useGameManagement from '@global/hooks/useGameManagement';
import React from 'react';
import {
  useBuildBaseStation,
  useBuildPowerProduction,
  useBuildRobotAssembly,
  useBuildTransport,
  useCLNYBalance,
  useLandStats,
} from '@features/global/hooks/useCallContracts';
import useMediaQuery from '@global/hooks/useMediaQuery';
import { BaseStationIcon } from '@images/icons/BaseStationIcon';
import { Power } from '@images/icons/Power';
import { RobotAssembly } from '@images/icons/RobotAssembly';
import { Transport } from '@images/icons/Transport';
import { Enhancement } from '@root/legacy/enhancement/Enhancement';

type Props = {
  id: number;

  trigger: boolean;
  isDefaultOpen?: boolean;
};

export const LandPlot: React.FC<Props> = ({ id, trigger }) => {
  const isMobile = useMediaQuery('(max-width: 1200px)');
  const { clnyBalanceWei: CLNYBalanceWei } = useCLNYBalance();

  const {
    hasBaseStation,
    robotAssemblyLevel,
    transportLevel,
    powerProductionLevel,
    isLoadingAttributes,
    speed,
    earned,
  } = useLandStats(id);

  const {
    isBaseAvailable,
    isBasePlaced,
    isTransportAvailable,
    isRobotAvailable,
    isTransportPlaced,
    isPowerplantPlaced,
    isPowerplantAvailable,
    isRobotPlaced,
    isBuildPending,
  } = useGameManagement();

  const { buildBaseStation, isPendingBuildBaseStation } =
    useBuildBaseStation(id);

  const { buildRobotAssembly, isPendingBuildRobotAssembly } =
    useBuildRobotAssembly(id);

  const { buildTransport, isPendingBuildTransport } = useBuildTransport(id);

  const { buildPowerProduction, isPendingBuildPowerProduction } =
    useBuildPowerProduction(id);

  const build = {
    base: () => buildBaseStation(),
    robots: () => buildRobotAssembly(robotAssemblyLevel + 1),
    transport: () => buildTransport(transportLevel + 1),
    power: () => buildPowerProduction(powerProductionLevel + 1),
  };

  const isBuyProcess = '';

  if (isLoadingAttributes) return null;

  const enhancementsItemsList = (
    <div
      className={
        isMobile
          ? 'grid grid-cols-2 gap-4 place-items-center w-[100vw]'
          : 'flex justify-around'
      }
    >
      <Enhancement
        Image={BaseStationIcon}
        title="Electricity"
        speed={hasBaseStation ? 1 : undefined}
        finalText={hasBaseStation ? 'Claimed' : undefined}
        getWhat=""
        price={30}
        oldNew={
          !hasBaseStation
            ? [0, 1]
            : [1, 1] /* if has BS -> no level upping then */
        }
        handler={() => build.base()}
        CLNYBalanceWei={CLNYBalanceWei}
        isAvailable={isBaseAvailable}
        isPlaced={isBasePlaced}
        isActive={hasBaseStation}
        level={hasBaseStation ? 1 : 0}
        levelsCount={1}
        isMobileView={isMobile}
        isPending={isPendingBuildBaseStation}
      />
      <Enhancement
        Image={RobotAssembly}
        title="Data Centre"
        aux={`lvl${robotAssemblyLevel}/3`}
        speed={robotAssemblyLevel ? robotAssemblyLevel + 1 : undefined}
        finalText={robotAssemblyLevel === 3 ? 'Max LVL' : undefined}
        getWhat={`LVL ${robotAssemblyLevel + 1}`}
        price={PRICES[robotAssemblyLevel + 1]}
        oldNew={OLD_NEW[robotAssemblyLevel] as [number, number] | undefined}
        handler={() => build.robots(robotAssemblyLevel + 1)}
        CLNYBalanceWei={CLNYBalanceWei}
        isAvailable={isRobotAvailable}
        isPlaced={isRobotPlaced}
        isActive={Boolean(robotAssemblyLevel && robotAssemblyLevel > 0)}
        level={robotAssemblyLevel}
        levelsCount={3}
        isMobileView={isMobile}
        isPending={isPendingBuildRobotAssembly}
      />
      <Enhancement
        Image={Transport}
        title="Blockchain Node"
        aux={`lvl${transportLevel}/3`}
        speed={transportLevel ? transportLevel + 1 : undefined}
        finalText={transportLevel === 3 ? 'Max LVL' : undefined}
        getWhat={`LVL ${transportLevel + 1}`}
        price={PRICES[transportLevel + 1]}
        oldNew={OLD_NEW[transportLevel] as [number, number] | undefined}
        handler={() => build.transport(transportLevel + 1)}
        CLNYBalanceWei={CLNYBalanceWei}
        isAvailable={isTransportAvailable}
        isPlaced={isTransportPlaced}
        isActive={Boolean(transportLevel && transportLevel > 0)}
        level={transportLevel}
        levelsCount={3}
        isMobileView={isMobile}
        isPending={isPendingBuildTransport}
      />
      <Enhancement
        Image={Power}
        title="AI Lab"
        aux={`lvl${powerProductionLevel}/3`}
        speed={powerProductionLevel ? powerProductionLevel + 1 : undefined}
        finalText={powerProductionLevel === 3 ? 'Max LVL' : undefined}
        getWhat={`LVL ${powerProductionLevel + 1}`}
        price={PRICES[powerProductionLevel + 1]}
        oldNew={OLD_NEW[powerProductionLevel] as [number, number] | undefined}
        handler={() => build.power(powerProductionLevel + 1)}
        CLNYBalanceWei={CLNYBalanceWei}
        isAvailable={isPowerplantAvailable}
        isPlaced={isPowerplantPlaced}
        isActive={Boolean(powerProductionLevel && powerProductionLevel > 0)}
        levelsCount={3}
        level={powerProductionLevel}
        isMobileView={isMobile}
        isPending={isPendingBuildPowerProduction}
      />
    </div>
  );

  return (
    <GameLandPlot
      id={id}
      earningSpeed={speed}
      earned={earned}
      enhancements={enhancementsItemsList}
    />
  );
};
