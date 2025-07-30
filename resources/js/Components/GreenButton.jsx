const GreenButton = ({ name }) => {
    return (
        <>
            <button className="px-3 py-2 border border-solid rounded-lg bg-green-400 font-bold">
                {name}
            </button>
        </>
    );
};

export default GreenButton;
