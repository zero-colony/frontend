import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LandPlotEarnedButton } from '@features/lands/styles/landPlot.styles';
import { Ticked } from '@global/components/ticked/Ticked';
import { EnhButton } from '@root/legacy/buttons/enhButton/EnhButton';
import { NETWORK_DATA } from '@root/settings';
import { isReplaceModeSelector } from '@selectors/gameManagerSelectors';
import { selectObjectToSet } from '@slices/gameManagementSlice';

import { EnhButtonError } from '../buttons/enhButton/enhButton.styles';

import {
  EnhancementItemWrapper,
  EnhAux,
  EnhButtonOuterWrapper,
  EnhImageWrapper,
  EnhOldNew,
  EnhTitle,
} from './enhancements.styles';
import { parseEther } from 'viem';

type Props = {
  title: string;
  Image: React.FC;
  aux?: string;
  speed?: number;
  finalText?: string;
  getWhat: string;
  price: number;
  oldNew?: [number, number];
  handler: () => void;
  CLNYBalanceWei: number | bigint;
  isGamePage?: boolean;
  isAvailable?: string;
  isPlaced?: boolean;
  isActive?: boolean | null;
  levelsCount?: number;
  level?: number;
  isMobileView?: boolean;
  isPending?: boolean;
};

export const Enhancement: React.FC<Props> = ({
  title,
  Image,
  aux,
  finalText,
  getWhat,
  price,
  oldNew,
  handler,
  CLNYBalanceWei,
  isAvailable,
  isPlaced,
  isMobileView,
  isPending = false,
}) => {
  const dispatch = useDispatch();
  const isReplaceMode = useSelector(isReplaceModeSelector);

  const availableButNotPlaced = useMemo(
    () => !!parseInt(isAvailable ?? '0') && !isPlaced,
    [isAvailable, isPlaced]
  );
  const notAvailableButNotPlaced = useMemo(
    () => !parseInt(isAvailable ?? '0') && !isPlaced,
    [isAvailable, isPlaced]
  );
  const isPlacedAndAvailable = useMemo(
    () => !!parseInt(isAvailable ?? '0') && isPlaced,
    [isAvailable, isPlaced]
  );

  const getClnySpeedLabel = (val: string | number) => {
    if (Number(val) === 0) return '';
    return `+ ${val} ${NETWORK_DATA.TOKEN_NAME}/day`;
  };

  const getClnySpeedLevel = (val: string | number) => {
    return `${val} ${NETWORK_DATA.TOKEN_NAME}/day`;
  };

  const priceWei = useMemo(() => {
    if (!price) return undefined;
    return parseEther(price.toString());
  }, [price]);

  return (
    <EnhancementItemWrapper isMobileView={isMobileView}>
      {aux && <EnhAux>{aux}</EnhAux>}
      <EnhImageWrapper>
        <Image />
      </EnhImageWrapper>
      <EnhTitle>{title}</EnhTitle>
      <div className="enh_speed whitespace-nowrap">
        <>{getClnySpeedLevel(oldNew?.[0] ?? 3)}</>
      </div>
      {availableButNotPlaced && (
        <LandPlotEarnedButton
          disabled={isPending}
          isNewBuild={true}
          Width={'105px'}
          Height={'30px'}
          Padding={'0'}
          onClick={() => {
            dispatch(selectObjectToSet(title));
          }}
        >
          <div className="enh_button__get">
            {isPending ? 'Pending...' : 'PLACE ON MAP'}
          </div>
        </LandPlotEarnedButton>
      )}
      {notAvailableButNotPlaced && (
        <LandPlotEarnedButton
          isNewBuild={true}
          disabled={priceWei > CLNYBalanceWei || isPending || isReplaceMode}
          Height={'30px'}
          Padding={'0'}
          Width={'105px'}
          mb={'2px'}
          onClick={() => {
            dispatch(selectObjectToSet(title));
          }}
        >
          {isPending && <div className="enh_button__get">Pending...</div>}
          {!isPending && (
            <>
              <div className="enh_button__get">BUILD</div>
              <div className="enh_button__for">
                for {price} {NETWORK_DATA.TOKEN_NAME}
              </div>
            </>
          )}
          {priceWei > CLNYBalanceWei && (
            <EnhButtonError mt="-18px">
              not enough {NETWORK_DATA.TOKEN_NAME}
            </EnhButtonError>
          )}
        </LandPlotEarnedButton>
      )}

      <EnhButtonOuterWrapper>
        {Boolean(finalText) && isPlacedAndAvailable && (
          <Ticked text={String(finalText)} />
        )}
        {!finalText && (
          <EnhButton
            getWhat={getWhat}
            handler={handler}
            price={price}
            disabled={priceWei > CLNYBalanceWei}
            isPending={isPending}
          />
        )}
      </EnhButtonOuterWrapper>
      {oldNew !== undefined && !availableButNotPlaced && !isPending && (
        <EnhOldNew>{getClnySpeedLabel(`${oldNew[1] - oldNew[0]}`)}</EnhOldNew>
      )}
    </EnhancementItemWrapper>
  );
};
