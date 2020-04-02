import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyB8WnhFyZsVGEMNqWyFV4TAde24hLsFzLQ",
  authDomain: "blog-dev-2021.firebaseapp.com",
  databaseURL: "https://blog-dev-2021.firebaseio.com",
  projectId: "blog-dev-2021",
  storageBucket: "blog-dev-2021.appspot.com",
  messagingSenderId: "408851434918",
  appId: "1:408851434918:web:baea4d9cb13c4189735367"
};

class Firebase{
  constructor(){
    // Initialize Firebase
    app.initializeApp(firebaseConfig);

    // Permitir que a database seja visualizada
    this.app = app.database();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }
  // Fim função login ---

  logout(){
    return app.auth().signOut();
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    // Quando um cadastro é realizado, automaticamente é feito o login
    // Pegar o uid do currentUser
    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    });
  }
  // Fim função register ---

  // Função que verifica se há conexão com o Firebase
  isInitialized(){
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  // Verificar se tem algum usuário logado
  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }
    else{
      const uid = app.auth().currentUser.uid;
      await app.database().ref('usuarios').child(uid).once('value')
      .then(callback);
    }
  }
}

export default new Firebase();