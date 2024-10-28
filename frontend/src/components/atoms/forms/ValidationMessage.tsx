type ValidationMessageProps = {
    message: string;
};

const ValidationMessage = ({ message }: ValidationMessageProps) => (
    <div className="text-xs text-red-600 mb-1 sm:mb-2 sm:text-sm">
        {message}
    </div>
);

export default ValidationMessage;
