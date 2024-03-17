import React, { useState } from 'react';
import axios from "axios";

const AddModal = ({ closeModal, getTodos }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        const limitedValue = name === 'description' ? value.split(/\s+/).slice(0, 15).join(' ') : value;
        setFormData({ ...formData, [name]: limitedValue });
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await axios.post('http://localhost:7000/api/todo/create', formData);
            getTodos()
            closeModal();
        } catch (error) {
            closeModal();
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
                                <input value={formData.name} onChange={(e) => onInputChange(e)} name="name" type="text" className="form-control" placeholder="Task name" />
                            </div>
                            <div className="mb-3">
                                <textarea value={formData.description} className="form-control" onChange={(e) => onInputChange(e)} name="description" rows="3" placeholder="Little description"></textarea>
                            </div>
                            <div className="mb-3">
                                <select value={formData.category} onChange={(e) => onInputChange(e)} name="category" className="form-select" aria-label="Default select example">
                                    <option>Category</option>
                                    <option value="work">Work</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="learning">Learning</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
