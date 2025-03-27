import React from 'react';
import Graphic from '@arcgis/core/Graphic';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import { toLat, toLong, toTokenNumber } from '@features/globus/utils/methods';
import Web3 from 'web3';

const polylineSymbol = {
  type: 'simple-line',
  color: [0, 0, 0],
  width: 0.5,
};

export const initView = (
  tokenRef: React.MutableRefObject<string | null>,
  setCurToken: React.Dispatch<React.SetStateAction<string | null>>
): {
  tokenLayer: GraphicsLayer;
  hoverLayer: GraphicsLayer;
  view: SceneView;
} => {
  const tokenLayer = new GraphicsLayer();
  const hoverLayer = new GraphicsLayer();
  const gridLayer = new GraphicsLayer();

  if (localStorage.getItem('land_disabled')) {
    return {
      tokenLayer,
      hoverLayer,
      view: new SceneView(),
    };
  }

  const marsImagery = new TileLayer({
    url: 'https://astro.arcgis.com/arcgis/rest/services/OnMars/MDIM/MapServer',
    title: 'Imagery',
    copyright: 'USGS Astrogeology Science Center, NASA, JPL, Esri',
  });

  const marsElevation = new ElevationLayer({
    url: 'https://astro.arcgis.com/arcgis/rest/services/OnMars/MDEM200M/ImageServer',
    copyright:
      'NASA, ESA, HRSC, Goddard Space Flight Center, USGS Astrogeology Science Center, Esri',
  });

  const cratersLayer = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Mars_Nomenclature_Mountains/FeatureServer',
    definitionExpression: "type = 'Crater, craters'",
    title: 'Craters',
    renderer: {
      // @ts-ignore
      type: 'simple',
      symbol: {
        type: 'polygon-3d',
        symbolLayers: [
          {
            type: 'fill',
            material: { color: [255, 255, 255, 0.1] },
            outline: {
              color: [0, 0, 0, 0.4],
              size: 2,
            },
          },
        ],
      },
    },
    labelingInfo: [
      {
        labelPlacement: 'above-center',
        labelExpressionInfo: { expression: '$feature.NAME' },
        symbol: {
          type: 'label-3d',
          symbolLayers: [
            {
              // @ts-ignore
              type: 'text',
              material: {
                color: [255, 255, 255, 0.9],
              },
              halo: {
                size: 0.5,
                color: [0, 0, 0, 0.7],
              },
              font: {
                size: 8,
              },
            },
          ],
          verticalOffset: {
            screenLength: 40,
            maxWorldLength: 500000,
            minWorldLength: 0,
          },
          callout: {
            type: 'line',
            size: 0.5,
            color: [255, 255, 255, 0.9],
            border: {
              color: [0, 0, 0, 0.3],
            },
          },
        },
      },
    ],
  });

  for (let x = 0; x < 150; x++) {
    const long = toLong(x);
    const polyline = {
      type: 'polyline',
      paths: [
        [long, toLat(0)],
        [long, -toLat(0)],
      ],
      spatialReference: { wkid: 104971 },
    };
    const polygonGraphic = new Graphic({
      geometry: polyline,
      symbol: polylineSymbol,
    });
    gridLayer.add(polygonGraphic);
  }

  for (let y = 0; y <= 140; y++) {
    const lat = toLat(y);
    const polyline = {
      type: 'polyline',
      paths: [
        [toLong(0), lat],
        [-toLong(0), lat],
      ],
      spatialReference: { wkid: 104971 },
    };
    const polygonGraphic = new Graphic({
      geometry: polyline,
      symbol: polylineSymbol,
    });
    gridLayer.add(polygonGraphic);
  }

  const map = new Map({
    ground: { layers: [marsElevation] },
    layers: [marsImagery, gridLayer],
  });

  map.add(tokenLayer);
  map.add(hoverLayer);
  map.add(cratersLayer);

  const view = new SceneView({
    map: map,
    container: 'viewDiv',
    qualityProfile: 'high',
    spatialReference: { wkid: 104971 },
    camera: {
      position: {
        x: -51,
        y: -29.6,
        z: 6000000,
        spatialReference: { wkid: 104971 },
      },
      heading: 350,
      tilt: 12.3,
    },
    environment: {
      lighting: {
        directShadowsEnabled: false,
        ambientOcclusionEnabled: false,
        // cameraTrackingEnabled: false,
      },
    },
  });
  // @ts-ignore
  window.view = view;
  view.on('pointer-move', (evt) => {
    const point = view.toMap({ x: evt.x, y: evt.y }) ?? {};

    const { latitude, longitude } = point;

    const token = toTokenNumber(latitude, longitude);
    setCurToken(token === null ? null : token.toString());
    tokenRef.current = token === null ? null : token.toString();
  });

  return {
    tokenLayer,
    hoverLayer,
    view,
  };
};
