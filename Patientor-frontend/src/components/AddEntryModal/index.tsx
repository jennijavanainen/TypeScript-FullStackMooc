import { Alert, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import {Diagnosis, EntryFormValues} from "../../types";

interface EntryProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
    diagnosis: Diagnosis[];
}

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnosis }: EntryProps) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add new entry</DialogTitle>
        <Divider/>
        <DialogContent>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnosis={diagnosis}/>
        </DialogContent>
    </Dialog>
);
export default AddEntryModal;