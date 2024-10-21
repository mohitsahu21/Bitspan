import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

const EditDthConOfflineStats = ({ onClose, getDTHDetails, DTHInfo }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    note: "",
  });
  console.log(DTHInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const updateStatusPan = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:7171/api/auth/superAdminEmployee/updateDTHConnectStatus/${DTHInfo}`,
        formData
      );
      alert("details updated successfully");
      getDTHDetails();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit DTH Connection Offline Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="w-100">
                {" "}
                <form onSubmit={updateStatusPan}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">
                          Application Status:
                        </label>
                        <select
                          className="form-control text-capitalize"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-select-</option>
                          <option value="Pending">Pending</option>
                          <option value="Success">Success</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="mb-3">
                        <label className="col-form-label">Note:</label>
                        <textarea
                          type="text"
                          placeholder="Enter Name"
                          onChange={handleChange}
                          className="form-control text-capitalize"
                          name="note"
                          required
                          value={formData.note}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </form>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer> */}
          </Modal>
        </>
      </Wrapper>
    </>
  );
};

export default EditDthConOfflineStats;
const Wrapper = styled.div``;
