import { useAllLands } from '@features/global/hooks/useApi';
import {
  useBuyLand,
  useEthBalance,
  useMyLands,
} from '@features/global/hooks/useCallContracts';
import { PartedMars } from '@features/globus/components/partedMars/PartedMars';
import { LandsSidebar } from '@features/lands/components/landsSidebar';
import { CURRENT_CHAIN } from '@root/settings/chains';
import { useEventListener, useInterval } from 'usehooks-ts';

// Define the event type locally
type ClaimLandEvent = CustomEvent<{
  tokenId: number;
}>;

function MapPage() {
  const { claimToken } = useBuyLand();
  const { allTokens, isAllTokensLoading } = useAllLands();

  const { ethBalanceWei, isEthBalanceLoading } = useEthBalance();
  const { myLands: myTokens } = useMyLands();

  if (isAllTokensLoading || isEthBalanceLoading) return <div>Loading...</div>;

  return (
    <div className="wrapper">
      <LandsSidebar />

      <PartedMars
        allTokens={allTokens || []}
        myTokens={myTokens || []}
        height="100vh"
        balanceInWei={ethBalanceWei || 0}
        currency={CURRENT_CHAIN.ticker}
        handleClaim={claimToken}
      />
    </div>
  );
}

export default MapPage;
