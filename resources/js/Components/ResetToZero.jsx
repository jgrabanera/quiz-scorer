import axios from "axios";

const ResetToZero = ({ name, qNumber, setqNumber }) => {
    function handleReset() {
        const formData = new FormData();
        formData.append("number", 1);
        axios
            .post("/update-current-question-number", formData)
            .then((response) => {
                setqNumber(Number(response.data.number));
            })
            .catch((error) => {
                console.error("Error updating question number:", error);
            });
    }

    return (
        <>
            <button
                onClick={() => handleReset()}
                className="px-3 py-2 border border-solid rounded-lg bg-blue-400 font-bold"
            >
                {name}
            </button>
        </>
    );
};

export default ResetToZero;
