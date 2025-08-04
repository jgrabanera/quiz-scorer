export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block font-medium  roboto-thin text-sm mb-2
                ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
