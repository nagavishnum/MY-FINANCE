import React, { useEffect, useState } from "react";
import RModal from "../../../commonComponents/RModal";
import './investments.css';
import { componentMap, JWT_SECRET, userId } from "../../../constants/constants";
import DeleteComponent from "../../../commonComponents/DeleteComponent";
import { useLocation } from "react-router-dom";
import { getApiData } from "../api/Api";
import RTable from "../../../commonComponents/RTable";
import Loader from "../../../commonComponents/Loader";

const Investments = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("add");
  const [actionsData, setActionsData] = useState({});
  const [route, setRoute] = useState("");
  const [loading , setLoading] = useState(true);

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
    setLoading(false);
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


  // Get the matching component based on the last path segment
  const Component = componentMap[route]?.component || null;


  console.log(data);
  return (

    loading ? <Loader/> :
    <div className="investment">
      <div>
        <button onClick={() => handleActions({}, "add")} style={{backgroundColor:"green"}}>Add</button>
      </div>
      <RModal isOpen={showModal} onClose={() => setShowModal(false)}>
        {type === "delete" ? (
          <DeleteComponent handleClick={handleDelete} />
        ) : (
          Component && <Component handleModal={handleModal} type={type} getData={getData} actionsData={actionsData} route={route} />
        )}
      </RModal>

      <RTable data={data} handleActions={handleActions} route={route}/>
    </div>
  );
};

export default Investments;
