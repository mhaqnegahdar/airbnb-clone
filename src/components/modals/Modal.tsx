"use client";
import { useState, useEffect, useCallback } from "react";
import { ModalProps } from "@/types";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
  primaryBtnFormId,
  primaryBtnLabel,
  primaryBtnType,
  primaryBtnAction,
  secondaryBtnLabel,
  secondaryBtnType,
  secondaryBtnFormId,
  secondaryBtnAction,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => setShowModal(isOpen), [isOpen]);

  // Handle Close
  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  //   Handle Submit
  const handleSubmit = useCallback(() => {
    if (disabled) return;
    if (primaryBtnAction) primaryBtnAction();
  }, [disabled, primaryBtnAction]);

  //   Handle Secondary Action
  const handlesecondaryBtnAction = useCallback(() => {
    if (disabled || !secondaryBtnAction) return;

    secondaryBtnAction();
  }, [disabled, secondaryBtnAction]);

  //  if close
  if (!isOpen) return null;

  return (
    <div className="fixed flex items-center justify-center overflow-y-auto overscroll-x-nonea z-50 inset-0 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full h-full md:w-4/6 md:h-auto lg:w-3/6 xl:w-2/5  my-6 mx-auto">
        {/* CONTENT */}
        <div
          className={` translate duration-300 h-full
          ${showModal ? "translate-y-0" : "translate-y-full"} ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative flex flex-col w-full h-full md:h-auto border-0 rounded-lg shadow-lg outline-none focus:outline-none bg-white ">
            {/* HEADER */}
            <header className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
              <button
                onClick={handleClose}
                title="Close"
                className="absolute left-9 p-1 hover:opacity-70 transition"
              >
                <IoMdClose size={18} />
              </button>
              <span className="text-lg font-semibold">{title}</span>
            </header>
            {/* Body */}
            <main className="relative p-6 flex-auto ">{body} </main>
            {/* Footer */}
            <footer className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center w-full gap-4">
                {/* Secondary BTN */}
                {secondaryBtnLabel && secondaryBtnAction && (
                  <Button
                    outline
                    label={secondaryBtnLabel}
                    onClick={handlesecondaryBtnAction}
                    btnType={secondaryBtnType ? secondaryBtnType : "button"}
                    disabled={disabled}
                  />
                )}
                {secondaryBtnLabel && secondaryBtnFormId && (
                  <Button
                    outline
                    formId={secondaryBtnFormId}
                    label={secondaryBtnLabel}
                    btnType={secondaryBtnType ? secondaryBtnType : "button"}
                    disabled={disabled}
                  />
                )}
                {/* Primary BTN */}
                {secondaryBtnLabel && primaryBtnFormId ? (
                  <Button
                    formId={primaryBtnFormId}
                    btnType={primaryBtnType}
                    label={primaryBtnLabel!}
                    disabled={disabled}
                  />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    btnType={primaryBtnType}
                    label={primaryBtnLabel!}
                    disabled={disabled}
                  />
                )}
              </div>
              {footer}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
