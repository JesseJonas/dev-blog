import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../../firebase';

import './new.css';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      imagem: null,
      url: '',
      descricao: '',
      alert: '',
      progress: '',
    };

    this.cadastrar = this.cadastrar.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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
    if(this.state.titulo !== '' && 
       this.state.imagem !== '' && 
       this.state.descricao !== '' &&
       this.state.imagem !== null && 
       this.state.url !== null){
         let posts = firebase.app.ref('posts');
         let key = posts.push().key;

         await posts.child(key).set({
          titulo: this.state.titulo,
          image: this.state.url,
          descricao: this.state.descricao,
          autor: localStorage.nome
         });
         this.props.history.push('/dashboard');
    } else {
      this.setState({alert: 'Preencha todos os campos'});
    }
  }

  async handleFile(e){
    if(e.target.files[0]){
      const image = e.target.files[0];

      if(image.type === 'image/png' || image.type === 'image/jpeg'){
        await this.setState({imagem: image});
        
        this.handleUpload();
      } 
      else {
        alert('Envie no formato imagem (.jpg ou .png)');
        this.setState({imagem: null});
        return null;
      }
    }
  }

  handleUpload = async () => {
    const { imagem } = this.state;
    const currentUid = firebase.getCurrentUid();

    const uploadTask = firebase.storage
    .ref(`images/${currentUid}/${imagem.name}`)
    .put(imagem);

    await uploadTask.on('state_changed', 
    (snapshot) => {
      // Progress - exibbir preview,
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      this.setState({progress});
    },
    (error) => {
      // Erro
      console.log('Error image: ' + error);
    },
    () => {
      // Sucesso - pegar url e mandar para state
      firebase.storage.ref(`images/${currentUid}`)
      .child(imagem.name).getDownloadURL()
      .then(url => {
        this.setState({url})
      })
    })
  }

  render() {
    return (
      <div>
        <header id="new">
          <Link to="/dashboard">Voltar</Link>
        </header>

        <form onSubmit={this.cadastrar} id="new-post">
          <span>{this.state.alert}</span>

          <input 
            type="file"
            onChange={this.handleFile}
          /><br/>

          {this.state.url !== '' ?
            <img src={this.state.url} alt="Imagem do Post" width="150" height="150"/>
            :
            <progress value={this.state.progress} max="100"/>
          }

          <label>Título</label><br/>
          <input 
            type="text"
            autoFocus
            placeholder="Título do Post"
            value={this.state.titulo}
            onChange={(e) => this.setState({titulo: e.target.value})}
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