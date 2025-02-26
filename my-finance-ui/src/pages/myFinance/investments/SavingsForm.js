import { useEffect, useState } from "react";
import { JWT_SECRET, userId } from "../../../constants/constants";

const SavingsForm = ({type,handleModal, getData, actionsData, route}) => {
    const [formData, setFormData] = useState({
        savingsLocation: "",
        amountSaved:"",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const { savingsLocation, amountSaved} = formData;

    useEffect(()=> {
        if(type ==="edit" || type === "delete"){
            setFormData((prev)=> ({
                ...prev,
                ...actionsData
            }));
        }
    },[type,actionsData]);

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
        if(savingsLocation === "" || amountSaved === ""){
            setErrorMsg("Pls enter All Fields")
            return false
        } else {
            return true
        }
    }
 const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = handleValidation();
    if(validation) {
        setErrorMsg("");
        try {
            let res;
            if(type ==="edit"){
                 res = await fetch(`http://localhost:5000/api/finance/savings/${userId}/${formData.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JWT_SECRET}` // If authentication is needed
                    },
                    body:JSON.stringify(formData)
                });
            } else {
                 res = await fetch(`http://localhost:5000/api/finance/savings/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JWT_SECRET}` // If authentication is needed
                    },
                    body:JSON.stringify(formData)
                });
            }

         if([200,201].includes(res.status)){
            getData(route);
            handleModal();
         }
          else {
            setErrorMsg(res.message ?? "Something went wrong")
          }
        } catch(e) {
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
            <input name="savingsLocation" value={savingsLocation} onChange={handleChange} placeholder="Saved At" type="text" autoFocus/>
            <input name="amountSaved" value={amountSaved} onChange={handleChange} placeholder="Amount Saved" type="number"/>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default SavingsForm;