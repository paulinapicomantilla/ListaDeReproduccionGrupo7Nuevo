   
   if (!localStorage.getItem('isLogged')) {
  window.location.href = './login.html';
}
   
   
   /* Definir clases */
   class Song{
    constructor({id, nombre, author, duration, album, genero, año, isFav = false, isPlayList = false, portada, urlSong}){
        this.id = id;
        this.nombre = nombre;
        this.author = author;
        this.duration = duration;
        this.album = album;
        this.genero = genero;
        this.año = año;
        this.isFav = isFav;
        this.isPlayList = isPlayList;

        this.portada = portada;
        this.urlSong = urlSong;
    }

   
}

class Playlist{
    constructor({name, container, songs = []}){ //name = nombre de las listas
        this.name = name;
        this.container = container;
        this.songs = songs;
    }

    addSong(...song){
        this.songs.push(...song) // Agrega canciones
        this.renderList() // Refresca la lista
    }
    removeSong(song){
        const index = this.songs.indexOf(song);
        if (index === -1) return 
        this.songs.splice(index, 1) // Elimina la cancion
        this.renderList(idContainer); // Refresca la lista
    }

    
    renderList(lista = this.songs, container = this.container){
        let contenedor = document.getElementById(container);
        contenedor.innerHTML = "";
        lista.forEach(
            song => {
                contenedor.innerHTML += `<li onClick='changeCurrentSong(${song.id}, ${JSON.stringify(lista)})' ><h3 class="cancion" data-idSong=${song.id}>${song.nombre}</h3>
                <div><i class="fa-solid fa-play"></i></div>
                <div class="playlist-general"><i class="fa-solid fa-plus"></i></div>
                <div class="favorito-general"><i class="fa-solid fa-heart"></i></div>
                </li>` 
                // Aquí hará falta validar si song.isFav = true (y así), varíen los botones de favorito, playlist...
                
            });
    };
    
    // Método Buscar (por canción, artista, álbum, género)
    search(render, listaCanciones = this.songs){
       const inputAll = document.getElementById("inputBuscador")
        listaCanciones = this.songs;
        debugger
        buscar();

        function buscar (){
        
            inputAll.addEventListener('input', function() {
                let input = this.value;
                let expresion = new RegExp(input, "i");
                let titulo= document.getElementById("tituloContenedor");

                const inputResultado = comparar(listaCanciones, expresion);
                if(!this.value){
                    titulo.textContent = "Catálogo de canciones :";
                }else{
                    titulo.textContent = "Resultados de la búsqueda:";
                }
                
                render(inputResultado, "catalogoDeCanciones")
                console.log(inputResultado)
                return(render(inputResultado, "catalogoDeCanciones"))
            });
        }
        
        function comparar(lista, expresion){
            let resultadoCancion = lista.filter(
                song => expresion.test(song.nombre) || expresion.test(song.author) || expresion.test(song.album) || expresion.test(song.genero)
            );
            return(resultadoCancion)
        
        }
    }
}

class Reproductor{
    constructor({currentPlayList = []}){
        this.currentPlayList = currentPlayList;
        this.currentSongIndex = 0;
    }
    // Agrega canciones a la playlist
    addPlayList(...songs){
        this.currentPlayList.push(...songs)
    }
    
    removePlayList(){
        this.currentPlayList = [];
        this.currentSongIndex = 0;
    }
    
    setCurrentSong(index){
        this.currentSongIndex = index
    }
    renderReproductor(){
        const song = this.currentPlayList[this.currentSongIndex]
        
        generateReproductor(song)
        this.reproductor()
    }
    
    playFromList(){
        const audio = document.getElementById("audio");

        if(this.currentSongIndex !== undefined){
            audio.pause()
            audio.src = this.currentPlayList[this.currentSongIndex].urlSong
            audio.oncanplaythrough = function() {
                audio.play();
                audio.oncanplaythrough = null; 
            }
           console.log("Tenemos:",musicPlayer)

        }else{
            audio.pause()
        }

     
        this.reproductor()
    }

    reproductor() {
        const playButton = document.getElementById("play");
        const stopButton = document.getElementById("stop");
        const prevSongButton = document.getElementById("prevSong");
        const nextSongButton = document.getElementById("nextSong");
        const muteButton = document.getElementById("mute");
        // Crear instancia de Audio
        const audio = document.getElementById("audio");
        const songs = this.currentPlayList
                   
        // Se asigna el url de la canción actual al objeto Audio
        audio.src = songs[this.currentSongIndex].urlSong;
        let currentSongIndex = this.currentSongIndex
        //Event listener de play/pause
        playButton.addEventListener('click', function() { //Cambiar icono de play/pause
            if (audio.paused) {
                audio.play();
                playI.classList.remove('fa-circle-play');
                playI.classList.add('fa-pause-circle');
            } else {
                audio.pause();
                
                playI.classList.remove('fa-pause-circle');
                playI.classList.add('fa-circle-play');
            }
        });
        

        
        stopButton.addEventListener('click', function () {
            audio.pause();
            audio.currentTime = 0;
            });
        
        prevSongButton.addEventListener('click', function () {
            if (currentSongIndex > 0) {
                currentSongIndex--;
            } else {
                currentSongIndex = songs.length - 1;
            }
            audio.pause();
            audio.src = songs[currentSongIndex].urlSong;

            audio.oncanplaythrough = function() {
                audio.play();
                audio.oncanplaythrough = null; 
            }
            
            generateReproductor(songs[currentSongIndex])
            });
        
       
        nextSongButton.addEventListener('click', function () {
            if (currentSongIndex < songs.length - 1) {
                currentSongIndex++;
            } else {
                currentSongIndex = 0;
             }
            audio.pause();
            audio.src = songs[currentSongIndex].urlSong;
            audio.oncanplaythrough = function() {
                audio.play();
                audio.oncanplaythrough = null; 
            }
           
            generateReproductor(songs[currentSongIndex])
            });

         // Al hacer click en Mute...
         muteButton.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                console.log("Muted false", songs[currentSongIndex].nombre)
                
            } else {
                audio.muted = true;
                console.log("Muted true", songs[currentSongIndex].nombre)
            }
            });
        }
    }


// Pasa información de la cancion
function generateReproductor(song){
    const musicPlayer= document.getElementById("info-cancion")
    musicPlayer.innerHTML = `
    <div class="album-cover" style="background-image: url(${song.portada})"></div>
    <div class="music-info-container">
        <h3 class="cancion-titulo" id="cancion-titulo">T í t u l o : ${song.nombre}</h3>

        <div class="cancion-info">
            <div class="cancion-titulos"
                <h4 id="cancion-artista">A u t o r : ${song.author}</h4>
                <h4 id="cancion-album">A l b u m : ${song.album}</h4>
                <h4 id="cancion-año">A ñ o : ${song.año}</h4>
                <h4 id="cancion-genero">G é n e r o : ${song.genero}</h4>
            </div>
            <div class="cancion-duracion">
                <h3 id="cancion-duracion">${song.duration}</h3>
            </div>
        </div>
    </div>
    `
}

// Al hacer click en c/canción, independientemente de su lista, se ejecutará esta función
function changeCurrentSong(songId, currentPlayList){
    
    
    // Si ya se cuenta con un playlist en Reproductor, se reemplazará con el playlist al que pertenece la canción seleccionada
    if(musicPlayer.currentPlayList){
        musicPlayer.removePlayList()
    }
    musicPlayer.addPlayList(...currentPlayList)
    // Para renderizar la canción seleccionada en el UI del reproductor...
    // 1. Usamos el id de la canción para localizarla en la playlist cargada en el Reproductor
    const song = musicPlayer.currentPlayList.find(s => s.id === songId);
    // 2. Obtenemos el index de la canción en dicha playlist
    musicPlayer.setCurrentSong(musicPlayer.currentPlayList.indexOf(song))
    // 3. Seteamos los datos de la canción en el url del objeto Audio
    audio.src = song.urlSong
    // 4. Reiniciamos el UI del reproductor, para que cargue, muestre y controle la canción que hemos seleccionado
    musicPlayer.renderReproductor()
    musicPlayer.playFromList()
    
}
document.querySelectorAll('.cancion').forEach(cancion => {
    cancion.addEventListener('click', () => {
        const songId = parseInt(cancion.getAttribute('data-idSong'));
        changeCurrentSong(songId, listaGeneral.songs);
    });
});
/* Crear lista de nuevas canciones */
const songs = [
    new Song({
        id: 1,
        nombre: "Brillar Bajo La Lluvia",
        author: "Ai",
        duration: "0:51",
        album: "Historia en la lluvia",
        genero: "Latin Pop Acoustic",
        año: "2024",
        urlSong: "./assets/songs/1.mp3",
        portada: "./assets/img/1.webp"

    }),

    new Song({
        id: 2,
        nombre: "Bajo el mismo Toldo",
        author: "Ai",
        duration: "0:52",
        album: "Historia en la lluvia",
        genero: "Latin Pop Romantic",
        año: "2024",
        urlSong: "./assets/songs/2.mp3",
        portada: "./assets/img/2.webp"

    }),
    new Song({
         id:3,
         nombre: "Lluvia en el Alma",
         author: "Ai",
         duration: "0:54",
         album: "Historia en la lluvia",
         genero: "Latin Pop Romantic",
         año: "2024",
        urlSong: "./assets/songs/3.mp3",
        portada: "./assets/img/3.webp"

    }),
  
    new Song({
        id: 4,
        nombre: "Lluvia de Esperanza",
        author: "Ai",
        duration: "0:51",
        album: "Historia en la lluvia",
        genero: "Latin Pop Acoustic",
        año: "2024",
        urlSong: "./assets/songs/4.mp3",
        portada: "./assets/img/4.webp"

    }),
    new Song({
        id: 5,
        nombre: "Bajo la Lluvia",
        author: "Ai",
        duration: "0:56",
        album: "Historia en la lluvia",
        genero: "Latin Pop Romantic",
        año: "2024",
        urlSong: "./assets/songs/5.mp3",
        portada: "./assets/img/5.webp"

    }),
    new Song({
        id: 6,
        nombre: "Cameras",
        author: "ALBIS",
        duration: "1:52",
        album: "Roadtrip Chronicles",
        genero: "Rock",
        año: "2014",
        urlSong: "./assets/songs/6.mp3",
        portada: "./assets/img/6.webp"

    }),

    new Song({
        id: 7,
        nombre: "London Bayou",
	    author: "ALBIS",
        duration: "2:08",
        album: "Roadtrip Chronicles",
        genero: "Rock",
        año: "2014",
        urlSong: "./assets/songs/7.mp3",
        portada: "./assets/img/7.webp"

    }),
    new Song({
        id:8,
        nombre: "Open Highway",
        author: "ALBIS",
        duration: "2:28",
        album: "Roadtrip Chronicles",
        genero: "Rock",
        año: "2014",
        urlSong: "./assets/songs/8.mp3",
        portada: "./assets/img/8.webp"

    }),
  
    new Song({
        id: 9,
        nombre: "Riding",
        author: "ALBIS",
        duration: "1:52",
        album: "Roadtrip Chronicles",
        genero: "Rock",
        año: "2014",
        urlSong: "./assets/songs/9.mp3",
        portada: "./assets/img/9.webp"

    }),
    new Song({
        id: 10,
        nombre: "Moon Landings",
        author: "ALBIS",
        duration: "2:11",
        album: "Roadtrip Chronicles",
        genero: "Rock",
        año: "2014",
        urlSong: "./assets/songs/10.mp3",
        portada: "./assets/img/10.webp"

    }),
    new Song({
        id: 11,
        nombre: "Two Hearts",
        author: "TrackTribe",
        duration: "3:19",
        album: "Two Hearts",
        genero: "Pop",
        año: "2024",
        urlSong: "./assets/songs/11.mp3",
        portada: "./assets/img/11.webp"

    }),
    new Song({
        id: 12,
        nombre: "No Indication",
        author: "TrackTribe",
        duration: "3:36",
        album: "Inspiration",
        genero: "Pop",
        año: "2023",
        urlSong: "./assets/songs/12.mp3",
        portada: "./assets/img/12.webp"

    }),
    new Song({
        id: 13,
        nombre: "Flying",
        author: "TrackTribe",
        duration: "2:23",
        album: "Inspiration",
        genero: "Pop",
        año: "2023",
        urlSong: "./assets/songs/13.mp3",
        portada: "./assets/img/13.webp"

    }),
    new Song({
        id: 14,
        nombre: "Guess I ll Never Know",
        author: "TrackTribe",
        duration: "3:25",
        album: "Inspiration",
        genero: "Pop",
        año: "2023",
        urlSong: "./assets/songs/14.mp3",
        portada: "./assets/img/14.webp"

    }),
    new Song({
        id: 15,
        nombre: "Is This Really Happening?",
        author: "TrackTribe",
        duration: "3:18",
        album: "Inspiration",
        genero: "Pop",
        año: "2023",
        urlSong: "./assets/songs/15.mp3",
        portada: "./assets/img/15.webp"

    }),
    new Song({
        id: 16,
        nombre: "Lucky Rubber Ducky?",
        author: "Quincas Moreira",
        duration: "3:07",
        album: "Splash of Serendipity",
        genero: "Reggae",
        año: "2019",
        urlSong: "./assets/songs/16.mp3",
        portada: "./assets/img/16.webp"

    }),
    new Song({
        id: 17,
        nombre: "Dodo Bird",
        author: "Quincas Moreira",
        duration: "3:07",
        album: "Dodo Dub Chronicles",
        genero: "Reggae",
        año: "2018",
        urlSong: "./assets/songs/17.mp3",
        portada: "./assets/img/17.webp"

    }),
    new Song({
        id: 18,
        nombre: "Irie",
        author: "Quincas Moreira",
        duration: "2:34",
        album: "Dodo Dub Chronicles",
        genero: "Reggae",
        año: "2018",
        urlSong: "./assets/songs/18.mp3",
        portada: "./assets/img/18.webp"

    }),
    new Song({
        id: 19,
        nombre: "Thug Dub",
        author: "Quincas Moreira",
        duration: "2:24",
        album: "Dodo Dub Chronicles",
        genero: "Reggae",
        año: "2018",
        urlSong: "./assets/songs/19.mp3",
        portada: "./assets/img/19.webp"

    }),
    new Song({
        id: 20,
        nombre: "Jah Jah Bangs",
        author: "Quincas Moreira",
        duration: "3:32",
        album: "Jah Jah Bangs Anthology",
        genero: "Reggae",
        año: "2020",
        urlSong: "./assets/songs/20.mp3",
        portada: "./assets/img/20.webp"

    }),
    new Song({
        id: 21,
        nombre: "Bette Davis eyes",
        author: "Kim Carnes",
        duration: "2:40",
        album: "Álbum1",
        genero: "Pop",
        año: "2004",
        urlSong: "./assets/songs/21.mp3",
        portada: "./assets/img/21.webp"

    }),
    new Song({
        id: 22,
        nombre: "La isla bonita",
        author: "Madonna",
        duration: "2:43",
        album: "Álbum2",
        genero: "Pop",
        año: "1989",
        urlSong: "./assets/songs/22.mp3",
        portada: "./assets/img/22.webp"

    }),
    new Song({
        id:23,
        nombre: "True blue",
        author: "Madonna",
        duration: "3:36",
        album: "Álbum 3",
        genero: "Pop",
        año: "2000",
        urlSong: "./assets/songs/23.mp3",
        portada: "./assets/img/23.webp"

    }),
    new Song({
        id: 24,
        nombre: "Wild boys",
        author: "Duran duran",
        duration: "2:40",
        album: "Álbum1",
        genero: "Pop",
        año: "2004",
        urlSong: "./assets/songs/24.mp3",
        portada: "./assets/img/24.webp"

    }),
    new Song({
        id: 25,
        nombre: "To late for goodbyes",
        author: "Julian Lennon",
        duration: "2:43",
        album: "Álbum2",
        genero: "Pop",
        año: "1989",
        urlSong: "./assets/songs/25.mp3",
        portada: "./assets/img/25.webp"

    }),
    new Song({
        id:26,
        nombre: "A new beginning",
        author: "Bensound",
        duration: "3:36",
        album: "Álbum 3",
        genero: "Pop",
        año: "2000",
        urlSong: "./assets/songs/26.mp3",
        portada: "./assets/img/26.webp"

    }),
    new Song({
        id:27,
        nombre: "Hey",
        author: "Bensound",
        duration: "3:00",
        album: "Álbum 3",
        genero: "Pop",
        año: "2000",
        urlSong: "./assets/songs/27.mp3",
        portada: "./assets/img/27.webp"

    }),
    new Song({
        id: 28,
        nombre: "Little idea",
        author: "Bensound",
        duration: "3:00",
        album: "Álbum 3",
        genero: "Pop",
        año: "2000",
        urlSong: "./assets/songs/28.mp3",
        portada: "./assets/img/28.webp"

    }),
    new Song({
        id: 29,
        nombre: "Sunny",
        author: "Bensound",
        duration: "3:00",
        album: "Álbum 3",
        genero: "Pop",
        año: "2000",
        urlSong: "./assets/songs/29.mp3",
        portada: "./assets/img/29.webp"

    }),
    new Song({
        id: 30,
        nombre: "Funday",
        author: "Bensound",
        duration: "2:00",
        album: "Álbum 3",
        genero: "Pop",
        año: "2000",
        urlSong: "./assets/songs/30.mp3",
        portada: "./assets/img/30.webp"

    }),

]




// Crear PlayLists
const listaGeneral = new Playlist({
name: "All songs",
container: "catalogoDeCanciones" 
})
const myPlaylist = new Playlist({
name: "My PlayList",
container: "playlist" 
})
const myFavorite=new Playlist({
name:'My Favorite',
container: 'list-fav'
})

//Agregar canciones al playlist 
listaGeneral.addSong(...songs)

//Mostrar playlist en su container 
listaGeneral.renderList()

const musicPlayer = new Reproductor({
    currentPlayList: listaGeneral.songs
})


//Ejecutar la búsqueda y renderizar la lista 
listaGeneral.search(listaGeneral.renderList)



myPlaylist.renderList()
// Cargar, mostrar y controlar la 1era canción de la playlist por defecto
musicPlayer.renderReproductor()




// Agrego la funcionalidad de los corazones para agregar a Favoritos las canciones
document.querySelectorAll('.favorito-general').forEach(item => {
item.addEventListener('click', () => {
    const songId = parseInt(item.parentElement.querySelector('.cancion').getAttribute('data-idSong'));
    const songToAdd = listaGeneral.songs.find(song => song.id === songId);

    myFavorite.addSong(songToAdd);
    songToAdd.isFav = true;
    myFavorite.renderList();
});
});

//Agrego la funcionalidad de los + para agregar a playlist las canciones
document.querySelectorAll('.playlist-general').forEach(item => {
    item.addEventListener('click', () => {
        const songId = parseInt(item.parentElement.querySelector('.cancion').getAttribute('data-idSong'));
        const songToAdd = listaGeneral.songs.find(song => song.id === songId);
    
        myPlaylist.addSong(songToAdd);
        songToAdd.isFav = true;
        myPlaylist.renderList();
    });
    });
