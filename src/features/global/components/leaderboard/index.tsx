import { useLeaderboard } from "@features/global/hooks/useApi";
import { CommonModal } from "@global/components/commonModal";
import { Loader } from "@global/components/loader/loader";
import { MOBILE_BREAKPOINT } from "@global/constants";
import { CloseIcon } from "@images/icons/CloseIcon";
import { useAccount } from "wagmi";
import {
  LeaderboardAddress,
  LeaderboardAmount,
  LeaderboardCloseButton,
  LeaderboardItem,
  LeaderboardList,
  LeaderboardPlace,
  LeaderboardRank,
  LeaderboardTitle,
  LeaderboardWrapper,
} from "./leaderboard.styles";
import { ExternalLinkIcon } from "@root/images/icons/ExternalLinkIcon";

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};

export const Leaderboard = ({ isOpen, onClose }: LeaderboardProps) => {
  const { address } = useAccount();
  const { leaderboard: leaderboardData, isLeaderboardLoading: loading } =
    useLeaderboard();

  console.log("leaderboardData", leaderboardData);

  if (!isOpen) return null;
  return (
    <CommonModal
      onClose={onClose}
      width="auto"
      isCloseButton={false}
      mobileBreakpoint={MOBILE_BREAKPOINT}
    >
      <LeaderboardWrapper>
        <LeaderboardCloseButton onClick={onClose}>
          <CloseIcon />
        </LeaderboardCloseButton>
        <LeaderboardTitle>Leaderboard</LeaderboardTitle>
        {loading ? (
          <Loader />
        ) : (
          <>
            {!!leaderboardData?.place && (
              <LeaderboardPlace>
                Your place is #{leaderboardData.place}
              </LeaderboardPlace>
            )}
            <LeaderboardList>
              {leaderboardData?.top100.map((item, index) => (
                <LeaderboardItem
                  key={item.address}
                  isCurrentUser={item.address === address}
                >
                  <a
                    href={`https://app.zerion.io/${item.address}/overview`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <LeaderboardRank>#{index + 1}</LeaderboardRank>
                    <LeaderboardAddress>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {shortenAddress(item.address)}
                        </div>
                        <div
                          style={{
                            opacity: 0.7,
                            scale: 0.6,
                            width: "20px",
                            height: "20px",
                          }}
                        >
                          <ExternalLinkIcon />
                        </div>
                      </div>
                    </LeaderboardAddress>
                    <LeaderboardAmount>
                      {item.amount.toFixed(2)} CLNY
                    </LeaderboardAmount>
                  </a>
                </LeaderboardItem>
              ))}
            </LeaderboardList>
          </>
        )}
      </LeaderboardWrapper>
    </CommonModal>
  );
};
