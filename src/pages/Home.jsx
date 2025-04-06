import {
  FaCalendar,
  FaUser,
  FaChair,
  FaStore,
  FaPhone,
  FaStickyNote,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAppointment, getAppointments } from "../features/appointment/appointmentSlice";

function formatPhone(tel) {
  if (!tel) return null;

  const digits = tel.replace(/\D/g, ""); // remove non-digit characters

  if (digits.length === 10) {
    // Format: xxx-xxx xxxx
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 9) {
    // Format: xx-xxx xxxx
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }

  // Return original if not matching expected format
  return tel;
}

function Home() {
  const token = localStorage.getItem("token"); 
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const onDeleteSubmit = (e, id) => {
    e.preventDefault();
    dispatch(deleteAppointment({id, token})).unwrap();
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getAppointments(token))
      .unwrap()
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <section className="heading">
        <h1>Appointments </h1>
      </section>
      {data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <section className="boxes" key={item._id || index}>
              <div className="card">
                <p>
                  <FaUser />
                  <strong style={{ marginLeft: "16px" }}>
                    Customer Name:
                  </strong>{" "}
                  {item.user?.name || "N/A"}
                </p>
                <p>
                  <FaCalendar />
                  <strong style={{ marginLeft: "16px" }}>Date:</strong>{" "}
                  {new Date(item.apptDate).toLocaleString()}
                </p>
                <p>
                  <FaChair />
                  <strong style={{ marginLeft: "16px" }}>Seat:</strong>{" "}
                  {item.seat || "N/A"}
                </p>
                <p>
                  <FaStickyNote />
                  <strong style={{ marginLeft: "16px" }}>Note:</strong>{" "}
                  {item.note || "-"}
                </p>
                <p style={{ marginBottom: "20px" }}>
                  <FaPhone />
                  <strong style={{ marginLeft: "16px" }}>
                    Customer Tel:
                  </strong>{" "}
                  {formatPhone(item.user?.tel) || "N/A"}
                </p>
                <hr />
                <p>
                  <FaStore />
                  <strong style={{ marginLeft: "16px" }}>
                    Restaurant Name:
                  </strong>{" "}
                  {item.restaurant?.name || "N/A"}
                </p>
                <p style={{ marginBottom: "20px" }}>
                  <FaPhone />
                  <strong style={{ marginLeft: "16px" }}>
                    Restaurant Tel:
                  </strong>{" "}
                  {formatPhone(item.restaurant?.tel) || "N/A"}
                </p>
                <button
                  style={{ backgroundColor: "#004080" }}
                  className="btn btnblock"
                >
                    <Link to={`/appointment/${item._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                        Edit
                    </Link>
                </button>
                <button
                  onClick={(e) => onDeleteSubmit(e, item._id)}
                  style={{ marginLeft: "20px", backgroundColor: "#b30000" }}
                  className="btn btnblock"
                >
                  Delete
                </button>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Home;
