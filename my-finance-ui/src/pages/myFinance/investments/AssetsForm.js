import { useEffect, useState } from "react";
import { AddData, UpdateData } from "../api/Api";

const AssetsForm = ({ type, handleModal, getData, actionsData, route }) => {
    const [formData, setFormData] = useState({
        assetName: "",
        currentValue: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { assetName, currentValue } = formData;

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
        if (assetName === "" || currentValue === "") {
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
                    res = await UpdateData("assets", formData.id, formData);

                } else {
                    res = await AddData("assets", formData);
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
                <input name="assetName" value={assetName} onChange={handleChange} placeholder="Asset" type="text" autoFocus />
                <input name="currentValue" value={currentValue} onChange={handleChange} placeholder="Value" type="number" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default AssetsForm;