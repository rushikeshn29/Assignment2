const express = require('express');
const PORT = 1223;
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/static",express.static("public"));
app.use(express.static('public'));


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('first_view');

})
app.get('/contactUS', (req, res) => {
    res.render('contactUs');

})
app.get('/header', (req, res) => {
    res.render('header');

})
app.get('/services', (req, res) => {
    res.render('services');

})
app.get('/aboutUs', (req, res) => {
    res.render('aboutUs');

})

app.get('/contactDetails', (req, res) => {
    res.render('contactDetails');
})

app.get('/gallary', (req, res) => {
    res.render('gallary');
})
app.get('/showData', (req, res) => {
    var str1 = fs.readFileSync('data.txt').toString().split("\n");
    console.log(str1);
    res.render('showData', { file: str1 });
})

app.post('/form-data', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let age = req.body.age;
    let city = req.body.city;


    var details = name + '|' + email + '|' + pass + '|' + age + '|' + city;
    fs.appendFile('data.txt', details + "\n", (err) => {
        if (err) throw (err)
    })
    res.send("<h1>Data Added Successfully!!</h1>")

    res.render("contactUs", { successmsg: "Email Registered Successfully!!", errmsg: '' })
})
app.listen(PORT, (err) => {
    if (err)
        throw err;
    else
        console.log(`Server is running on ${PORT}`);
})