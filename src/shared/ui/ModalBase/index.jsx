import { Box, Dialog, DialogTitle } from "@mui/material";

export const ModalBase = (props) => {

    const { onClose, isOpen, children, title } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            
            <Box>{children}</Box>
        </Dialog>
    );
}