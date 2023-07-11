interface Props {
    showError: boolean;
    errorMessage: string;
}
const ErrorLogger = ({ showError, errorMessage } : Props) => {
    return (
        <div>
            {showError && <p>error: + {errorMessage}</p> }
        </div>
    );
};

export default ErrorLogger;