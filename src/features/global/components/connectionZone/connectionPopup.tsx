import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { copyTextToClipboard } from '@features/globus/utils/methods';
import { Copy } from '@root/images/icons/Copy';
import { CURRENT_CHAIN } from '@root/settings/chains';
import { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useDisconnect } from 'wagmi';

interface ConnectionPopupProps {
  address: `0x${string}` | undefined;
  triggerRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionPopup = ({
  address,
  triggerRef,
  isOpen,
  onClose,
}: ConnectionPopupProps) => {
  const { addToast } = useToasts();
  const { disconnect } = useDisconnect();

  // Floating UI setup
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      let flagConnection = false;
      for (const value of event.composedPath()) {
        if (
          'headerInfo' === (value as HTMLElement).id ||
          'connectionInfo' === (value as HTMLElement).id ||
          'connectionPopup' === (value as HTMLElement).id
        ) {
          flagConnection = true;
          break;
        }
      }
      if (!flagConnection) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleMouseClick);
    }

    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, [isOpen, onClose]);

  // Connect the external reference to our floating UI
  useEffect(() => {
    if (triggerRef.current) {
      refs.setReference(triggerRef.current);
    }
  }, [triggerRef, refs]);

  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            width: triggerRef.current?.clientWidth,
          }}
          id="connectionPopup"
          className="bg-[#2E2E33] rounded-lg p-4 shadow-lg z-50"
          {...getFloatingProps()}
        >
          <div className="mb-4">
            <div className="text-lg font-bold text-white mb-2">Account</div>
            <div>
              <div className="">
                <button
                  className="!text-white text-sm flex items-center gap-2 w-full overflow-hidden text-ellipsis hover:text-opacity-80 transition-colors focus-visible:outline-none"
                  onClick={() => {
                    if (address) {
                      copyTextToClipboard(address)
                        .then(() => {
                          addToast('Address has been copied to clipboard', {
                            appearance: 'success',
                          });
                        })
                        .catch((error) => {
                          console.error(error);
                          addToast('Copying to clipboard has failed', {
                            appearance: 'error',
                          });
                        });
                    }
                  }}
                >
                  <span className="overflow-hidden text-ellipsis">
                    {address}
                  </span>{' '}
                  <Copy className="size-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center *:flex-1/2 gap-2">
            <button
              className="w-full h-[30px] flex items-center justify-center uppercase cursor-pointer font-bold text-xs bg-[#FE5161] rounded-md transition-colors"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
            <div className="flex items-center">
              <a
                href={`${CURRENT_CHAIN.explorer}/address/${address}`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center h-[30px] flex items-center justify-center uppercase text-xs font-bold cursor-pointer text-white bg-[#1C1C1F] rounded-md transition-colors"
              >
                Explorer
              </a>
            </div>
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};
