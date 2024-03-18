import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormValidation, { validate } from "./FormValidation";
import './styleModal.css'
import { ToastContainer, toast } from 'react-toastify';

const AddModal = ({ closeModal, getTodos }) => {
    const { errors, values, onInputChange, handleSubmit, isSubmitted } =
            FormValidation(validate);
    const [loading, setIsLoading] = useState(false);
    const notify = () => toast("Weldone, you have successfully added a todo");

    const onFormSubmit = async (obj) => {
        setIsLoading(true);
        try {
            await axios.post('http://localhost:7000/api/todo/create', obj);
            notify()
            getTodos()
            closeModal();
            setIsLoading(false);
        } catch (error) {
            closeModal();
            console.error('Error:', error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length == 0 && isSubmitted) {
          onFormSubmit(values);
        }
      }, [errors]);

    return (
        <div tabIndex="-1" style={{ display: "block" }} className="modal fade show" id="addModal" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input value={values.name} onChange={(e) => onInputChange(e)} name="name" type="text" className="form-control" placeholder="Task name" />
                                {errors && errors.name ? (
                                    <div className="style-error">{errors.name}</div>
                                    ) : (
                                    <div className=""></div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <textarea value={values.description} className="form-control" onChange={(e) => onInputChange(e)} name="description" rows="3" placeholder="Little description"></textarea>
                                {errors && errors.description ? (
                                    <div className="style-error">{errors.description}</div>
                                    ) : (
                                    <div className=""></div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <select value={values.category} onChange={(e) => onInputChange(e)} name="category" className="form-select" aria-label="Default select example">
                                    <option>Category</option>
                                    <option value="work">Work</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="learning">Learning</option>
                                </select>
                                {errors && errors.category ? (
                                    <div className="style-error">{errors.category}</div>
                                    ) : (
                                    <div className=""></div>
                                    )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            {
                                loading ? <button class="loading-btn" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button> :
                                <button type="submit" className="add-btn">Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
