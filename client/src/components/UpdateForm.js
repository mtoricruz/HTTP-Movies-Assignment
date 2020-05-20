import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialItem);
    const { id } = useParams;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
          .then(res => 
            // setMovie(res.data)
            console.log(res)
            )
          .catch(err => console.log(err))
    }, [id]);

    const changeHandler = e => {
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
              //res.data
              props.setMovieList(res.data);
              push(`/`)
          })
          .catch(err => console.log(err))
    }

    return (
        <div className='update-form'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='title'
                  onChange={changeHandler}
                  value={movie.name}
                />
                <div className='baseline'/>
                <input
                  type='text'
                  name='director'
                  onChange={changeHandler}
                  value={movie.director}
                />
                <div className='baseline'/>
                <input
                  type='number'
                  name='metascore'
                  onChange={changeHandler}
                  value={movie.metascore}
                />
                <div className='baseline'/>
                <input
                  type='text'
                  name='stars'
                  onChange={changeHandler}
                  value={movie.stars}
                />
                <div className='baseline'/>
                <button className='update-button'>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm