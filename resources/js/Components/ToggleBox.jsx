const ToggleBox = () => {
    return (
        <div>
            <div className="grid-cols-2 gap-3">
                <button className="px-5 py-3 border border-solid rounded-lg bg-green-400 font-bold">
                    Correct
                </button>
                <button className="px-5 py-3 border border-solid rounded-lg bg-red-400 font-bold">
                    Wrong
                </button>
            </div>
        </div>
    );
};

export default ToggleBox;
