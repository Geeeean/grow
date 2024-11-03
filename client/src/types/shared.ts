import { Dispatch, SetStateAction } from "react";

export type BasicFormProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};
