import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import ZeroBackend from '@root/api/backend';
import {
  StatsBarWrapper,
  StatsItem,
  StatsIcon,
  StatsText,
  StatsValue,
  StatsLabel
} from '@global/styles/app.styles';

export const StatsBar = () => {
  const { addToast } = useToasts();
  const [plotsInfo, setPlotsInfo] = useState({
    available: '...',
    claimed: '...'
  });
  const [stats, setStats] = useState({
    minted: '...',
    burned: '...',
    priceInUsd: '...',
    marketCap: '...'
  });

  useEffect(() => {
    const updateStats = async () => {
      try {
        const [statsData, landData] = await Promise.all([
          ZeroBackend.getHeaderStats(),
          ZeroBackend.getLandStats()
        ]);
        setStats(statsData);
        setPlotsInfo(landData);
      } catch (err) {
        addToast('Stats fetching failed', { appearance: 'error' });
        setStats({ burned: '0', priceInUsd: '0', marketCap: '0', minted: '0' });
        setPlotsInfo({ available: '...', claimed: '...' });
      }
    };
    updateStats();
    const interval = setInterval(updateStats, 60000);
    return () => clearInterval(interval);
  }, [addToast]);

  return (
    <StatsBarWrapper>
      <StatsItem>
        <StatsIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StatsIcon>
        <StatsText>
          <StatsValue>{plotsInfo.claimed}</StatsValue>
          <StatsLabel>plots claimed</StatsLabel>
        </StatsText>
      </StatsItem>

      <StatsItem>
        <StatsIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1V23"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StatsIcon>
        <StatsText>
          <StatsValue>{stats.minted}</StatsValue>
          <StatsLabel>CLNY minted</StatsLabel>
        </StatsText>
      </StatsItem>

      <StatsItem>
        <StatsIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1V23"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StatsIcon>
        <StatsText>
          <StatsValue>${stats.priceInUsd}</StatsValue>
          <StatsLabel>CLNY price</StatsLabel>
        </StatsText>
      </StatsItem>

      <StatsItem>
        <StatsIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 12H16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StatsIcon>
        <StatsText>
          <StatsValue>{plotsInfo.available}</StatsValue>
          <StatsLabel>plots available</StatsLabel>
        </StatsText>
      </StatsItem>

      <StatsItem>
        <StatsIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L21 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12L21 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12L3 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StatsIcon>
        <StatsText>
          <StatsValue>{stats.burned}</StatsValue>
          <StatsLabel>CLNY burned</StatsLabel>
        </StatsText>
      </StatsItem>

      <StatsItem>
        <StatsIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14V16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StatsIcon>
        <StatsText>
          <StatsValue>${stats.marketCap}</StatsValue>
          <StatsLabel>Market Cap</StatsLabel>
        </StatsText>
      </StatsItem>
    </StatsBarWrapper>
  );
};
