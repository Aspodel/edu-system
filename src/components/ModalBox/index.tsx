import * as React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

interface IModalBoxProps extends ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  footerButtons?: React.ReactNode[];
}

function ModalBox({
  title,
  children,
  isOpen,
  onClose,
  size,
  footerButtons,
}: IModalBoxProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {footerButtons?.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalBox;
