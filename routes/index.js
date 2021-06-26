var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const fs = require('fs');
var SpotifyWebApi = require('spotify-web-api-node');
var dbconf = JSON.parse(fs.readFileSync('config.json', 'UTF-8'));

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

var db = mysql.createConnection({
  host: dbconf.host,
  user: dbconf.user,
  password: dbconf.password,
  database: dbconf.database
});

db.connect(function(err){
  if(!err){
    console.log("DB is connected");
  }
  else{
    console.log("Error in connecting DB");
  }

});

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};


/* GET home page. */
router.get('/', function(req, res, next) {
  var zespol = 'SELECT * FROM Artysta ORDER BY Nazwa ASC';
  var albums = 'SELECT * FROM Album';
  var albumss = 'SELECT * FROM Album WHERE Nazwa="Hybrid Theory"';
  var track = 'SELECT * FROM Utwor';
  db.query(zespol, function(error,dane){
    db.query(albums, function(error,dane1){
      db.query(track, function(error,dane3){
        db.query(albumss, function(error,dane2){
          res.render('index', { title: 'Kolekcja albumów muzycznych', zespol: dane, albums: dane1, albumss: dane2, track: dane3});
        });
      });
    });
  });
});

router.get('/api/bands', function(req, res, next) {
  var zespol = 'SELECT * FROM Artysta ORDER BY Nazwa ASC';
  db.query(zespol, function(error,dane){
    res.json(dane);
  });
});

router.get('/api/albums', function(req, res, next) {
  var albums = 'SELECT * FROM Album';
  db.query(albums, function(error,dane){
    res.json(dane);
  });
});

router.get('/Zespol/:a', function(req, res, next) {
  var zespol = 'SELECT * FROM Artysta ORDER BY Nazwa ASC';
  var albums = 'SELECT Album.*, Artysta.Nazwa AS Zespol FROM Album JOIN Artysta ON Album.Artysta=Artysta.ID ' + 'HAVING Zespol="' + req.params.a + '"'
  db.query(zespol, function(error,dane){
    db.query(albums, function(error,dane1){
      res.render('zespol', { title: 'Kolekcja albumów muzycznych', zespol: dane, albums: dane1});
    });
  });
});

router.get('/api/bands/:a', function(req, res, next) {
  var zespol = 'SELECT * FROM Artysta ORDER BY Nazwa ASC';
  var albums = 'SELECT Album.*, Artysta.Nazwa AS Zespol FROM Album JOIN Artysta ON Album.Artysta=Artysta.ID ' + 'HAVING Artysta="' + req.params.a + '"'
  db.query(zespol, function(error,dane){
    db.query(albums, function(error,dane1){
      res.json(dane1);
    });
  });
});

function runQuery(...params) {
  return new Promise((resolve, reject) =>
      db.query(...params, function (error, dane) {
        if (error) {
          reject(error)
        } else {
          resolve(dane)
        }
      }))
}


router.get('/Zespol/:a/:b',  async function (req, res, next) {
  var zespolQuery = 'SELECT * FROM Artysta ORDER BY Nazwa ASC';
  var albumsQuery = 'SELECT Album.*, Artysta.Nazwa AS Zespol FROM Album JOIN Artysta ON Album.Artysta=Artysta.ID ' + 'HAVING Zespol="' + req.params.a + '"'
  var albumssQuery = 'SELECT * FROM Album WHERE Nazwa="' + req.params.b + '"'
  var trackQuery = 'SELECT Utwor.*, Album.Nazwa AS Album FROM Utwor JOIN Album ON Album.ID=Utwor.Album HAVING Album.Nazwa="' + req.params.b + '"'


  try {
    const [zespolResp ,albumsResp, albumssResp, trackResp] = await Promise.all([
      runQuery(zespolQuery),
      runQuery(albumsQuery),
      runQuery(albumssQuery),
      runQuery(trackQuery),
    ]);

    const spotifyRes = await spotifyApi.searchAlbums(req.params.b);
    //console.log('Search artists by "Love"', spotifyRes.body.albums.items[0]);
    const albumCoverUrl = spotifyRes?.body?.albums?.items?.[0].images?.[1].url;
    const icon = 'https://cdn.iconscout.com/icon/free/png-64/spotify-36-721973.png'
    const albumLink = spotifyRes?.body?.albums?.items?.[0].external_urls.spotify;

    res.render('album', {
      title: 'Kolekcja albumów muzycznych',
      zespol: zespolResp,
      albums: albumsResp,
      albumss: albumssResp,
      track: trackResp,
      albumCoverUrl,
      albumLink,
      icon
    });
  } catch (error) {
    console.log(error);
    res.render('album', {
      error
    });
  }
});

router.get('/api/albums/tracks/:a', async function(req, res, next) {
  var trackQuery = 'SELECT Utwor.*, Album.Nazwa AS Album FROM Utwor JOIN Album ON Album.ID=Utwor.Album WHERE Album.ID="' + req.params.a + '"'

  try {
    const [trackResp] = await Promise.all([
      runQuery(trackQuery)
    ]);

    res.json(trackResp);
    } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get('/api/albums/spotify/:a/', async function(req, res, next) {
  var albumssQuery = 'SELECT * FROM Album WHERE ID="' + req.params.a + '"'

  try {
    const [albumssResp] = await Promise.all([
      runQuery(albumssQuery)
    ]);

    const spotifyRes = await spotifyApi.searchAlbums(albumssResp[0].Nazwa);
    //console.log('Search artists by "Love"', spotifyRes.body.albums.items[0]);
    const albumCoverUrl = spotifyRes?.body?.albums?.items?.[0].images?.[1].url;
    const albumLink = spotifyRes?.body?.albums?.items?.[0].external_urls.spotify;

    res.json({albumCoverUrl: albumCoverUrl, albumLink: albumLink});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get('/Zarzadzaj', secured, function(req, res, next) {
  var zespol = 'SELECT * FROM Artysta ORDER BY Nazwa ASC';
  var album = 'SELECT * FROM Album';
  var utworow = 0 ;
  db.query(zespol, function(error,dane){
    db.query(album, function(error,dane1){
      res.render('zarzadzaj', { title: 'Kolekcja albumów muzycznych', zespol: dane, album: dane1});
    });
  });
});

router.post('/Dodaj_zespol', function(req, res, next) {
  //res.render('zarzadzaj', { title: 'Biblioteka albumów muzycznych'});
  var insert = "INSERT INTO Artysta VALUES (NULL, '" + req.body.Nazwazespolu + "', " + req.body.Rokzalozenia + ", '" + req.body.Kraj + "')";
  db.query(insert, function(error, dane){
    console.log(error);
  });
  res.redirect('/Zarzadzaj');
});

router.post('/Dodaj_album', function(req, res, next) {
  var insert = "INSERT INTO Album VALUES (NULL, '" + req.body.Nazwaalbumu + "', '" + req.body.Datawydania + "', '" +  req.body.Zespol + "', '" + req.body.Czastrwania + "', '" +  req.body.Gatunek + "')";
  db.query(insert, function(error, dane){
    console.log(error);
  });
  res.redirect('/Zarzadzaj');
});

router.post('/Dodaj_utwor', function(req, res, next) {
  for(let i=0; i < req.body.Nazwautworu.length; i++){
    var insert = "INSERT INTO Utwor VALUES (NULL, '" + req.body.Nazwautworu[i] + "', '" + req.body.Czasutworu[i] + "', '" + req.body.Album + "')"
    db.query(insert, function(error, dane){
      console.log(error);
    });
  }
  res.redirect('/Zarzadzaj');
});

router.post('/Usun_album', function(req, res, next) {
  //var insert = "INSERT INTO Utwor VALUES (NULL, '" + req.body.Nazwautworu[i] + "', '" + req.body.Czasutworu[i] + "', '" + req.body.Album + "')"
  var del = "DELETE FROM Utwor WHERE Album='" + req.body.Album_usun + "'";
  var del1 = "DELETE FROM Album WHERE ID='" + req.body.Album_usun + "'";
  db.query(del1, function(error, dane){
    console.log(error);
  });
  db.query(del, function(error, dane){
    console.log(error);
  });

  res.redirect('/Zarzadzaj');
});

router.post('/Usun_zespol', function(req, res, next) {
  //var insert = "INSERT INTO Utwor VALUES (NULL, '" + req.body.Nazwautworu[i] + "', '" + req.body.Czasutworu[i] + "', '" + req.body.Album + "')"
  var del = "DELETE Utwor FROM Utwor INNER JOIN Album ON Utwor.Album=Album.ID WHERE Album.Artysta='" + req.body.Zespol_usun + "'";
  var del1 = "DELETE FROM Album WHERE Artysta='" + req.body.Zespol_usun + "'";
  var del2 = "DELETE FROM Artysta WHERE ID='" + req.body.Zespol_usun + "'";
  db.query(del, function(error, dane){
    console.log(error);
  });
  db.query(del1, function(error, dane){
    console.log(error);
  });
  db.query(del2, function(error, dane){
    console.log(error);
  });
  res.redirect('/Zarzadzaj');
});

module.exports = router;
