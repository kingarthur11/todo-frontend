import React, {useState, useEffect} from 'react';
import './todolist.css';
import AddModal from '../modal/AddModal';
import DeleteModal from '../modal/DeleteModal';
import EditModal from '../modal/EditModal';
import axios from "axios";

const mainTodoList = () => {
    const [addModalVisible, setAddModalVisible] = useState(false);
      const [editModalVisible, setEditModalVisible] = useState(false);
      const [deleteModalVisible, setDeleteModalVisible] = useState(false);
      const [todoId, setTodoId] = useState(0);
      const [todo, setTodo] = useState(0);
      // const [todoStatus, setTodoStatus] = useState({status: ""});
    
      
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
        const updateStatus = async (status, id) => {
          status = {status}
          console.log(status)
          try {
            await axios.put(`http://localhost:7000/api/todo/update-status/${id}`, status);
              getTodos()
          } catch (error) {
            getTodos()
            console.error('Error:', error.message);
          }
        };
        const filterByStatus = async (status) => {
          try {
            const response = await axios.get(`http://localhost:7000/api/todo/filter-todo/${status}`);
            const { data } = response
            setFormData(data.todo)
          } catch (error) {
            getTodos()
            console.error('Error:', error.message);
          }
        };
        const getTodos = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/todo/getall');
                const { data } = response
                setFormData(data.todo)
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
        <div className="d-flex align-items-center justify-content-between container header-text">
            <div>
                <h3>Today Activities</h3>
                <p>Manage your habits, events and activities</p>
            </div>
            <button onClick={() => openModal('add')} type="button" className="add-btn">
            Add Todo <i className="bi bi-plus-circle"></i>
            </button>
        </div>
        {addModalVisible && <AddModal closeModal={closeModal} getTodos={getTodos} />}
        {editModalVisible && <EditModal closeModal={closeModal} todoId={todoId} todo={todo} getTodos={getTodos}/>}
        {deleteModalVisible && <DeleteModal closeModal={closeModal} todoId={todoId} todo={todo} getTodos={getTodos} />}
        <div className='container py-3'>
            <div className='row'>
                <div className='col'>
                    <div className='row'>
                        <div onClick={() => getTodos()} className='col-sm-3 todo'>All </div>
                        <div onClick={() => filterByStatus('todo')} className='col-sm-3 todo'>Todo </div>
                        <div onClick={() => filterByStatus('progres')} className='col-sm-3 progres'>In Progress </div>
                        <div onClick={() => filterByStatus('complete')} className='col-sm-3 complete'>Completed </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='list-cards container'>
            {
                formData.length > 0 ?
                <>
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
                                            <p onClick={() => updateStatus('todo', content?._id)} className="dropdown-item py-1 m-0">Todo <i className="bi bi-clock"></i></p>
                                            <p onClick={() => updateStatus('progres', content?._id)} className="dropdown-item py-1 m-0">In-progress <i className="bi bi-clipboard-data"></i></p>
                                            <p onClick={() => updateStatus('complete', content?._id)} className="dropdown-item py-1 m-0">Completed <i className="bi bi-check2-circle"></i></p>
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
                                            <p onClick={() => updateStatus('todo', content?._id)} className="dropdown-item py-1 m-0">Todo <i className="bi bi-clock"></i></p>
                                            <p onClick={() => updateStatus('progres', content?._id)} className="dropdown-item py-1 m-0">In-progress <i className="bi bi-clipboard-data"></i></p>
                                            <p onClick={() => updateStatus('complete', content?._id)} className="dropdown-item py-1 m-0">Completed <i className="bi bi-check2-circle"></i></p>
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
                                            <p onClick={() => updateStatus('todo', content?._id)} className="dropdown-item py-1 m-0">Todo <i className="bi bi-clock"></i></p>
                                            <p onClick={() => updateStatus('progres', content?._id)} className="dropdown-item py-1 m-0">In-progress <i className="bi bi-clipboard-data"></i></p>
                                            <p onClick={() => updateStatus('complete', content?._id)} className="dropdown-item py-1 m-0">Completed <i className="bi bi-check2-circle"></i></p>
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
                </> :
                <>
                    <h3>No todos to display</h3>
                </>
            }
        </div>
    </div>
  )
}

export default mainTodoList