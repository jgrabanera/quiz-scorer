import React from "react";

const Grid = () => {
    const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

    const handleClick = (item) => {
        alert(`You clicked on ${item}`);
        // or navigate, update state, etc.
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-2">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(item)}
                        className="bg-blue-200 hover:bg-blue-300 text-center p-6 rounded shadow transition duration-200"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Grid;
