import React, { Component } from 'react';
import firebase from '../../firebase';

import { Link, withRouter } from 'react-router-dom';
//withRouter dá o histórico e replace

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);
  }

  // Carregar os dados / nome/ verificar se tem alguem logado
  // Se houver alguem logado, enviar direto para o dashboard
  componentDidMount(){
    if(firebase.getCurrent()){
      return this.props.history.replace('dashboard');
    }
  }

  entrar(e){
    e.preventDefault();
    this.login();
  }

  login = async () => {
    const {email, password} = this.state;

    // Verifica o estado da conexão e login do firebase
    try{
      // Verifica se conectou e devolve os possíveis erros
      await firebase.login(email, password)
      .catch((error) => {
        alert('Erro: ' + error);
        return null;
      })

      // Enviar para o dashboard
      this.props.history.replace('/dashboard');

    } 
    catch(error){
      alert(error.message);
    }
  }

  render() {
    return (
      <div>

        <form onSubmit={this.entrar} id="login">
          <label>Email</label><br/>
          <input 
            type="email" 
            autoComplete="off"
            autoFocus
            placeholder="mail@mail.com"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})} 
          /><br/>

          <label>Senha</label><br/>
          <input 
            type="password" 
            autoComplete="off"
            placeholder="Insira sua senha"
            value={this.state.senha}
            onChange={(e) => this.setState({password: e.target.value})} 
          /><br/>

          <button type="submit">Entrar</button>
          <Link to="/register">Não tem conta? Cadastre-se!</Link>
        </form>

      </div>
    );
  }
}

export default withRouter(Login);