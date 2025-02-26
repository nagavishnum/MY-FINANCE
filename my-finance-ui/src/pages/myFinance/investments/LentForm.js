import { useCallback, useEffect, useState } from "react";
import { AddData, UpdateData } from "../api/Api";

const LentForm = ({ type, handleModal, getData, actionsData, route }) => {
    const [formData, setFormData] = useState({
        amountLent: 0,
        interestRate: 0,
        intrestDue: 0,
        totalAmountDue: 0,
        amountDue: 0,
        intrestCycle: "monthly",
        lentDate: "",
        dueDate: "",
        intrestPaid: 0,
        amountPaid: 0,
        recipient: {
            name: "",
            phone: "",
            address: "",
            aadhaar: "",
        },
        collateral: {
            assetType: "",
            estimatedValue: "",
            description: "",
        },
        promissoryNote: false,
    });
    console.log(actionsData, formData)
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (type === "edit" || type === "delete") {
            setFormData((prev) => ({
                ...prev,
                ...actionsData,
                lentDate: actionsData.lentDate ? actionsData.lentDate.split("T")[0] : "",
                dueDate: actionsData.dueDate ? actionsData.dueDate.split("T")[0] : "",
            }));
        }
    }, [type, actionsData]);


    // Controlled Input Handling
    const handleChange = (e) => {
        setErrorMsg("");
        const { name, value, type } = e.target;

        let newValue = value;

        // Convert to a number for numeric fields
        if (type === "number") {
            newValue = value === "" ? "" : Number(value);
        }

        if (name.startsWith("recipient.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                recipient: { ...prev.recipient, [field]: newValue },
            }));
        } else if (name.startsWith("collateral.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                collateral: { ...prev.collateral, [field]: newValue },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    const calculateInterest = useCallback(() => {
        const { amountLent, interestRate, intrestCycle, lentDate, intrestPaid, amountPaid, amountDue } = formData;
        if (!amountLent || !interestRate || !lentDate) return;

        const now = new Date();
        const lentDateObj = new Date(lentDate);
        const diffInMonths =
            (now.getFullYear() - lentDateObj.getFullYear()) * 12 + (now.getMonth() - lentDateObj.getMonth());

        let interestDueCalculated = 0;

        if (intrestCycle === "monthly" && diffInMonths >= 1) {
            // Interest formula: (Principal * Rate * Time) / 100
            interestDueCalculated = (amountDue * (interestRate / 12) * diffInMonths) / 100;
        }

        const remainingInterestDue = interestDueCalculated - (intrestPaid || 0);
        const totalAmountDue = amountLent + remainingInterestDue - formData.amountPaid;
        console.log(totalAmountDue);
        setFormData((prev) => ({
            ...prev,
            intrestDue: remainingInterestDue > 0 ? remainingInterestDue : 0,
            totalAmountDue: totalAmountDue > 0 ? totalAmountDue : amountLent, // Ensure it doesn't go negative
            totalMonths: diffInMonths,
            amountDue: amountLent - amountPaid
        }));
    },[formData]);


    useEffect(() => {
        calculateInterest();
    }, [formData.amountLent, formData.interestRate, formData.lentDate, formData.intrestPaid, calculateInterest]);

    // Form Validation
    const handleValidation = () => {
        if (!formData.amountLent || !formData.interestRate || !formData.lentDate || !formData.recipient.name || !formData.recipient.phone) {
            setErrorMsg("Please enter all required fields.");
            return false;
        }
        return true;
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!handleValidation()) return;

        try {
            const formattedData = {
                ...formData,
                lentDate: formData.lentDate ? new Date(formData.lentDate).toISOString() : "",
                dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : "",
            };
            let res;
            if (type === "edit") {
                res = await UpdateData("lent", formData.id, formattedData);

            } else {
                res = await AddData("lent", formattedData);
            }

            if ([200, 201].includes(res.status)) {
                getData(route);
                handleModal();
            } else {
                setErrorMsg("Something went wrong");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form>
            <div className="formFields">
                {errorMsg && <p>{errorMsg}</p>}

                <label>Amount Lent</label>
                <input name="amountLent" value={formData.amountLent} onChange={handleChange} placeholder="Amount Lent" type="number" />
                <label>Intrest Rate %</label>
                <input name="interestRate" value={formData.interestRate} onChange={handleChange} placeholder="Interest Rate (%)" type="number" />
                <label>Intrest Paid</label>
                <input name="intrestPaid" value={formData.intrestPaid} onChange={handleChange} placeholder="Intrest Paid" type="number" />
                {type === "edit" && <>    <label>Amount Paid</label>
                    <input name="amountPaid" value={formData.amountPaid} onChange={handleChange} placeholder="Amount Paid" type="number" />
                </>
                }
                <select name="intrestCycle" value={formData.intrestCycle} onChange={handleChange}>
                    <option value="monthly">Monthly</option>
                </select>
                {type === "add" && <>      <input
                    name="lentDate"
                    value={formData.lentDate}
                    onChange={handleChange}
                    placeholder="Lent Date"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    onKeyDown={(e) => e.preventDefault()}
                />
                </>
                }
                <input name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date" type="date" />
                <input name="recipient.name" value={formData.recipient.name} onChange={handleChange} placeholder="Recipient Name" type="text" />
                <input name="recipient.phone" value={formData.recipient.phone} onChange={handleChange} placeholder="Phone" type="text" />
                <input name="recipient.address" value={formData.recipient.address} onChange={handleChange} placeholder="Address" type="text" />
                <input name="recipient.aadhaar" value={formData.recipient.aadhaar} onChange={handleChange} placeholder="Aadhaar Number" type="number" />
                <input name="collateral.assetType" value={formData.collateral.assetType} onChange={handleChange} placeholder="Asset Type" type="text" />
                <input name="collateral.estimatedValue" value={formData.collateral.estimatedValue} onChange={handleChange} placeholder="Estimated Value" type="number" />
                <input name="collateral.description" value={formData.collateral.description} onChange={handleChange} placeholder="Description" type="text" />

                <label>
                    <input type="checkbox" name="promissoryNote" checked={formData.promissoryNote} onChange={(e) => setFormData(prev => ({ ...prev, promissoryNote: e.target.checked }))} />
                    Promissory Note Signed
                </label>

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    );
};

export default LentForm;
