import { ReactNode } from 'react';
import { Button, ButtonProps } from './button';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

type Props = {
    onClick: () => void;
    disabled: boolean;
    children: ReactNode;
} & ButtonProps;

const AnimatedButton = ({ onClick, disabled, children, ...props }: Props) => {
    return (
        <Button disabled={disabled} onClick={onClick} className="md:w-36" {...props}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    transition={{
                        type: 'spring',
                        duration: 0.3,
                        bounce: 0,
                    }}
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 25 }}
                >
                    {children}
                </motion.span>
            </AnimatePresence>
        </Button>
    );
};

export default AnimatedButton;
