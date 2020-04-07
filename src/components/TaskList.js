import React from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import {filter} from 'lodash';

class TaskList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1//all
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus'? value : this.state.filterStatus,
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]:value
        });
        console.log(filter);
    }
    render(){
        var todos = this.props.todos;  
        var { filterTable } = this.props;

        if(filterTable.name){
                todos = filter(todos, (task) => {
                    return task.name.toLowerCase().indexOf(filterTable.name) !==-1;
                })
        }
        todos = filter(todos,(task) => {
            if(filterTable.status === -1){
                return task.name.toLowerCase().indexOf(filterTable.name) !==-1;
            } else {
                return task.status === (filterTable.status === 1 ? true : false);
            }
        });

        var { keyword } = this.props;
        if(keyword){
            todos = todos.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }

        var { sort } = this.props;

        if(sort.by === 'name'){
            todos.sort((a,b) => {
                if(a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0;
            })
        }
        if(sort.by === 'status'){
            todos.sort((a,b) => {
                if(a.status < b.status) return sort.value;
                else if (a.status > b.status) return -sort.value;
                else return 0;
            })
        }
        if(todos){
            var elmTasks = todos.map((task,index) =>
            <TaskItem key={task.id}
            index = {index} 
            task={task}
            ></TaskItem>
        );
        }
        return (        
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={this.state.filterName}
                                onChange= {this.onChange}
                            ></input>
                        </td>
                        <td>
                            <select
                                type="text"
                                className="form-control"
                                name="filterStatus"
                                value={this.state.filterStatus}
                                onChange = {this.onChange}
                             >
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { elmTasks }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        todos: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return{
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
