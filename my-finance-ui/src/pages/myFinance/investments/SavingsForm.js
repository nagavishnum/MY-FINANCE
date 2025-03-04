import { useEffect, useState } from "react";
import { AddData, UpdateData } from "../api/Api";

const SavingsForm = ({ type, handleModal, getData, actionsData, route }) => {
    const [formData, setFormData] = useState({
        savingsLocation: "",
        amountSaved: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { savingsLocation, amountSaved } = formData;

    useEffect(() => {
        if (type === "edit") {
            setFormData((prev) => ({
                ...prev,
                ...actionsData
            }));
        }
    }, [type, actionsData]);

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
        if (savingsLocation === "" || amountSaved <=0) {
            setErrorMsg("Pls enter All Fields")
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
                    res = await UpdateData("savings", formData.id, formData);

                } else {
                    res = await AddData("savings", formData);

                }

                if (res) {
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
                <input name="savingsLocation" value={savingsLocation} onChange={handleChange} placeholder="Saved At" type="text" autoFocus />
                <input name="amountSaved" value={amountSaved} onChange={handleChange} placeholder="Amount Saved" type="number" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default SavingsForm;