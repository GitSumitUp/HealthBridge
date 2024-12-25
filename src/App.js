import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    age: "",
    phone: "",
    date: "",
    time: "",
    doctorName: "",
    appointmentType: ""
  });
  
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedAppointments = appointments.map((appointment, index) =>
        index === currentAppointmentIndex ? formData : appointment
      );
      setAppointments(updatedAppointments);
      setIsEditing(false);
    } else {
      setAppointments([...appointments, formData]);
    }

    setFormData({
      patientName: "",
      gender: "",
      age: "",
      phone: "",
      date: "",
      time: "",
      doctorName: "",
      appointmentType: ""
    });
  };

  const handleEdit = (index) => {
    const appointmentToEdit = appointments[index];
    setFormData(appointmentToEdit);
    setIsEditing(true);
    setCurrentAppointmentIndex(index);
  };

  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="container">
      <section className="form-content">
        <div className="register-form">
          <div className="form">
            <div className="note">
              <p>Welcome to Gradious Doctor Appointment Booking</p>
            </div>
            <div className="form-content">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Patient Name *"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Male/Female *</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Age *"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number *"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Doctor Name *"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Consult/Revisit *</option>
                      <option value="Consult">Consult</option>
                      <option value="Revisit">Revisit</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" className="btnSubmit" onClick={handleSubmit}>
                {isEditing ? "Update Appointment" : "Book Appointment"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="main-content">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Status</th>
                <th>Appointment</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>
                    <div className="user-info">
                        <div class="user-info__img">
									          <img src="img/prof.png" alt="User Img"/>
								        </div>
                    <div className="user-info__basic">
                        <h5 className="mb-0">{appointment.patientName}</h5>
                        <p className="text-muted mb-0">
                          {appointment.age} yrs, {appointment.gender}
                        </p>
                    </div>
                    </div>
                  </td>
                  <td>
                    <span className="btn btn-success">{appointment.appointmentType}</span>
                  </td>
                  <td>
                    <h6 className="mb-0">{appointment.time}</h6>
                    <small>{appointment.date}</small>
                  </td>
                  <td>
                    <h6 className="mb-0">{appointment.phone}</h6>
                  </td>
                  <td>
                    <h6 className="mb-0">{appointment.doctorName}</h6>
                  </td>
                  <td>
                    <div className="dropdown open">
                      <button
                        onClick={() => handleEdit(index)}
                        className="btn btn-warning mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
