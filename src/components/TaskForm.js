import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends React.Component {
    onCloseForm = () => {
        this.onClear();
        this.props.onCloseForm();

    }
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    onChange =  (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value === 'true' ? true: false;
        }
        this.setState({
            [name] : value
        })
    }
    onClear = () => {
        console.log(this.props.loadUpdateTask);
        this.setState( {
            name: '',
            status: false
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }
    componentWillMount(){
        if(this.props.loadUpdateTask && this.props.loadUpdateTask.id !== null){
            this.setState({
                id: this.props.loadUpdateTask.id,
                name: this.props.loadUpdateTask.name,
                status: this.props.loadUpdateTask.status
            })
        }else{
            this.onClear();
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.loadUpdateTask){
            this.setState({
                id: nextProps.loadUpdateTask.id,
                name: nextProps.loadUpdateTask.name,
                status: nextProps.loadUpdateTask.status
            })
        }else{
            this.onClear();
        }
    } 
    render(){
        if(!this.props.isDisplayForm) return null;
        return (           
            <div className="card">
                <div className="card-header">
                    <h3 className="panel-title">
                        {this.state.id === '' ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
                        <button className="fa fa-times-circle text-center ml-5" onClick={ this.onCloseForm }>
                        </button>
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value = {this.state.name}
                                onChange = {this.onChange}
                            ></input>
                        </div>
                            <label>Trạng Thái :</label>
                            <select
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select><br></br>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-2"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick ={this.onClear}>
                                <span className="fa fa-close mr-2" ></span>Hủy Bỏ
                            </button>
                        </div>               
                    </form>
                </div>
            </div>           
        );
    }
}

const mapStateToProps = state =>{
    return{
        isDisplayForm: state.isDisplayForm,
        loadUpdateTask: state.loadUpdateTask,
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {       
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
