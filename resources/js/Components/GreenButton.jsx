const GreenButton = ({ name, student, level, qNumber }) => {
    function handleCorrect() {
        axios
            .post("/insert-student-score", {
                name: student,
                question: qNumber,
                score: level,
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
                onClick={() => handleCorrect()}
                className="px-3 py-2 border border-solid rounded-lg bg-green-400 font-bold"
            >
                {name}
            </button>
        </>
    );
};

export default GreenButton;
