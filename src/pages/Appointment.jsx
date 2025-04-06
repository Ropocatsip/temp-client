import { useState, useEffect } from "react";
import {
  FaCalendar,
  FaUser,
  FaChair,
  FaStore,
  FaPhone,
  FaStickyNote,
} from "react-icons/fa";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { getAppointment, updateAppointment } from "../features/appointment/appointmentSlice";
import { Link } from "react-router-dom";

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

function Appointment() {
  const token = localStorage.getItem("token"); 
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [seat, setSeat] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    dispatch(getAppointment({id, token}))
      .unwrap()
      .then((data) => {
        setData(data.data);
        setSeat(data.data.seat);
        setNote(data.data.note);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onSeatChange = (event) => {
    setSeat(event.target.value); // update state on input change
  };

  const onNoteChange = (event) => {
    setNote(event.target.value); // update state on input change
  };

  const onUpdateSubmit = (e, data) => {
      e.preventDefault();
      dispatch(updateAppointment({data, seat, note, token}));
    };
  
  return (
    <>
      <section className="heading">
        <h1>
          Appointment
        </h1>
      </section>
      {data && (
        <div className="card">
        <p>
          <FaUser />
          <strong style={{ marginLeft: "16px" }}>
            Customer Name:
          </strong>{" "}
          {data.user?.name || "N/A"}
        </p>
        <p>
          <FaCalendar />
          <strong style={{ marginLeft: "16px" }}>Date:</strong>{" "}
          {new Date(data.apptDate).toLocaleString()}
        </p>
        <p>
          <FaChair />
          <strong style={{ marginLeft: "16px" }}>Seat:</strong>{" "}
          <input
            type="number"
            className="formcontrol"
            id="seat"
            name="seat"
            value={seat} // bind to state variable
            onChange={onSeatChange} // handle input changes
            required
          />
        </p>
        <p>
          <FaStickyNote />
          <strong style={{ marginLeft: "16px" }}>Note:</strong>{" "}
          <input
            type="text"
            className="formcontrol"
            id="note"
            name="note"
            value={note} // bind to state variable
            onChange={onNoteChange} // handle input changes
            required
          />
        </p>
        <p style={{ marginBottom: "20px" }}>
          <FaPhone />
          <strong style={{ marginLeft: "16px" }}>
            Customer Tel:
          </strong>{" "}
          {formatPhone(data.user?.tel) || "N/A"}
        </p>
        <hr />
        <p>
          <FaStore />
          <strong style={{ marginLeft: "16px" }}>
            Restaurant Name:
          </strong>{" "}
          {data.restaurant?.name || "N/A"}
        </p>
        <p style={{ marginBottom: "20px" }}>
          <FaPhone />
          <strong style={{ marginLeft: "16px" }}>
            Restaurant Tel:
          </strong>{" "}
          {formatPhone(data.restaurant?.tel) || "N/A"}
        </p>
        <button
          style={{ backgroundColor: "#b30000" }}
          className="btn btnblock"
        >
          <Link to={`/`} style={{ color: 'white', textDecoration: 'none' }}>
            Cancel
          </Link>
        </button>
        <button
          onClick={(e) => onUpdateSubmit(e, data)}
          style={{ marginLeft: "20px", backgroundColor: "#006600" }}
          className="btn btnblock"
        >
            <Link to={`/`} style={{ color: 'white', textDecoration: 'none' }}>
                Update
            </Link>
        </button>
      </div>
      )}
    </>
  );
}
export default Appointment;
