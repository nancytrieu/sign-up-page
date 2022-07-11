const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mailchimp.setConfig({
    apiKey: '0d35c1594f120ab9b95095001db2346c-us10',
    server: 'us10'
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listID = '9f210b7b5a';

    const run = async () => {
        const response = await mailchimp.lists.batchListMembers(listID, {
          members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            }
          }],
        });
        console.log(response);
      };
        run();
        res.sendFile(__dirname + '/success.html');
        console.log('Successfully subscribed');

        run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.listen(process.env.PORT || 3000);

//API key
// 0d35c1594f120ab9b95095001db2346c-us10

//Audience ID
// 9f210b7b5a