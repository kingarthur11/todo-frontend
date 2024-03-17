import React, {useState, useEffect} from 'react';
import './App.css';
import AddModal from './components/modal/AddModal';
import DeleteModal from './components/modal/DeleteModal';
import EditModal from './components/modal/EditModal';
import axios from "axios";

function App() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [todoId, setTodoId] = useState(0);
  const [todo, setTodo] = useState(0);

  
  const [formData, setFormData] = useState([])
    const openModal = (value, id) => {
      if (value === 'add') {
        setAddModalVisible(true);
      }
      if (value === 'edit') {
        id > 1 ? setTodoId(id) : 0
        setEditModalVisible(true);
      } 
      if (value === 'delete') {
        id > 1 ? setTodoId(id) : 0
        setDeleteModalVisible(true);
      } 
    };
    const closeModal = () => {
      setAddModalVisible(false);
      setEditModalVisible(false);
      setDeleteModalVisible(false);
    };
    const getTodos = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/todo/getall');
            const { data } = response
            setFormData(data.todo)
            // closeModal();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    const getTodo = async () => {
      try {
          const response = await axios.get(`http://localhost:7000/api/todo/getone/${todoId}`);
          const { data } = response
          setTodo(data.todo)
          console.log(data)
      } catch (error) {
          console.error('Error:', error.message);
      }
  };
  useEffect(() => {
    getTodos()
  }, []);
  useEffect(() => {
    todoId > 1 ? getTodo(todoId) : 0
  }, [todoId]);

  return (
    <div className='brg-color'>
      <div className="d-flex align-items-center justify-content-between container">
        <h3>Todo List</h3>
        <button onClick={() => openModal('add')} type="button" className="add-btn">
          Add Todo <i className="bi bi-plus-circle"></i>
        </button>
      </div>
      
     {addModalVisible && <AddModal closeModal={closeModal} getTodos={getTodos} />}
     {editModalVisible && <EditModal closeModal={closeModal} todoId={todoId} todo={todo} getTodos={getTodos}/>}
     {deleteModalVisible && <DeleteModal closeModal={closeModal} todoId={todoId} todo={todo} getTodos={getTodos} />}
      <div className='container py-3'>
        <div className='row'>
          <div className='col-8'>
            <div className='row'>
              <div className='col-sm-4 todo'>Todo </div>
              <div className='col-sm-4 progres'>In Progress </div>
              <div className='col-sm-4 complete'>Completed </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='list-cards container'>
      {formData && formData.map(
        (content, index) => (
          <div key={index}>
            {
              content?.category === 'work' ?
              <>
                <div className="card h-100 border-work mb-3">
                  <div className="card-body card-text">
                    <div className='d-flex justify-content-between'>
                      <p className='card-work'>Work <i className="bi bi-briefcase"></i></p>
                      <div className="btn-group dropright">
                        <i className="bi bi-three-dots"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                        <div className="dropdown-menu p-3">
                          <p className="dropdown-item py-1 m-0">Todo <i className="bi bi-clock"></i></p>
                          <p className="dropdown-item py-1 m-0">In-progress <i className="bi bi-clipboard-data"></i></p>
                          <p className="dropdown-item py-1 m-0">Completed <i className="bi bi-check2-circle"></i></p>
                        </div>
                      </div>
                    </div>
                    <h5 className="card-title">{content?.name}</h5>
                    <p className="card-text">{content?.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-meeting d-flex justify-content-between">
                    <i className="bi bi-pencil" onClick={() => openModal('edit', content?._id)}></i>
                    <i className="bi bi-trash" onClick={() => openModal('delete', content?._id)}></i>
                  </div>
                </div>
              </>
             : content?.category === 'learning' ? 
             <>
              <div className="card h-100 border-learning mb-3">
                <div className="card-body card-text">
                  <div className='d-flex justify-content-between'>
                    <p className='card-learning'>Learning <i className="bi bi-people"></i></p>
                    <div className="btn-group dropright">
                      <i className="bi bi-three-dots"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                      <div className="dropdown-menu p-3">
                        <p className="dropdown-item py-1 m-0">Todo <i className="bi bi-clock"></i></p>
                        <p className="dropdown-item py-1 m-0">In-progress <i className="bi bi-clipboard-data"></i></p>
                        <p className="dropdown-item py-1 m-0">Completed <i className="bi bi-check2-circle"></i></p>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">{content?.name}</h5>
                  <p className="card-text">{content?.description}</p>
                </div>
                <div className="card-footer bg-transparent border-meeting d-flex justify-content-between">
                  <i className="bi bi-pencil" onClick={() => openModal('edit', content?._id)}></i>
                  <i className="bi bi-trash" onClick={() => openModal('delete', content?._id)}></i>
                </div>
              </div>
             </>
             : 
             <>
              <div className="card h-100 border-meeting mb-3">
                <div className="card-body card-text">
                  <div className='d-flex justify-content-between'>
                    <p className='card-meeting'>Meeting <i className="bi bi-people"></i></p>
                    <div className="btn-group dropright">
                      <i className="bi bi-three-dots"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                      <div className="dropdown-menu p-3">
                        <p className="dropdown-item py-1 m-0">Todo <i className="bi bi-clock"></i></p>
                        <p className="dropdown-item py-1 m-0">In-progress <i className="bi bi-clipboard-data"></i></p>
                        <p className="dropdown-item py-1 m-0">Completed <i className="bi bi-check2-circle"></i></p>
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title">{content?.name}</h5>
                  <p className="card-text">{content?.description}</p>
                </div>
                <div className="card-footer bg-transparent border-meeting d-flex justify-content-between">
                  <i className="bi bi-pencil" onClick={() => openModal('edit', content?._id)}></i>
                  <i className="bi bi-trash" onClick={() => openModal('delete', content?._id)}></i>
                </div>
              </div>
             </>
            }
          </div>
        )
      )}
      </div>
    </div>
  );
}

export default App;
