import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilmListesi from "./Filmler/FilmListesi"
import Film from "./Filmler/Film"
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import { Switch,Route } from 'react-router-dom';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          console.log(response.data)
          setMovieList(response.data)
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    if(!saved.includes(id)){
       setSaved([...saved, id])
    }
   
    console.log(saved)
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} movies={movieList} />

      <Switch>
          <Route path="/" exact>
            <FilmListesi movies={movieList} />
          </Route>
          <Route path="/filmler/:id">
            <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}/>
          </Route>
        </Switch>
    </div>
  );
}
