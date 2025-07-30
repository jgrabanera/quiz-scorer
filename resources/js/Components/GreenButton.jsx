const GreenButton = ({ name }) => {
    function handleCorrect() {
        axios
            .post("/update-student-score", {
                name: "John Doe",
                email: "john@example.com",
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    }
    return (
        <>
            <button
                onClick={() => handleCorrect}
                className="px-3 py-2 border border-solid rounded-lg bg-green-400 font-bold"
            >
                {name}
            </button>
        </>
    );
};

export default GreenButton;
