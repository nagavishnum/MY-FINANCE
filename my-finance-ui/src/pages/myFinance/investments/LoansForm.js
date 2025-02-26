import { useEffect, useState } from "react";
import { AddData, UpdateData } from "../api/Api";

const LoansForm = ({ type, handleModal, getData, actionsData, route }) => {
    const [formData, setFormData] = useState({
        loanAmount: "",
        interestPerYear: "",
        whereLoanTaken: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { loanAmount, interestPerYear, whereLoanTaken } = formData;

    useEffect(() => {
        if (type === "edit" || type === "delete") {
            setFormData((prev) => ({
                ...prev,
                ...actionsData
            }));
        }
    }, [type, actionsData]);
    console.log(formData)
    const handleChange = (e) => {
        setErrorMsg("");
        const { name, value } = e.target;
        setFormData((prev) => {
            const updatedData = { ...prev, [name]: value };
            return {
                ...updatedData,
            };
        });
    };

    const handleValidation = () => {
        if (whereLoanTaken === "") {
            setErrorMsg("Pls enter All Fields")
            return false
        } else if (interestPerYear <= 0) {
            setErrorMsg("Pls enter Valid Intrest")
            return false
        } else if (loanAmount <= 0) {
            setErrorMsg("Pls enter Valid Amount")
            return false
        } else {
            return true
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = handleValidation();
        if (validation) {
            setErrorMsg("");
            try {
                let res;
                if (type === "edit") {
                    res = await UpdateData("loan", formData.id, formData);
                } else {
                    res = await AddData("loan", formData);

                }

                if ([200, 201].includes(res.status)) {
                    getData(route);
                    handleModal();
                }
                else {
                    setErrorMsg(res.message ?? "Something went wrong")
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setErrorMsg("Pls Enter All Fields & Valid Data");
        }
    }
    return (
        <form>
            <div className="formFields">
                {errorMsg && <p>{errorMsg}</p>}
                <input name="loanAmount" value={loanAmount} onChange={handleChange} placeholder="Amount" type="number" autoFocus />
                <input name="interestPerYear" value={interestPerYear} onChange={handleChange} placeholder="Intrest" type="number" />
                <input name="whereLoanTaken" value={whereLoanTaken} onChange={handleChange} placeholder="Loan took from" type="text" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default LoansForm;