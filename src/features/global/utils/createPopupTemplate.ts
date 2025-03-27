import CustomContent from '@arcgis/core/popup/content/CustomContent';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import { NETWORK_DATA } from '@root/settings';
import { formatEther, parseEther } from 'viem';

/**
 * Creates a custom popup template for land plots
 * @param {Object} options - Configuration options for the popup
 * @returns {PopupTemplate} The configured popup template
 */
export function createLandPlotPopupTemplate(options = {}) {
  // Create the custom content for the land plot info
  const landPlotContent = new CustomContent({
    type: 'custom', // This is required for proper typecasting
    outFields: ['*'],
    creator: (event) => {
      // Extract attributes from the feature
      const graphic = event.graphic;
      const attributes = graphic.attributes || {};

      // Parse attributes or use defaults from options
      const token = attributes.token || options.token;
      const occupied = attributes.occupied || options.occupied || false;
      const balance = attributes.balance || options.balance || 0;
      const currency = attributes.currency || options.currency || 'ETH';
      const notEnoughBalance =
        attributes.notEnoughBalance || options.notEnoughBalance || false;

      // Get coordinates from geometry or options
      let longitudes = options.longitudes;
      let latitudes = options.latitudes;

      // If we have geometry on the graphic, extract coordinates
      if (graphic.geometry) {
        const extent = graphic.geometry.extent;
        if (extent) {
          longitudes = [extent.xmin, extent.xmax];
          latitudes = [extent.ymin, extent.ymax];
        }
      }

      // Create the popup content from these attributes
      const container = document.createElement('div');
      container.innerHTML = createPopupHtml({
        longitudes,
        latitudes,
        token,
        occupied,
        balance,
        currency,
        notEnoughBalance,
      });

      // Add event listener to the claim button if it exists
      const claimButton = container.querySelector('#claim-button');
      if (claimButton && !claimButton.hasAttribute('disabled')) {
        claimButton.addEventListener('click', () => {
          // Call your claim function here
          console.log(`Claiming token ${token}`);

          // You could emit an event or call a callback
          if (options.onClaim) {
            options.onClaim(token);
          }
        });
      }

      return container;
    },
  });

  // Create and return the popup template
  return new PopupTemplate({
    title: 'Land Plot #{token}',
    content: [landPlotContent],
    outFields: ['*'],
  });
}

/**
 * Creates the HTML content for the popup
 * @private
 */
function createPopupHtml({
  longitudes,
  latitudes,
  token,
  occupied,
  balance,
  currency,
  notEnoughBalance,
}) {
  const price = parseEther('0.009');
  const status = occupied ? 'Occupied' : 'Available';
  const buttonDisabled = balance < price || occupied;

  // Create the HTML template with inlined styles
  return `
    <div style="width: 600px; background-color: #1a1a1a; border-radius: 8px; overflow: hidden; color: white; border: 1px solid #333;">
      <div style="display: flex; padding: 20px;">
        <div style="width: 250px; height: 250px; background-color: #222; margin-right: 20px;">
          <img src="${
            NETWORK_DATA.LAND_META_SERVER
          }${token}.png" alt="Land Plot #${token}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
          <div style="margin-bottom: 30px;">
            <div style="margin-bottom: 10px; font-size: 18px;">Status: <span style="font-size: 24px;">${status}</span></div>
            ${
              !occupied
                ? `<div style="margin-bottom: 10px; font-size: 18px;">Fee: <span style="font-size: 24px;">${formatEther(
                    price
                  )} ${currency}</span></div>`
                : ''
            }
          
            <div style="margin-bottom: 10px; font-size: 18px;">Longitudes ${longitudes[0].toFixed(
              2
            )} .. ${longitudes[1].toFixed(2)}</div>
            <div style="margin-bottom: 10px; font-size: 18px;">Latitudes ${latitudes[0].toFixed(
              2
            )} .. ${latitudes[1].toFixed(2)}</div>
          </div>
          ${
            !occupied
              ? `
            <div 
              id="claim-button"
              style="color: white; border: none; border-radius: 6px; padding: 20px; font-size: 18px; font-weight: bold; margin-bottom: 10px; background-color: ${
                buttonDisabled ? '#444' : '#ff0000'
              }; cursor: ${buttonDisabled ? 'not-allowed' : 'pointer'};"
              ${buttonDisabled ? 'disabled' : ''}
            >
              CLAIM NOW
            </div>
          `
              : ''
          }
          ${
            notEnoughBalance && !occupied
              ? `<div style="color: #ff5555; text-align: center; font-size: 16px;">insufficient balance</div>`
              : ''
          }
        </div>
      </div>
    </div>
  `;
}

/**
 * Example usage:
 *
 * // Import the function
 * import { createLandPlotPopupTemplate } from './path-to-this-file';
 *
 * // Create a feature layer
 * const landPlotsLayer = new FeatureLayer({
 *   url: "your-feature-layer-url",
 *   outFields: ["*"],
 *   // Assign the popup template
 *   popupTemplate: createLandPlotPopupTemplate({
 *     onClaim: (tokenId) => {
 *       // Handle claim action
 *       console.log(`User claimed token ${tokenId}`);
 *     }
 *   })
 * });
 *
 * // Add to map
 * map.add(landPlotsLayer);
 */
