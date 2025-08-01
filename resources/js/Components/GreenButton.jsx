import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const GreenButton = ({ name, student, level, qNumber }) => {
    const [save, setSave] = useState(false);
    function handleCorrect() {
        axios
            .post("/insert-student-score", {
                name: student,
                question: qNumber,
                score: level,
            })
            .then((response) => {
                console.log(response.data);
                setSave(true);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    }
    return (
        <>
            <button
                disabled={save}
                onClick={() => handleCorrect()}
                onDoubleClick={() => setSave(!save)}
                className="px-3 py-2 border border-solid rounded-lg bg-green-400 font-bold"
                style={{ backgroundColor: save ? "#dbdbdb" : "#4ade80" }}
            >
                {save ? "Saved" : name}
            </button>
        </>
    );
};

export default GreenButton;
