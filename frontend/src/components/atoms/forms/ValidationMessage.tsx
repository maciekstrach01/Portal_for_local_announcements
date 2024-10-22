type ValidationMessageProps = {
    message: string;
};

const ValidationMessage = ({ message }: ValidationMessageProps) => (
    <div className="text-sm text-red-600 mb-2">{message}</div>
);

export default ValidationMessage;
