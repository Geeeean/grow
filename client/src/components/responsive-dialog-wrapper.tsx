import { ReactNode, Dispatch, SetStateAction } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import useMeasure from 'react-use-measure';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';

type Props = {
    children: ReactNode;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    description: string;
    confirmCopy: string;
    disabled: boolean;
    handleBtn: () => void;
};

const DialogWrapper = ({ open, setOpen, children, title, description, confirmCopy, disabled, handleBtn }: Props) => {
    const [ref, bounds] = useMeasure();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const ConfirmBtn = (
        <Button type="submit" disabled={disabled} onClick={handleBtn}>
            {confirmCopy}
        </Button>
    );

    if (isDesktop) {
        return (
            <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="overflow-hidden sm:max-w-[425px]">
                        <motion.div animate={{ height: bounds.height }}>
                            <div className="space-y-5" ref={ref}>
                                <DialogHeader>
                                    <DialogTitle className="capitalize">{title}</DialogTitle>
                                    <DialogDescription>{description}</DialogDescription>
                                </DialogHeader>
                                <AnimatePresence initial={false} mode="popLayout">
                                    <motion.div
                                        key={title}
                                        initial={{ x: '110%', opacity: 0 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ x: '-110%', opacity: 0 }}
                                    >
                                        {children}
                                    </motion.div>
                                </AnimatePresence>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    {ConfirmBtn}
                                </DialogFooter>
                            </div>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            </MotionConfig>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="capitalize">{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">{children}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DrawerClose>
                    {ConfirmBtn}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DialogWrapper;
