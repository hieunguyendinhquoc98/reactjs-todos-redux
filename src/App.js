import React from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import './App.css';


class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            // id:unique, name, status
        }
    }

    onToggleForm = () => {
        this.props.onToggleForm();
    }

    render(){
        var { isDisplayForm } = this.props;//from store redux
        
        return (

            <div className="container">
                <div className = "text-center mb-5">
                    <h1>Quản Lý Công Việc</h1>
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-xm-4 col-md-4 col-lg-4' : ''}>
                        {/*Form */}
                            <TaskForm ></TaskForm>
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-xm-8 col-md-8 col-lg-8' : 'col-xs-12 col-xm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary mb-15" onClick={this.onToggleForm}>
                            <span className="fa fa-plus mr-2"></span>Thêm Công Việc
                        </button>
                        {/*Search - Sort */}
                        <Control></Control>
                        <div className="row mt-3">
                        <div className="col-xs-12 col-xm-12 col-md-12 col-lg-12">
                        {/*List Item */}
                            <TaskList ></TaskList>
                        </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

const mapStateToProps = state =>{
    return{
        isDisplayForm: state.isDisplayForm,
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return{
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
