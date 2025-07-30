import Dropdown from "@/Components/Dropdown";
import GreenButton from "@/Components/GreenButton";
import RedButton from "@/Components/RedButton";
import ToggleBox from "@/Components/ToggleBox";

const score = () => {
    const tblStudent = [];

    return (
        <div>
            <div className="p-2">
                <h1 className="w-full bg-blue-200 p-3 text-3xl text-center font-bold">
                    Question #1
                </h1>
                <br />
                <div className="flex flex-row justify-between items-center ">
                    <Dropdown items={["Easy", "Average", "Difficult"]} />
                    <GreenButton name={"Next Question"} />
                </div>
                <br />

                <table className="w-full">
                    <tbody>
                        {tblStudent.map((student) => (
                            <tr
                                key={student.id}
                                className="flex justify-center items-center border-b-2 py-2"
                            >
                                <td className="font-bold max-w-[200px] w-full text-sm">
                                    <span className="font-normal text-xs">
                                        {student.id}.{" "}
                                    </span>
                                    {student.name}
                                </td>
                                <td>
                                    <GreenButton name={"Correct"} />
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
