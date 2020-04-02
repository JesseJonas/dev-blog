import React, { Component } from 'react';
import firebase from '../../firebase';

import { Link, withRouter } from 'react-router-dom';
//withRouter dá o histórico e replace

import './register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      password: '',
    };
    this.cadastrar = this.cadastrar.bind(this);
    this.register = this.register.bind(this);
  }

  cadastrar(e){
    e.preventDefault();

    this.register();
  }

  register = async() => {
    try{
      const {nome, email, password} = this.state;

      await firebase.register(nome, email, password);
      this.props.history.replace('/dashboard');
    }
    catch(error){
      alert(error);
    }
  }

  render() {
    return (
      <div>
        <form id="register" onSubmit={this.cadastrar}>
          <label>Nome</label><br/>
          <input 
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Informe seu nome"
            value={this.state.nome}
            onChange={(e) => this.setState({nome: e.target.value})}
          /><br/>

          <label>Email</label><br/>
          <input 
            type="email"
            autoComplete="off"
            placeholder="teste@teste.com"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
          /><br/>

          <label>Senha</label><br/>
          <input 
            type="password"
            autoComplete="off"
            placeholder="Cadastre uma senha"
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
          /><br/>

          <button type="submit">Cadastrar</button>
        </form>

      </div>
    );
  }
}

export default withRouter(Register);