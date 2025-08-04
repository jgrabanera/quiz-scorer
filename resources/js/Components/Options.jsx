const Options = ({
    id,
    items,
    itemValue,
    itemName,
    name,
    value,
    className = '',
    isFocused,
    onChange,
    defaultValue = "",
}) => {
    return (
        <div className={`relative ${className}`}>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pr-8 max-w-[130px] w-full appearance-none"
                autoFocus={isFocused}
            >
                <option className="text-gray-400" value="">
                    {defaultValue === "" ? "Choose" : defaultValue}
                </option>
                {items.map((item) => (
                    <option key={item[itemValue]} value={item[itemValue]}>
                        {item[itemName]}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default Options;
