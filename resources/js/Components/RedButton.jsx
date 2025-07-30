const RedButton = ({ name }) => {
    return (
        <>
            <button className="px-3 py-2 border border-solid rounded-lg bg-red-400 font-bold">
                {name}
            </button>
        </>
    );
};

export default RedButton;
