const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 1400;

index.set('view egine', 'hbs');

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'gustaf',
    password: '0000',
    database: 'pembayaran'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})
index.get('/', (req, res) => {
    koneksi.query('use pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'LOGIN',
            data: hasil
        });
    });
});
index.get('/user', (req, res) => {
    koneksi.query('SELECT*FROM user', (err, hasil) => {
        if(err) throw err;
        res.render('user.hbs',{
            judulhalaman: 'USER PENGGUNA',
            data: hasil
        });
    });
});

index.post('/user', (req, res) =>{
    var nama = req.body.inputnama;
    var email = req.body.inputemail;
    var password = req.body.inputpassword;
    koneksi.query('INSERT INTO user(nama, email, password)values(?,?,?)',
    [nama, email, password],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/user');
    }
    )
});
index.get('/hapus-nama/:nama', (req, res) => {
    var nama = req.params.nama;
    koneksi.query("DELETE FROM user WHERE nama=?",
         [nama], (err, hasil) => {
             if(err) throw err;
             res.redirect('/user');
         }
    )
});

index.get('/pembelian', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('pembelian.hbs',{
            judulhalaman: 'DATA PEMBELIAN',
            data: hasil
        });
    });
});

index.post('/pembelian', (req, res) =>{
    var id_pemain = req.body.inputid_pemain;
    var nick_pemain = req.body.inputnick_pemain;
    var no_telp = req.body.inputno_telp;
    var alamat = req.body.inputalamat;
    var nama_game = req.body.inputnama_game;
    var tanggal_transaksi = req.body.inputtanggal_transaki;
    console.log(tanggal_transaksi);
    koneksi.query('INSERT INTO pembayaran(id_pemain, nick_pemain, no_telp, alamat, nama_game, tanggal_transaksi)values(?,?,?,?,?,?)',
    [id_pemain, nick_pemain, no_telp, alamat, nama_game, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pembelian');
    }
    )
});

index.get('/hapus-nama_game/:nama_game', (req, res) => {
    var nama_game = req.params.nama_game;
    koneksi.query("DELETE FROM pembayaran WHERE nama_game=?",
         [nama_game], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pembelian');
         }
    )
});
index.get('/logout', (req, res) => {
    koneksi.query('use pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'LOGIN',
            data: hasil
        });
    });
});

index.listen(port, () => {
    console.log(`app berjalan pada port ${port}`);
});