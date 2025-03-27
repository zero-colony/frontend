import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { fromWeiValue } from '@features/global/utils/fromWei';
import Backend from '@root/api/backend';
import { Cristal } from '@root/images/icons/Cristal';
import { Minning } from '@root/images/icons/Minning';
import { Stone } from '@root/images/icons/Stone';
import { NETWORK_DATA } from '@root/settings';

import {
  IconContent,
  PolygonScreenWrapper,
  Statistic,
  StatisticContent,
  StatisticContentWrapper,
  StatisticCount,
  StatisticText,
  StatisticTitle,
  StatisticWrapper
} from './polygonScreen.styles';

export const PolygonScreen = () => {
  const { addToast } = useToasts();
  const [plotsInfo, setPlotsInfo] = useState({
    available: '...',
    claimed: '...'
  });
  const [stats, setStats] = useState({
    minted: '...',
    burned: '...',
    avg: '...',
    max: '...'
  });

  useEffect(() => {
    const updateStats = async () => {
      try {
        const stats = Backend.getHeaderStats();
        const lands = Backend.getLandStats();
        const [statsData, landData] = await Promise.all([stats, lands]);
        setStats(statsData);
        setPlotsInfo(landData);
      } catch (err) {
        addToast('Stats fetching failed', { appearance: 'error' });
        setStats({ burned: '0', avg: '0', minted: '0', max: '0' });
        setPlotsInfo({ available: '...', claimed: '...' });
      }
    };
    updateStats().catch();
    setInterval(() => updateStats().catch(), 60000);
  }, []);

  return (
    <PolygonScreenWrapper id="polygonStatisticScreen">
      <StatisticWrapper>
        <StatisticTitle>Polygon Planet Statistics</StatisticTitle>
        <StatisticContentWrapper>
          <StatisticContent Width="221px">
            <IconContent>
              <Cristal />
            </IconContent>
            <Statistic>
              <div>
                <StatisticCount>{plotsInfo.claimed}</StatisticCount>
                <StatisticText> plots claimed</StatisticText>
              </div>
              <div>
                <StatisticCount>{plotsInfo.available}</StatisticCount>
                <StatisticText> plots available</StatisticText>
              </div>
            </Statistic>
          </StatisticContent>
          <StatisticContent Width="238px">
            <IconContent>
              <Stone />
            </IconContent>
            <Statistic>
              <div>
                <StatisticCount>{fromWeiValue(stats.minted)}</StatisticCount>
                <StatisticText> {NETWORK_DATA.TOKEN_NAME} minted</StatisticText>
              </div>
              <div>
                <StatisticCount>{fromWeiValue(stats.burned)}</StatisticCount>
                <StatisticText> {NETWORK_DATA.TOKEN_NAME} burned</StatisticText>
              </div>
            </Statistic>
          </StatisticContent>
          <StatisticContent Width="272px">
            <IconContent>
              <Minning />
            </IconContent>
            <Statistic>
              <div>
                <StatisticCount>{fromWeiValue(stats.avg, 1)}</StatisticCount>
                <StatisticText>
                  {' '}
                  Average {NETWORK_DATA.TOKEN_NAME}/day
                </StatisticText>
              </div>
              <div>
                <StatisticCount>{fromWeiValue(stats.max, 1)}</StatisticCount>
                <StatisticText>
                  {' '}
                  Max {NETWORK_DATA.TOKEN_NAME}/day
                </StatisticText>
              </div>
            </Statistic>
          </StatisticContent>
        </StatisticContentWrapper>
      </StatisticWrapper>
    </PolygonScreenWrapper>
  );
};
