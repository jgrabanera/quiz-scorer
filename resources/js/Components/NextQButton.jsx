import axios from "axios";

const NextQButton = ({ name, qNumber, setqNumber }) => {
    function handleNextQuestionNo() {
        const formData = new FormData();
        formData.append("number", qNumber + 1);
        axios
            .post("/update-current-question-number", formData)
            .then((response) => {
                setqNumber(qNumber + 1);

                console.log(response.data.number);
            })
            .catch((error) => {
                console.error("Error updating question number:", error);
            });
    }
    return (
        <>
            <button
                onClick={() => handleNextQuestionNo()}
                className="px-3 py-2 border border-solid rounded-lg bg-green-400 font-bold"
            >
                {name}
            </button>
        </>
    );
};

export default NextQButton;
