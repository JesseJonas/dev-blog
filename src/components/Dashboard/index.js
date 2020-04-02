import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../../firebase';

import './dashboard.css';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: localStorage.nome,
    };
    this.logout = this.logout.bind(this);
  }

  async logout(){
    await firebase.logout()
    .catch((error) => {
      console.log(error);
    })
    localStorage.removeItem('nome');
    this.props.history.push('/');
  }

  // Só exibir se estiver logado
  // Exibir nome de quem tá logado
  async componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/login');
      return null;
    }
    else{
      firebase.getUserName(callback => {
        localStorage.nome = callback.val().nome;
        this.setState({nome: localStorage.nome});
      });
    }
  }

  render() {
    return (
      <div id="dashboard">
        <div className="user-info">
          <h1>Olá, {this.state.nome}!</h1>
          <Link to='/dashboard/new'>Novo Post</Link>
        </div>

        <div className="info-out">
          <p>Logado com: {firebase.getCurrent()}</p>
          <button onClick={() => this.logout()}>Sair</button>
        </div>
      </div>
    );
  }
}

export default index;