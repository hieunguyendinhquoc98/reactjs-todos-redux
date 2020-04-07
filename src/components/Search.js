import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class Control extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword); ///dispatch searchTask from store
    }
    onKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.onSearch();
          }
    }
    render(){
        return (           
            <div>
                {/*Search */}
                    <div className="input-group">
                        <input
                            name="keyword"
                            type="text"
                            className="form-control"
                            placeholder="Nhập Từ Khóa..."
                            value= {this.state.keyword}
                            onChange= {this.onChange} 
                            onKeyUp = { this.onKeyUp}
                        ></input>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                                <span className="fa fa-search mr-2"></span>Tìm
                            </button>
                        </span>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return{
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Control);
