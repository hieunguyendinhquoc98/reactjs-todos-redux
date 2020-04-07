import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TaskItem extends React.Component {

    onLoadUpdateTask = () => {

        // this.props.onUpdateTask(this.props.task.id);
        this.props.onOpenForm();
        this.props.onLoadUpdateTask(this.props.task);
    }
    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }
    render(){
        var task= this.props.task;
        var index= this.props.index;
        return (           
                <tr>
                    <td className="text-center">{ index +1 }</td>
                    <td>{ task.name }</td>
                    <td className="text-center">
                        <span className={ task.status === true ? 'bg-success': 'bg-danger'}
                        >{task.status === true ? 'Kích Hoạt': 'Ẩn'}
                        </span>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning"
                        onClick = { this.onLoadUpdateTask }
                        ><span className="fa fa-pencil mr-2"></span>Sửa
                        </button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick = {this.onDelete}>
                            <span className="fa fa-trash mr-2"></span>Xóa
                        </button>
                    </td>
                </tr>
        );
    }
}
const mapStateToProps = state =>{
    return{
        loadUpdateTask: state.loadUpdateTask
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return{
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },        
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onLoadUpdateTask: (task) => {
            dispatch(actions.loadUpdateTask(task));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
