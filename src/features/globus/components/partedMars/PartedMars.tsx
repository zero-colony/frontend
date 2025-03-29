import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import PolygonSymbol3D from '@arcgis/core/symbols/PolygonSymbol3D';
import SceneView from '@arcgis/core/views/SceneView';
import { generateBlockie } from '@features/global/utils/blockie.canvas';
import {
  PartedMarsMainWrapper,
  PartedMarsViewWrapper,
} from '@features/globus/styles/partedMars.styles';
import { initView } from '@features/globus/utils/initView';
import {
  parseTokenNumber,
  simpleFillSymbol,
  toLat,
  toLong,
  toTokenNumber,
} from '@features/globus/utils/methods';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { cn } from '@root/lib/utils';
import { NETWORK_DATA } from '@root/settings';
import { addressSelector } from '@selectors/userStatsSelectors';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { parseEther } from 'viem';
import Web3 from 'web3';

interface Props {
  allTokens: string[] | null;
  myTokens: string[] | null;
  height: string;
  handleClaim: (
    token: number,
    { onSuccess }: { onSuccess?: () => void }
  ) => Promise<void>;
  balanceInWei: number | bigint;
  currency: string;
  web3?: React.MutableRefObject<Web3 | null>;
}

export const PartedMars = ({
  height,
  allTokens,
  myTokens,
  balanceInWei,
  currency,
  handleClaim,
}: Props) => {
  const [curToken, setCurToken] = React.useState<string | null>(null);
  const tokenRef = React.useRef<string | null>(null);
  const hoverLayer = React.useRef<GraphicsLayer>();
  const view = React.useRef<SceneView | null>(null);
  const tokensLayer = React.useRef<GraphicsLayer | null>(null);
  const address = useSelector(addressSelector);
  const arrowRef = React.useRef(null);

  // Tooltip state
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    longitudes: number[];
    latitudes: number[];
    token: number;
  } | null>(null);

  // Setup floating UI
  const { refs, floatingStyles, context, update } = useFloating({
    placement: 'bottom',
    middleware: [
      offset(10),
      flip({
        fallbackPlacements: ['top', 'left', 'right'],
        padding: 10,
      }),
      shift({
        padding: { left: 82, top: 10, right: 10, bottom: 10 },
      }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
  });

  useEffect(() => {
    if (view.current && view.current.popup) {
      view.current.popup.defaultPopupTemplateEnabled = false;
      view.current.popup.dockOptions = {
        buttonEnabled: false, // Disables the dock button
        breakpoint: false, // Prevents responsive docking
      };
    }
  }, []);

  const realView = view.current;

  useEffect(() => {
    if (!realView) return;

    const handleClick = (evt: any) => {
      const point = realView.toMap({ x: evt.x, y: evt.y });

      if (!point) return;
      const { latitude, longitude } = point;

      if (
        latitude === undefined ||
        latitude === null ||
        longitude === undefined ||
        longitude === null
      )
        return;

      const token = toTokenNumber(latitude, longitude) as number;

      setTooltipData({
        longitudes: [longitude, longitude + 1],
        latitudes: [latitude, latitude + 1],
        token: token,
      });

      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: evt.x,
            y: evt.y,
            top: evt.y,
            right: evt.x,
            bottom: evt.y,
            left: evt.x,
          };
        },
      });

      setIsTooltipOpen(true);
    };

    realView.on('click', handleClick);

    realView.on('drag', () => {
      setIsTooltipOpen(false);
    });

    realView.on('mouse-wheel', () => {
      setIsTooltipOpen(false);
    });

    realView.on('key-down', (event) => {
      // Hide tooltip on arrow keys, +/- keys, etc.
      if (
        event.key.includes('Arrow') ||
        event.key === '+' ||
        event.key === '-'
      ) {
        setIsTooltipOpen(false);
      }
    });
  }, [realView, refs]);

  useEffect(() => {
    if (myTokens === null || allTokens === null) return;
    if (!hoverLayer.current) return;
    hoverLayer.current.removeAll();

    if (curToken !== null) {
      const { x, y } = parseTokenNumber(curToken) ?? {};
      if (x !== undefined && y !== undefined) {
        const latitudes: [number, number] = [toLat(y), toLat(y + 1)];
        const longitudes: [number, number] = [toLong(x), toLong(x + 1)];

        const polygon = {
          type: 'polygon',
          rings: [
            [longitudes[0], latitudes[0]],
            [longitudes[0], latitudes[1]],
            [longitudes[1], latitudes[1]],
            [longitudes[1], latitudes[0]],
          ],
          spatialReference: { wkid: 104971 },
        };

        const simpleFillSymbolHover = !allTokens?.includes(curToken)
          ? simpleFillSymbol([33, 222, 33, 0.5]) // Green
          : simpleFillSymbol([200, 0, 0, 0.6]); // Red

        // Hide tooltip when moving or zooming

        const polygonGraphic = new Graphic({
          // @ts-expect-error some types
          geometry: polygon,
          symbol: simpleFillSymbolHover,
        });

        hoverLayer.current.add(polygonGraphic);
      }
    }
  }, [
    curToken,
    hoverLayer,
    allTokens,
    myTokens,
    currency,
    address,
    refs,
    update,
  ]);

  useEffect(() => {
    tokensLayer.current?.removeAll();
    // STEP 1 - render a view as soon as possible
    if (view.current === null) {
      const {
        tokenLayer: _tl,
        hoverLayer: _hl,
        view: _view,
      } = initView(tokenRef, setCurToken);
      tokensLayer.current = _tl;
      hoverLayer.current = _hl;
      view.current = _view;
    }

    // STEP 2 - render my tokens as soon as we get them
    // STEP 3 - render all other tokens as soon we get them
    if (myTokens !== null && allTokens !== null) {
      const simpleFillSymbolOrange = simpleFillSymbol([227, 15, 15, 0.5]);
      const simpleFillSymbolGreen = new PolygonSymbol3D({
        symbolLayers: [
          {
            type: 'fill',
            material: { color: [139, 227, 79, 0.4] },
          },
        ],
      });

      // first draw myTokens in green, then allTokens in orange
      for (const tokens of NETWORK_DATA.SOLDOUT
        ? [myTokens]
        : [myTokens, allTokens]) {
        for (const token of Array.from(tokens)) {
          const { x, y } = parseTokenNumber(token) ?? {};
          if (x !== undefined && y !== undefined && y >= 0 && y < 140) {
            const latitudes: [number, number] = [toLat(y), toLat(y + 1)];
            const longitudes: [number, number] = [toLong(x), toLong(x + 1)];

            const polygon = {
              type: 'polygon',
              rings: [
                [longitudes[0], latitudes[0]],
                [longitudes[0], latitudes[1]],
                [longitudes[1], latitudes[1]],
                [longitudes[1], latitudes[0]],
              ],
              spatialReference: { wkid: 104971 },
            };

            const polygonGraphic = new Graphic({
              // @ts-expect-error some ts error again
              geometry: polygon,
              symbol: myTokens.includes(token)
                ? simpleFillSymbolGreen
                : simpleFillSymbolOrange,
            });
            tokensLayer.current?.add(polygonGraphic);
          }
        }
      }
    }
  }, [allTokens, myTokens, tokensLayer]);

  const isMyToken =
    tooltipData?.token && myTokens?.includes(tooltipData.token.toString());

  const isAvailable =
    tooltipData?.token && !allTokens?.includes(tooltipData.token.toString());

  console.log('isMyToken', {});

  const isEnoughBalance = balanceInWei >= parseEther('0.009');

  const handleClaimToken = () => {
    if (!tooltipData?.token) return;

    handleClaim(tooltipData.token, {
      onSuccess: () => {
        setIsTooltipOpen(false);
      },
    });
  };

  return (
    <PartedMarsMainWrapper>
      <PartedMarsViewWrapper
        id="viewDiv"
        height={height}
        ref={refs.setReference}
      />

      {/* Tooltip */}
      {isTooltipOpen && tooltipData && (
        <div
          className="bg-black/75 relative rounded-lg backdrop-blur-xs text-white p-4"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="rgba(0, 0, 0, 0.75)"
          />

          <button
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={() => setIsTooltipOpen(false)}
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
            <div className="font-bold text-lg leading-none">
              Land plot #{tooltipData.token}
            </div>

            <div className="flex gap-6">
              <img
                src={generateBlockie(tooltipData.token).toDataURL()}
                className="h-40 w-40"
              />

              <div className="flex flex-col gap-4 justify-between">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-medium">
                  <div>
                    <div className="text-sm text-zinc-400 font-normal">
                      Longitudes
                    </div>
                    {tooltipData.longitudes[0].toFixed(2)} ..{' '}
                    {tooltipData.longitudes[1].toFixed(2)}
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 font-normal">
                      Latitudes
                    </div>
                    {tooltipData.latitudes[0].toFixed(2)} ..{' '}
                    {tooltipData.latitudes[1].toFixed(2)}
                  </div>

                  <div>
                    <div className="text-sm text-zinc-400 font-normal">
                      Status
                    </div>
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
      )}
    </PartedMarsMainWrapper>
  );
};
