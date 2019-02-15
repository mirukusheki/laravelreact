import React, {Component} from 'react';
import axios              from 'axios';
import {Link}             from 'react-router-dom';

class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      task: []
    };
  }

  //get all the tasks from back end
  getTasks() {
    const {id} = this.props.match.params;
    axios.get(`/tasks/${id}/edit`).then(({data}) => this.setState({
      task: data.task,
      name: data.task.name
    }))
  };

  //lifecycle method
  componentWillMount() {
    this.setState({
      name: '',
      task: []
    });
    this.getTasks();
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
    const {id}          = this.props.match.params;
    e.preventDefault();
    axios.put(`/tasks/${id}`, {name}).then(res => this.props.history.push('/'));
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Link to='/' className="btn btn-sm btn-info mb-2">Back to Home</Link>
            <div className="card">
              <div className="card-header">Update Task</div>
              <div className="card-body">
                <form onSubmit={e => this.handleSubmit(e)}>
                  {this.state.name !== '' ?
                    <div className="form-group">
                      <textarea onChange={e => this.handleChange(e)} className="form-control" rows="5" maxLength="255"
                                placeholder="Update Task" value={this.state.name} required/>
                      <button type="submit" className="btn btn-primary mt-3">Edit Task</button>
                    </div>
                    : <div><h3>Getting the data...</h3></div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskEdit;
