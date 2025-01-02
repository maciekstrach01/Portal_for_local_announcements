type Props = {
    categoryName: string;
    timeInfo: string;
    className?: string;
};

const ItemHeader = ({ categoryName, timeInfo, className = '' }: Props) => {
    return (
        <div
            className={`flex items-center justify-between text-sm md:text-base ${className}`}
        >
            <div className="text-primary-500">{categoryName}</div>

            <div className="text-slate-700">{timeInfo}</div>
        </div>
    );
};

export default ItemHeader;
