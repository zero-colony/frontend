import React from 'react';
import { MOBILE_BREAKPOINT } from '@features/global/constants';
import { generateBlockie } from '@features/global/utils/blockie.canvas';
import { cn } from '@root/lib/utils';
import { useMediaQuery } from 'usehooks-ts';
import { parseEther } from 'viem';
import { FloatingArrow, FloatingContext } from '@floating-ui/react';

export interface TooltipData {
  longitudes: number[];
  latitudes: number[];
  token: number;
}

export interface LandPlotTooltipProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: TooltipData | null;
  myTokens: string[] | null;
  allTokens: string[] | null;
  balanceInWei: number | bigint;
  handleClaim: (
    token: number,
    { onSuccess }: { onSuccess?: () => void }
  ) => Promise<void>;
  floatingProps: {
    refs: {
      setFloating: (node: HTMLElement | null) => void;
      setReference: (node: HTMLElement | null) => void;
    };
    floatingStyles: React.CSSProperties;
    context: FloatingContext;
  };
  arrowRef: React.RefObject<SVGSVGElement>;
}

export const LandPlotTooltip = ({
  isOpen,
  setIsOpen,
  data,
  myTokens,
  allTokens,
  balanceInWei,
  handleClaim,
  floatingProps,
  arrowRef,
}: LandPlotTooltipProps) => {
  if (!isOpen || !data) return null;

  const isMyToken = data.token && myTokens?.includes(data.token.toString());
  const isAvailable = data.token && !allTokens?.includes(data.token.toString());
  const isEnoughBalance = balanceInWei >= parseEther('0.009');

  const handleClaimToken = () => {
    if (!data.token) return;

    handleClaim(data.token, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <div
      className="bg-black/75 relative rounded-lg backdrop-blur-xs text-white p-4"
      ref={floatingProps.refs.setFloating}
      style={floatingProps.floatingStyles}
    >
      <FloatingArrow
        ref={arrowRef}
        context={floatingProps.context}
        fill="rgba(0, 0, 0, 0.75)"
      />

      <button
        className="absolute top-0 right-0 p-4 cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <svg
          className="size-4 text-zinc-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img
            src={generateBlockie(data.token).toDataURL()}
            className="sm:hidden size-7 rounded-full"
            alt={`Land plot ${data.token}`}
          />
          <span className="font-bold text-xl sm:text-lg leading-none">
            Land plot #{data.token}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={generateBlockie(data.token).toDataURL()}
            className="hidden sm:block size-40"
            alt={`Land plot ${data.token}`}
          />

          <div className="flex flex-col gap-4 justify-between">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-medium">
              <div>
                <div className="text-sm text-zinc-400 font-normal">
                  Longitudes
                </div>
                {data.longitudes[0].toFixed(2)} ..{' '}
                {data.longitudes[1].toFixed(2)}
              </div>
              <div>
                <div className="text-sm text-zinc-400 font-normal">
                  Latitudes
                </div>
                {data.latitudes[0].toFixed(2)} .. {data.latitudes[1].toFixed(2)}
              </div>

              <div>
                <div className="text-sm text-zinc-400 font-normal">Status</div>
                {isAvailable && !isMyToken && 'Available'}
                {isMyToken && 'Your land'}
                {!isAvailable && !isMyToken && 'Occupied'}
              </div>
            </div>

            <div>
              {isAvailable && !isMyToken && (
                <button
                  className={cn(
                    'bg-primary cursor-pointer font-bold uppercase w-full px-4 py-2 rounded-md',
                    !isEnoughBalance &&
                      'bg-white/10 !text-white/50 cursor-not-allowed text-sm'
                  )}
                  disabled={!isEnoughBalance}
                  onClick={handleClaimToken}
                >
                  {isEnoughBalance
                    ? 'Claim for 0.009 ETH'
                    : 'Insufficient balance'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
