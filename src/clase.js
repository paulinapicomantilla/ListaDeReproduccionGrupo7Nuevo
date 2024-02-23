 /* Definir clases */
 class Song{
    constructor({id, nombre, autor, duracion, album, genero, año, isFav = false, isMyPlayList = false, portada, urlSong}){
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.duracion = duracion;
        this.album = album;
        this.genero = genero;
        this.año = año;
        this.isFav = isFav;
        this.isMyPlayList = isMyPlayList;
        this.portada = portada;
        this.urlSong = urlSong;
    }

    

}
class Playlist{
    constructor({containerName, listaCanciones, ordenEscucha}){
        this.containerName = containerName;
        this.listaCanciones = listaCanciones;
        this.ordenEscucha = ordenEscucha; //
        
    }

    getPlaylistNombre(){
        return this.containerName
    }

    getPlaylistCanciones(){
        return this.listaCanciones
    }

    getPlaylistListenngOrder(){
        return this.ordenEscucha
    }

    addSongToPlaylist(song){
        this.listaCanciones.push(song)
    }

    removeSongFromPlaylist(song){
        this.listaCanciones=this.listaCanciones.filter((cancion) => cancion.id !== song.id)
    }

    /* sufflePlaylist(){
        this.listaCanciones=this.listaCanciones.sort(() => Math.random() - 0.5)
    } */ //Lista de canciones en aleatorio

    playPlaylist(){
        thid.listaCanciones.forEach(song => {
            console.log('Playing: ${song.nombre}')
        });
    }
}