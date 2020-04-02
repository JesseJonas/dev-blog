import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../../firebase';

import './new.css';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      imagem: '',
      descricao: '',
      alert: '',
    };

    this.cadastrar = this.cadastrar.bind(this);
  }

  // Verificar se tem alguém logado
  componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/');
      return null;
    }
  }

  async cadastrar(e){
    e.preventDefault();

    // Todos os campos devem estar preenchidos
    if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== ''){
      let posts = firebase.app.ref('posts');
      let key = posts.push().key;

      await posts.child(key).set({
        titulo: this.state.titulo,
        image: this.state.imagem,
        descricao: this.state.descricao,
        autor: localStorage.nome
      });
      this.props.history.push('/dashboard');
    } else {
      this.setState({alert: 'Preencha todos os campos'});
    }
  }

  render() {
    return (
      <div>
        <header id="new">
          <Link to="/dashboard">Voltar</Link>
        </header>

        <form onSubmit={this.cadastrar} id="new-post">
          <span>{this.state.alert}</span>
          <label>Título</label><br/>
          <input 
            type="text"
            autoFocus
            placeholder="Título do Post"
            value={this.state.titulo}
            onChange={(e) => this.setState({titulo: e.target.value})}
          /><br/>

          <label>URL da imagem <small>(URL importado de outros sites)</small></label><br/>
          <input 
            type="text"
            placeholder="https://site.com/imagem.png"
            value={this.state.imagem}
            onChange={(e) => this.setState({imagem: e.target.value})}
          /><br/>

        <label>Descrição</label><br/>
          <textarea 
            type="text"
            placeholder="Descreva seu Post"
            value={this.state.descricao}
            onChange={(e) => this.setState({descricao: e.target.value})}
          /><br/>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default New;