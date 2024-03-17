import React from 'react'

const EditModal = () => {
  return (
    <div tabindex="-1"  className="modal fade" id="editModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Task name" />
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Little description" />
                </div>
                <div class="mb-3">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Category</option>
                        <option value="1">Work</option>
                        <option value="2">Meeting</option>
                        <option value="3">Learning</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default EditModal