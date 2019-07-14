import { createStore } from 'redux'
import axios from 'axios';

const initialState = { eleve:[] }
    const reducer = (state = initialState, action ) => {
        console.log('reducer running ', action);
        switch (action.type) {
            case 'ADD_POST':
                axios.post('http://localhost:4000/eleve', {
                    _id: 1,
                    article: action.article
                }).then(res => console.log(res.data));
                break;
            case 'UPDATE':
                return state.map((post)=>{
                    if(post.id === action.id) {
                    return {
                        ...post,
                        prenom:action.data.newPrenom,
                        editing: !post.editing
                    }
                    } else return post;
                })  
            case 'GET_LIST':
                axios.get('http://localhost:4000/eleve')
                    .then(response => {
                        //this.setState({ business: response.data });
                        console.log("coucou", response.data);
                        //this.setState(eleve.push(response.data))
                        //return response.data.map((post)=>post.id === action.id ? {...post,editing:!post.editing}:post)
                        for (let i=0; i<response.data.length;i++){
                        state.eleve.push(response.data[i].article)
                    }
                    console.log('eleve: ', state.eleve);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    return state.eleve
                
            default:
                return state;
        }
        
    } 

const store = createStore(reducer);

export default store;