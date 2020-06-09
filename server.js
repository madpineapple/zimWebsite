const express= require( "express");
const bodyParser= require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/',()=>{
    resizeBy.send("Welcome to server")
});

app.post('/api/form',(req,res)=>{
    let data= req.body
    let smtpTransport=nodemailer.createTransport({
        service:'Gmail',
        port:465,
        auth:{
            type: 'OAuth2',
            user:'charles.daoust135@gmail.com',
            accessToken:'ya29.a0AfH6SMBxoKt5jhYcVOBFG2eMEfilufkfTwHxLn2UuIA2E6kBvlYcxJVQhCy9gLT0I3IVzD-puQMNuN80xVg67370RWUzuVuc8ApnoUOd7te_sGVio8MNMkuPMwcy4g-w1iG29HeUtcK6RnXhHFBOsBSMbnd6Pznlx40'
        }
    });
    let mailOptions={
        from:data.email,
        to:'charles.daoust135@gmail.com',
        subject:`Message from ${data.name}`,
        html:`
        <h3>Information</h3>
        <ul>
        <li>Name" ${data.name}</li>
        <li>Email" ${data.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${data.message}</p>
        `
    }
    // smtpTransport.set('oauth2_provision_cb', (user, renew, callback)=>{
    //     let accessToken = userTokens[user];
    //     if(!accessToken){
    //         return callback(new Error('Unknown user'));
    //     }else{
    //         return callback(null, accessToken);
    //     }comment again
    //
    // });
    smtpTransport.sendMail(mailOptions,(error,response)=>{
        if(error){
            res.send(error)
        }else{
            res.send("Success")
        }
    })
    
    smtpTransport.close();
})


const port = 5000;
app.listen(port, () => console.log(`Server started on Port ${port}`));