import { ReactNode, Dispatch, SetStateAction, useState } from 'react';
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
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { CircleCheck, Loader, XCircle } from 'lucide-react';
import AnimatedButton from './ui/animated-button';

export type FormState = 'idle' | 'loading' | 'error' | 'success';

type Props = {
    children: ReactNode;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    description: string;
    confirmCopy: string;
    successCopy: { title: string; desc: string };
    errorCopy: { title: string; desc: string };
    disabled: boolean;
    formState: FormState;
    handle: () => void;
    reset: () => void;
};

const DialogWrapper = ({
    open,
    setOpen,
    children,
    title,
    description,
    confirmCopy,
    successCopy,
    errorCopy,
    disabled,
    formState,
    handle,
    reset,
}: Props) => {
    const [ref, bounds] = useMeasure();
    const [height, setHeight] = useState<number>(0);
    const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const CloseBtn = () => (
        <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
        </Button>
    );

    const ConfirmBtn = () => (
        <AnimatedButton
            key={formState}
            disabled={disabled}
            onClick={() => {
                setHeight(bounds.height);
                handle();
            }}
            type="submit"
        >
            {formState === 'loading' ? <Loader className="animate-spin" /> : <span>{confirmCopy}</span>}
        </AnimatedButton>
    );

    if (isDesktop) {
        return (
            <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent
                        onAnimationEnd={() => setAnimationCompleted(true)}
                        className="overflow-hidden sm:max-w-[425px] p-0"
                        onCloseAutoFocus={() => {
                            setAnimationCompleted(false);
                            reset();
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {formState == 'success' || formState == 'error' ? (
                                <motion.div
                                    key="completed"
                                    initial={{ y: -42, opacity: 0, filter: 'blur(4px)', height: height }}
                                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)', height: 250 }}
                                    transition={{ type: 'spring', duration: 0.6, bounce: 0 }}
                                    className="w-full z-40 bg-muted p-6 flex flex-col items-center justify-center text-center"
                                >
                                    {formState == 'success' ? (
                                        <>
                                            <CircleCheck className="text-primary !h-10 !w-10" />
                                            <p className="text-lg font-semibold mt-2 text-primary">
                                                {successCopy.title}
                                            </p>
                                            <p className="px-10 font-medium">{successCopy.desc}</p>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="text-destructive !h-10 !w-10" />
                                            <p className="text-lg font-semibold mt-2 text-destructive">
                                                {errorCopy.title}
                                            </p>
                                            <p className="px-10 font-medium">{errorCopy.desc}</p>
                                        </>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="max-w-full"
                                    exit={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
                                    transition={{ type: 'spring', duration: 0.6, bounce: 0 }}
                                    animate={animationCompleted ? { height: bounds.height } : {}}
                                    key="in-progress"
                                >
                                    <div className="space-y-5 p-6" ref={ref}>
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
                                                transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
                                            >
                                                {children}
                                            </motion.div>
                                        </AnimatePresence>
                                        <DialogFooter>
                                            <CloseBtn />
                                            <ConfirmBtn />
                                        </DialogFooter>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </DialogContent>
                </Dialog>
            </MotionConfig>
        );
    }

    return (
        <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent onCloseAutoFocus={reset} className="overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {formState == 'success' || formState == 'error' ? (
                            <motion.div
                                key="completed"
                                initial={{ y: -42, opacity: 0, filter: 'blur(4px)', height: height }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', height: 250 }}
                                transition={{ type: 'spring', duration: 0.6, bounce: 0 }}
                                className="w-full z-40 p-4 flex flex-col items-center justify-center text-center"
                            >
                                {formState == 'success' ? (
                                    <>
                                        <CircleCheck className="text-primary !h-10 !w-10" />
                                        <p className="text-lg font-semibold mt-2 text-primary">
                                            {successCopy.title}
                                        </p>
                                        <p className="px-10 font-medium">{successCopy.desc}</p>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="text-destructive !h-10 !w-10" />
                                        <p className="text-lg font-semibold mt-2 text-destructive">{errorCopy.title}</p>
                                        <p className="px-10 font-medium">{errorCopy.desc}</p>
                                    </>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                exit={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
                                transition={{ type: 'spring', duration: 0.6, bounce: 0 }}
                                animate={{ height: bounds.height }}
                                key="in-progress"
                                className="overflow-hidden"
                            >
                                <div className="space-y-5 p-4" ref={ref}>
                                    <DrawerHeader className="p-0">
                                        <DrawerTitle className="capitalize">{title}</DrawerTitle>
                                        <DrawerDescription>{description}</DrawerDescription>
                                    </DrawerHeader>
                                    <AnimatePresence initial={false} mode="popLayout">
                                        <motion.div
                                            key={title}
                                            initial={{ y: '-110%', opacity: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ y: '110%', opacity: 0 }}
                                        >
                                            {children}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {formState == 'idle' || formState == 'loading' ? (
                        <DrawerFooter className="p-4 bg-background z-20">
                            <CloseBtn />
                            <ConfirmBtn />
                        </DrawerFooter>
                    ) : null}
                </DrawerContent>
            </Drawer>
        </MotionConfig>
    );
};

export default DialogWrapper;
