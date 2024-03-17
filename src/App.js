import React, {useState} from 'react';
import './App.css';
import AddModal from './components/modal/AddModal';
import DeleteModal from './components/modal/DeleteModal';
import EditModal from './components/modal/EditModal';


function App() {
  const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

  return (
    <div className='brg-color'>
      <div className="d-flex align-items-center justify-content-between container">
        <h3>Todo List</h3>
        <button onClick={openModal} type="button" class="add-btn">
          Add Todo <i class="bi bi-plus-circle"></i>
        </button>
      </div>
      
     {modalVisible && <AddModal closeModal={closeModal} />}
     <DeleteModal />
     <EditModal />
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
        <div class="card h-100 border-work mb-3" >
          <div class="card-body card-text">
            <div className='d-flex justify-content-between'>
              <p className='card-work'>Work <i class="bi bi-briefcase"></i></p>
              <div class="btn-group dropright">
                <i class="bi bi-three-dots"  type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div class="dropdown-menu p-3">
                  <p class="dropdown-item py-1 m-0">Todo <i class="bi bi-clock"></i></p>
                  <p class="dropdown-item py-1 m-0">In-progress <i class="bi bi-clipboard-data"></i></p>
                  <p class="dropdown-item py-1 m-0">Completed <i class="bi bi-check2-circle"></i></p>
                </div>
              </div>
            </div>
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div class="card-footer bg-transparent border-meeting d-flex justify-content-between">
            <i class="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#editModal"></i>
            <i class="bi bi-trash"  data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
          </div>
        </div>
        {/* <div class="card h-100 border-meeting mb-3" >
          <div class="card-body card-text">
            <div className='d-flex justify-content-between'>
              <p className='card-meeting'>Meeting <i class="bi bi-people"></i></p>
              <i class="bi bi-three-dots"></i>
            </div>
            <h5 class="card-title">meeting card title</h5>
            <p class="card-text">Some quick example text to build on the card title</p>
          </div>
          <div class="card-footer bg-transparent border-meeting d-flex justify-content-between">
            <i class="bi bi-pencil"></i>
            <i class="bi bi-trash"></i>
          </div>
        </div> */}
        {/* <div class="card h-100 border-work mb-3" >
          <div class="card-body card-text">
            <div className='d-flex justify-content-between'>
              <p className='card-work'>Work <i class="bi bi-briefcase"></i></p>
              <i class="bi bi-three-dots"></i>
            </div>
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div class="card-footer bg-transparent border-meeting d-flex justify-content-between">
            <i class="bi bi-pencil"></i>
            <i class="bi bi-trash"></i>
          </div>
        </div>
        <div class="card h-100 border-work mb-3" >
          <div class="card-body card-text">
            <div className='d-flex justify-content-between'>
              <p className='card-work'>Work <i class="bi bi-briefcase"></i></p>
              <i class="bi bi-three-dots"></i>
            </div>
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div class="card-footer bg-transparent border-meeting d-flex justify-content-between">
            <i class="bi bi-pencil"></i>
            <i class="bi bi-trash"></i>
          </div>
        </div>
        <div class="card h-100 border-learning mb-3" >
          <div class="card-body card-text">
            <div className='d-flex justify-content-between'>
              <p className='card-learning'>Learning <i class="bi bi-book"></i></p>
              <i class="bi bi-three-dots"></i>
            </div>
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div class="card-footer bg-transparent border-meeting d-flex justify-content-between">
            <i class="bi bi-pencil"></i>
            <i class="bi bi-trash"></i>
          </div>
        </div>
        <div class="card h-100 border-work mb-3" >
          <div class="card-body card-text">
            <div className='d-flex justify-content-between'>
              <p className='card-work'>Work <i class="bi bi-briefcase"></i></p>
              <i class="bi bi-three-dots"></i>
            </div>
            <h5 class="card-title">Success card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <div class="card-footer bg-transparent border-meeting d-flex justify-content-between">
            <i class="bi bi-pencil"></i>
            <i class="bi bi-trash"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
