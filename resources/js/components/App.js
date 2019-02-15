import React, {Component} from 'react';
import axios              from 'axios';
import {Link}             from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      tasks: []
    };
  }

  componentWillMount() {
    this.getTasks();
  }

  //get all the tasks from back end
  getTasks() {
    axios.get('/tasks').then(({data}) => this.setState({
      tasks: [...data.tasks]
    }));
  };

  //handle change
  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  };

  //handle submit
  handleSubmit(e) {
    const {name, tasks} = this.state;
    e.preventDefault();
    axios.post('/tasks', {name}).then(res => this.setState({
      tasks: [res.data, ...tasks],
      name : ''
    }));
  };

  //render tasks
  renderTasks() {
    return (
      <table className="table table-bordered">
        <thead>
        <tr>
          <td>No</td>
          <td>Name</td>
          <td>Last Updated</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        {this.state.tasks.map(({id, name, updated_at, user}, i) => (
          <tr key={id}>
            <td>{i + 1}</td>
            <td>
              {name}
              <div className="text-muted small">By <i>{user.name}</i></div>
            </td>
            <td>{updated_at.split(' ').slice(1)}</td>
            <td>
              <Link to={`/${id}/edit`} className="btn btn-info mr-1">Update</Link>
              <button className="btn btn-danger" onClick={() => this.handleDelete(id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  };

  //handle delete
  handleDelete(id) {
    //remove from local state
    const isNotId      = task => task.id !== id;
    const updatedTasks = this.state.tasks.filter(isNotId);
    this.setState({tasks: updatedTasks});
    //make delete request to back end
    axios.delete(`/tasks/${id}`)
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Create Task</div>
              <div className="card-body">
                <form onSubmit={e => this.handleSubmit(e)}>
                  <div className="form-group">
                    <textarea onChange={e => this.handleChange(e)} className="form-control" rows="5" maxLength="255"
                              placeholder="Create a new Task" value={this.state.name} required/>
                  </div>
                  <button type="submit" className="btn btn-primary">Create Task</button>
                </form>
                <hr/>
                {this.renderTasks()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
