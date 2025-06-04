import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/utils';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Drawer } from 'vaul';
import { Dialog, DialogContent, DialogTitle } from './dialog';

interface ModalProps {
  children?: ReactNode;
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
}

/**
 * Modal component that renders a dialog or drawer based on screen size and configuration.
 *
 * This component conditionally renders either a Dialog or Drawer depending on whether the screen is mobile or desktop.
 * It handles closing the modal, managing state through props, and applying styles based on provided className.
 *
 * @param children - The content to be rendered inside the Modal.
 * @param className - Additional CSS classes to apply to the Modal content.
 * @param desktopOnly - If true, the Modal will only be shown on desktop sizes.
 * @param onClose - Callback function invoked when the Modal is closed.
 * @param preventDefaultClose - Prevents closing the Modal unless dragged if set to true.
 * @param setShowModal - Function to update the showModal state.
 * @param showModal - The current visibility state of the Modal.
 * @returns A Dialog or Drawer component based on screen size and configuration.
 */
export const Modal = ({
  children,
  className,
  desktopOnly,
  onClose,
  preventDefaultClose,
  setShowModal,
  showModal,
}: ModalProps) => {
  /**
   * Closes the modal based on certain conditions.
   *
   * This function checks if `preventDefaultClose` is true and if the modal was not dragged.
   * If both conditions are met, it returns early without closing the modal.
   * Otherwise, it sets `setShowModal` to false to close the modal visually.
   *
   * @param {Object} options - An object containing optional parameters.
   * @param {boolean} [options.dragged] - A flag indicating whether the modal was dragged.
   */
  const closeModal = ({ dragged }: { dragged?: boolean }) => {
    if (preventDefaultClose && !dragged) {
      return;
    }

    if (setShowModal) {
      setShowModal(false);
    }
  };

  const { isMobile } = useMediaQuery();

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true });
          }
        }}
      >
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content
            className={cn(
              'fixed !max-w-none bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white',
              className,
            )}
          >
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>

            {children}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal({ dragged: true });
        }
      }}
    >
      <DialogTitle className="sr-only">Dialog</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
