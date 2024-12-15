type ValidationMessageProps = {
    message: string;
    mobileXsFont?: boolean;
};

const ValidationMessage = ({
    message,
    mobileXsFont = false
}: ValidationMessageProps) => (
    <div
        className={`text-red-600 ${mobileXsFont ? 'mb-1 text-xs sm:mb-2 sm:text-sm' : 'mb-2 text-sm'}`}
    >
        {message}
    </div>
);

export default ValidationMessage;
