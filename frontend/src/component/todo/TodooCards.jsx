import React from 'react';

function TodooCards({ title, description, id, delid, editclick, editid }) { 
  const handleEdit = () => {
    editclick() ;
    editid(id); // Call updateid with id
  };

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content rounded-4 shadow">
        <div className="modal-header border-bottom-0">
          <h1 className="modal-title fs-5">{title}</h1>
        </div>
        <div className="modal-body py-0">
          <p>{description.length > 27 ? `${description.slice(0, 27)}...` : description}</p>
        </div>
        <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
          <button type="button" className="btn btn-lg btn-primary" onClick={handleEdit}>Edit</button>
          <button type="button" className="btn btn-lg btn-secondary" onClick={() => delid(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TodooCards;
