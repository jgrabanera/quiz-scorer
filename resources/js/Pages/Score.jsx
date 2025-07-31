import Dropdown from "@/Components/Dropdown";
import GreenButton from "@/Components/GreenButton";
import NextQButton from "@/Components/NextQButton";
import RedButton from "@/Components/RedButton";
import ResetToZero from "@/Components/ResetToZero";
import axios from "axios";
import { useEffect, useState } from "react";

const score = () => {
    const [tblStudent, setTblStudent] = useState([]);
    const [qNumber, setqNumber] = useState();
    const [level, setLevel] = useState(0);

    const dropDownItems = [
        {
            score: 1,
            label: "Easy",
        },
        {
            score: 3,
            label: "Average",
        },
        {
            score: 5,
            label: "Difficult",
        },
    ];

    useEffect(() => {
        axios
            .get("/get-student-info")
            .then((response) => {
                setTblStudent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        axios
            .get("/get-current-question-number")
            .then((response) => {
                console.log(response.data);

                setqNumber(response.data.number);
                setLevel(response.data.current_point);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Level: ", level);
    }, [level]);

    return (
        <div>
            <div className="p-2">
                <h1 className="w-full bg-blue-200 p-3 text-3xl text-center font-bold">
                    Question no. {qNumber}
                </h1>
                <br />
                <div className="flex flex-row justify-between items-center ">
                    <Dropdown
                        level={level}
                        setLevel={setLevel}
                        items={dropDownItems}
                    />
                    <ResetToZero
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Reset Questions"}
                    />
                    <NextQButton
                        qNumber={qNumber}
                        setqNumber={setqNumber}
                        name={"Next Question"}
                    />
                </div>
                <br />

                <table className="w-full">
                    <tbody>
                        {tblStudent.map((student, index) => (
                            <tr
                                key={student.id}
                                className="flex justify-center items-center border-b-2 py-2"
                            >
                                <td className="font-bold max-w-[300px] w-full text-sm">
                                    <span className="font-normal text-xs">
                                        {index + 1}.{" "}
                                    </span>
                                    {student.name}
                                </td>
                                <td>
                                    <GreenButton
                                        student={student.name}
                                        level={level}
                                        qNumber={qNumber}
                                        name={"Correct"}
                                        onClick={() => handleCorrect}
                                    />
                                </td>
                                <td>
                                    <RedButton name={"Wrong"} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default score;
