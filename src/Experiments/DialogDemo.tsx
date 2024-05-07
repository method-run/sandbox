import { useRef } from "react";

export const DialogDemo = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div>
        <button onClick={() => dialogRef.current?.showModal()}>
          Open dialog
        </button>
      </div>
      <style>
        {`
    dialog {
      background-color: white;
      color: black;
      border: 1px solid black;
      border-radius: 5px;
    }
    ::backdrop {
      background-color: purple;
      opacity: 0.5;
    }
    `}
      </style>
      <dialog ref={dialogRef}>
        <form method="dialog">
          <button type="submit">Close</button>
          <br />
          Here's some dialog content
        </form>
      </dialog>
    </>
  );
};
