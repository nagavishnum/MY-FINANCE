import { useEffect, useState } from "react";
import { AddData, UpdateData } from "../api/Api";

const InvestmentForm = ({ type, handleModal, getData, actionsData, route }) => {
    const [formData, setFormData] = useState({
        whereInvested: "",
        amountInvested: "",
        returnPercent: "",
        totalReturn: 0,
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { whereInvested, amountInvested, returnPercent } = formData;

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
                totalReturn: (parseFloat(updatedData.returnPercent) / 100) * parseFloat(updatedData.amountInvested) || 0,
            };
        });
    };

    const handleValidation = () => {
        if (whereInvested === "") {
            setErrorMsg("Pls enter All Fields")
            return false
        } else if (amountInvested <= 0) {
            setErrorMsg("Pls enter Valid Invested Amount")
            return false
        } else if (returnPercent <= 0) {
            setErrorMsg("Pls enter Valid Return percentage")
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
                    res = await UpdateData("investment", formData.id, formData);
                } else {
                    res = await AddData("investment", formData);
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
                <input name="whereInvested" value={whereInvested} onChange={handleChange} placeholder="Invested At" type="text" autoFocus />
                <input name="amountInvested" value={amountInvested} onChange={handleChange} placeholder="Amount Invested" type="number" />
                <input name="returnPercent" value={returnPercent} onChange={handleChange} placeholder="Expected Return" type="number" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default InvestmentForm;