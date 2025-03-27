import { useDispatch, useSelector } from 'react-redux';
import {
  baseAvailabilitySelector,
  basePlacementSelector,
  isBuildPendingSelector,
  isReplaceModeSelector,
  powerplantAvailabilitySelector,
  powerplantPlacementSelector,
  robotsAvailabilitySelector,
  robotsPlacementSelector,
  transportAvailabilitySelector,
  transportPlacementSelector
} from '@selectors/gameManagerSelectors';
import { setLandInfoPart } from '@slices/gameManagementSlice';
import { CONTRACT_METHODS } from '../types';
import useMetamask from './useMetamask';

const useGameManagement = () => {
  const dispatch = useDispatch();

  const { makeCallRequest } = useMetamask();

  const isBuildPending = useSelector(isBuildPendingSelector);
  const isGameRepaintMode = useSelector(isReplaceModeSelector);

  const getObjectsAvailability = async (tokenId: string) => {
    if (!window.GM || !address) return null;
    const data = await makeCallRequest<Array<Record<string, string>>>({
      contract: window.GM,
      method: CONTRACT_METHODS.getAttributesMany,
      params: [[tokenId]],
      address
    });

    if (!data) {
      return null;
    }
    const [bs, transport, ra, pp] = [
      data[0]['2'],
      data[0]['3'],
      data[0]['4'],
      data[0]['5']
    ];
    return {
      bs,
      transport,
      ra,
      pp
    };
  };

  const extractCoords = (infoArr: Record<string, any>) => {
    const { x, y } = infoArr;
    return {
      x,
      y
    };
  };

  const collectAllLandInfo = async (tokenId: string) => {
    const availData = await getObjectsAvailability(tokenId);

    if (!availData) {
      return;
    }

    const { bs, transport, ra, pp } = availData;

    const mockedCoords = {
      x: 100,
      y: 100
    };

    dispatch(
      setLandInfoPart({
        value: extractCoords(mockedCoords),
        // value: extractCoords(baseCoords),
        availability: bs,
        field: 'base'
      })
    );

    dispatch(
      setLandInfoPart({
        // value: extractCoords(transportCoords),
        value: extractCoords(mockedCoords),
        availability: transport,
        field: 'transport'
      })
    );
    dispatch(
      setLandInfoPart({
        //value: extractCoords(robotCoords),
        value: extractCoords(mockedCoords),
        availability: ra,
        field: 'robot'
      })
    );
    dispatch(
      setLandInfoPart({
        // value: extractCoords(powerCoords),
        value: extractCoords(mockedCoords),
        availability: pp,
        field: 'powerplant'
      })
    );
  };

  const isBaseAvailable = useSelector(baseAvailabilitySelector);
  const isBasePlaced = useSelector(basePlacementSelector);

  const isTransportAvailable = useSelector(transportAvailabilitySelector);
  const isTransportPlaced = useSelector(transportPlacementSelector);

  const isPowerplantAvailable = useSelector(powerplantAvailabilitySelector);
  const isPowerplantPlaced = useSelector(powerplantPlacementSelector);

  const isRobotAvailable = useSelector(robotsAvailabilitySelector);
  const isRobotPlaced = useSelector(robotsPlacementSelector);

  return {
    collectAllLandInfo,
    isBaseAvailable,
    isBasePlaced,
    isPowerplantPlaced,
    isPowerplantAvailable,
    isTransportAvailable,
    isTransportPlaced,
    isRobotAvailable,
    isRobotPlaced,
    isBuildPending,
    isGameRepaintMode
  };
};

export default useGameManagement;
