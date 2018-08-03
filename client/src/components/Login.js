import React from 'react'
import Input from './Input'




class Login extends React.Component {

    constructor(props) {
        super(props)
        if(props.error) {
            this.state = {
                failure: 'wrong username or password!',
                errcount: 0
            }
        } else {
            this.state = { errcount: 0 }
        }
    }

    handleError = (field, errmsg) => {
        if(!field) return

        if(errmsg) {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount + 1,
                errmsgs: {...prevState.errmsgs, [field]: errmsg}
            }))
        } else {
            this.setState((prevState) => ({
                failure: '',
                errcount: prevState.errcount===1? 0 : prevState.errcount-1,
                errmsgs: {...prevState.errmsgs, [field]: ''}
            }))
        }
    }

    renderError = () => {
        if(this.state.errcount || this.state.failure) {
            const errmsg = this.state.failure
                || Object.values(this.state.errmsgs).find(v=>v)
            return <div className="error">{errmsg}</div>
        }
    }



    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.state.errcount) {
            const data = new FormData(this.form)
            fetch(this.form.action, {
                method: this.form.method,
                body: new URLSearchParams(data)
            })
                .then(v => {
                    if(v.redirected) window.location = v.url
                })
                .catch(e => console.warn(e))
        }
    }


    render() {

        const formData = {
            name: 'loginForm',
            method: 'POST',
            action: 'http://localhost:8080/login',
            inputs: inputs
        };

        const inputs = [{
            name: "username",
            placeholder: "username",
            type: "text"
        },{
            name: "password",
            placeholder: "password",
            type: "password"
        },{
            type: "submit",
            value: "Submit",
            className: "btn"
        }].map(
            ({name, placeholder, type, value, className}, index) => (
                <Input key={index} name={name} placeholder={placeholder} type={type} value={value}
                       className={type==='submit'? className : ''} handleError={this.handleError} />
            )
        );
        const errors = this.renderError()
        return (
            <form {...this.formData} onSubmit={this.handleSubmit} ref={fm => {this.form=fm}}  style={{float: "left"}}>
                {inputs}
                {errors}
            </form>
        );

    }
}

export default Login;