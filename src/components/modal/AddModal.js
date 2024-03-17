import React, { useState } from 'react';
import axios from "axios";

const AddModal = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
    });

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:7000/api/todo/create', formData);
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
            console.log('Data saved successfully');
            closeModal();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div tabIndex="-1" style={{ display: "block" }} className="modal fade show" id="addModal" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <form onSubmit={onFormSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input onChange={(e) => onInputChange(e)} name="name" type="text" className="form-control" placeholder="Task name" />
                            </div>
                            <div className="mb-3">
                                <input onChange={(e) => onInputChange(e)} name="description" type="text" className="form-control" placeholder="Little description" />
                            </div>
                            <div className="mb-3">
                                <select onChange={(e) => onInputChange(e)} name="category" className="form-select" aria-label="Default select example">
                                    <option>Category</option>
                                    <option value="work">Work</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="learning">Learning</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
