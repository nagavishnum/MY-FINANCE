import React, { useEffect, useState } from "react";
import RModal from "../../../commonComponents/RModal";
import InvestmentForm from "./InvestmentForm";
import './investments.css';
import { assetsColumns, investmentColumns, JWT_SECRET, lentColumns, loanColumns, savingsColumns, userId } from "../../../constants/constants";
import DeleteComponent from "../../../commonComponents/DeleteComponent";
import { useLocation } from "react-router-dom";
import { getApiData } from "../api/Api";
import SavingsForm from "./SavingsForm";
import AssetsForm from "./AssetsForm";
import LoansForm from "./LoansForm";
import LentForm from "./LentForm";

const Investments = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("add");
  const [actionsData, setActionsData] = useState({});
  const [route, setRoute] = useState("");

  const location = useLocation();

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleActions = (e, type) => {
    console.log(e);
    setType(type);
    setActionsData(e);
    handleModal();
  };

  const getData = async (lastName) => {
    const res = await getApiData(lastName);
  
    if (lastName === "lent") {
      console.log(lastName, "lent");
      const formattedData = res.map((item) => ({
        ...item,
        lentDate: item.lentDate ? new Date(item.lentDate).toISOString().split('T')[0] : "N/A",
        dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : "N/A",
        promissoryNote: item.promissoryNote,
      }));
  
      setData(formattedData);
    } else {
      setData(res);
    }
    
    console.log(res);
  };
  
console.log(data)
  useEffect(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    const lastName = segments.length > 0 ? segments[segments.length - 1] : 'home'; // Default to 'home' if root
    setRoute(lastName);
    console.log(lastName);
    getData(lastName);
  }, [location.pathname]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/finance/${route}/${userId}/${actionsData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JWT_SECRET}` // If authentication is needed
        },
      });
      if ([200, 201].includes(res.status)) {
        handleModal();
        getData(route);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const componentMap = {
    investment: { 
      component: InvestmentForm, 
      columns: investmentColumns, 
      keyMap: ["whereInvested", "amountInvested", "returnPercent", "totalReturn"]
    },
    savings: { 
      component: SavingsForm, 
      columns: savingsColumns, 
      keyMap: ["savingsLocation", "amountSaved"]
    },
    assets: { 
      component: AssetsForm, 
      columns: assetsColumns, 
      keyMap: ["assetName", "currentValue"]
    },
    loan: { 
      component: LoansForm, 
      columns: loanColumns, 
      keyMap: ["whereLoanTaken","loanAmount", "interestPerYear"]
    },
    lent: { 
      component: LentForm, 
      columns: lentColumns, 
      keyMap: ["recipient.name", "amountLent", "interestRate","amountPaid","intrestPaid", "intrestDue", "totalAmountDue","lentDate", "dueDate","totalMonths", "collateral.assetType", "recipient.phone","promissoryNote"]
    },
  };
  

  // Get the matching component based on the last path segment
  const Component = componentMap[route]?.component || null;
  const columns = componentMap[route]?.columns || [];
  const keyMap = componentMap[route]?.keyMap || [];

console.log(data);
  return (
    <div className="investment">
      <div>
        <button onClick={() => handleActions({}, "add")}>Add</button>
      </div>
      <RModal isOpen={showModal} onClose={() => setShowModal(false)}>
        {type === "delete" ? (
          <DeleteComponent handleClick={handleDelete} />
        ) : (
          Component && <Component handleModal={handleModal} type={type} getData={getData} actionsData={actionsData} route={route} />
        )}
      </RModal>

      <div>

  <table border="1">
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col}</th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data && data.length > 0 ? (
        data.map((e, index) => (
          <tr key={index}>
            {keyMap.map((key, colIndex) => (
              <td key={colIndex}>
  {key.includes(".") 
    ? key.split(".").reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : "N/A"), e)
    : key === "promissoryNote"
      ? e[key] ? "Yes" : "No"
      : e[key] !== undefined ? e[key] : "N/A"}
</td>


            ))}
            <td>
              <button onClick={() => handleActions(e, "edit")}>Edit</button>
              <button onClick={() => handleActions(e, "delete")}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length + 1}>No Data</td>
        </tr>
      )}
    </tbody>
  </table>


      </div>
    </div>
  );
};

export default Investments;
