import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as userAction from 'reducers/user';

const LoginForm = ({handleChange, handleLogin, info}) =>{
    return(
        <form
        className="needs-validation"
        noValidate
        // onSubmit={this.handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="InputID" style={{fontWeight:'bold'}}>Username</label>

          <input
            type="id"
            name="username"
            autoComplete="off"
            className="form-control"
            id="InputID"
            aria-describedby="IDHelp"
            required
            placeholder="Enter Username..."
            value={info.username}
            onChange={handleChange}
          />
          <small id="IDHelp" className="form-text text-muted">
            Enter your ID
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword" style={{fontWeight:'bold'}}>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="InputPassword"
            required
            placeholder="Enter Password..."
            value={info.password}
            onChange={handleChange}
            
          />
        </div>
        <button type="submit" className="btn btn-primary" 
                onClick={(e) =>{
                    e.preventDefault()
                    handleLogin()
                }}>
          Login
        </button>
        <button
          type="button"
          className="btn btn-secondary float-right"
        >
          Cancel
        </button>
        
        <div style={{marginTop:"3vh"}}>
            <a href="/createyouraccount">Create your account</a>
        </div>
      </form>
    )
}

LoginForm.propTypes = {
    handleChange : PropTypes.func.isRequired,
    handleLogin : PropTypes.func.isRequired,
    info: PropTypes.object.isRequired
}
const LoginContainer = ({history}) =>{
    const dispatch = useDispatch();

    const [info, setInfo] = useState({
        username:"",
        password:""
    })
    const handleChange = (e) =>{
        const tval = e.target.value;
        const tname= e.target.name;
        setInfo({...info, [tname]:tval})
    }
    const handleLogin = () =>{
        dispatch(userAction.login({...info, history}))
    }
    return(
        <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mx-auto">
              <div className="card-body">
                <h1
                  className="card-title"
                  style={{ borderBottom: "1px solid #efefef" }}
                >
                  PAS system Login
                </h1>
                <LoginForm handleChange={handleChange} handleLogin={handleLogin} info={info}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginContainer