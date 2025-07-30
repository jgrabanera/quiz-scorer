const Dropdown = ({ items }) => {
    return (
        <>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 max-w-[130px] w-full">
                {items.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </>
    );
};

export default Dropdown;
