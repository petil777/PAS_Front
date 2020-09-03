import React from 'react';
import {Form, Button} from 'react-bootstrap'

const LoginForm = () =>{
    return(
        <form
        className="needs-validation"
        noValidate
        // onSubmit={this.handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="InputID">Username</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="InputID"
            aria-describedby="IDHelp"
            required
            placeholder="Enter Username..."
            // value={this.state.email}
            // onChange={this.handleChange}
          />
          <small id="IDHelp" className="form-text text-muted">
            Enter your ID
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="InputPassword"
            required
            placeholder="Enter Password..."
            // value={this.state.password}
            // onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary float-right"
        //   onClick={this.clearForm}
        >
          Cancel
        </button>
        
        <div style={{marginTop:"3vh"}}>
            <a href="#">Create your account</a>
        </div>
      </form>
    )
}
const LoginContainer = () =>{
    return(
        <div className="container login">
        <div className="row">
          <div className="col">
            <div className="card mx-auto">
              <div className="card-body">
                <h1
                  className="card-title"
                  style={{ borderBottom: "1px solid #efefef" }}
                >
                  React Login Form
                </h1>
                {LoginForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
const renderLogin = () =>{
    return(
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We will never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

// const LoginForm = () =>{

//     return(
//         <div>
//             {renderLogin()}
//         </div>
//     )
// }
export default LoginContainer