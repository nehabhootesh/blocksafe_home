/////////////////////////////////////////////////////
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');

//const IPFS = require('ipfs-api');
const axios = require('axios');
const FormData = require('form-data');


// for testing we used these global variables
//var driverID = '2024';
//var IPFShash = 'INVALID';
//var CustID = '46666';
//var walletC = '0x42Da65a216C217fa1f1062360032f2Fee45F146b';
//var walletD = '0xE9e77eBD443a9086C389d65381032B5A608A1b9f';

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// // Use the express-session middleware
// Use express-session middleware
app.use(session({
  secret: 'Nithi@2001',
  resave: false,
  saveUninitialized: true
}));
////////////////////////////////////////////////////////////////////////////////////////

//for navigation
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route to serve the main page
app.get('/Dpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dindex.html'));
});

// Set up routes for other pages
app.get('/Drequest_ride', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Drequest_ride.html'));
});

app.get('/Dride_requests', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dride_requests.html'));
});

app.get('/Dhistory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dhistory.html'));
});

app.get('/Dch_ride_st', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dch_ride_st.html'));
});

app.get('/Dsupport', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Dsupport.html'));
});

app.get('/Dlogout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Dlogout.html'));
    // req.session.destroy();
    // res.redirect('/');
});

// Set up a route to serve the main page
app.get('/Cpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Cindex.html'));
});

// Set up routes for other pages
app.get('/request_ride', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'request_ride.html'));
});

app.get('/ride_requests', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ride_requests.html'));
});

app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

app.get('/ch_ride_st', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ch_ride_st.html'));
});

app.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'support.html'));
});

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'logout.html'));
    // req.session.destroy();
    // res.redirect('/');
});

///////////below two are just for reference
app.post('/DuserData', (req, res) => {
    const userId = req.body.userId;
    const address = req.body.address;
    // Data to be stored
    

    // Convert data to a JSON string
    const data = JSON.stringify({ userId, address });

    // Write data to a file
    fs.writeFile('userdata.json', data, (err) => {
      if (err) {
        console.error('Error writing data to file:', err);
        return;
      }
      console.log('Data written to file successfully');
    });
    console.log(`Received user data: User ID: ${userId}, Address: ${address}`);
    res.sendStatus(200);

    // Read data from a file
    fs.readFile('userdata.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading data from file:', err);
        return;
      }

      // Parse the JSON string back to an object
      const userData = JSON.parse(data);

      console.log('User ID:', userData.userId);
      console.log('Address:', userData.address);
    });

});

app.post('/CuserData', (req, res) => {
  const userId = req.body.userId;
  const address = req.body.address;
  // Data to be stored
  

  // Convert data to a JSON string
  const Cdata = JSON.stringify({ userId, address });

  // Write data to a file
  fs.writeFile('Cuserdata.json', Cdata, (err) => {
    if (err) {
      console.error('Error writing data to file:', err);
      return;
    }
    console.log('Data written to file successfully');
  });
  console.log(`Received user data: User ID: ${userId}, Address: ${address}`);
  res.sendStatus(200);

  // Read data from a file
  fs.readFile('Cuserdata.json', 'utf8', (err, Cdata) => {
    if (err) {
      console.error('Error reading data from file:', err);
      return;
    }

    // Parse the JSON string back to an object
    const CuserData = JSON.parse(Cdata);

    console.log('User ID:', CuserData.userId);
    console.log('Address:', CuserData.address);
  });

});



// Connect to MongoDB  "mongodb://localhost:27017/Dapp"  
//"mongodb+srv://NitheshKumarV:Nithi2001@dapp.eotmlar.mongodb.net/"
//mongodb+srv://NitheshKumarV:Nithi2001@dapp.eotmlar.mongodb.net/?retryWrites=true&w=majority&appName=Dapp
mongoose.connect('mongodb+srv://nehab:Tomnjerry@cluster0.c2g9sor.mongodb.net/Dapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', () => console.log('Error in Connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

// Define schema
const rideSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  CustomerID: String,
  RideID: String,
  DepartureTime: String,
  From: String,
  To: String,
  Cost: String,
  NumberOfSeat: String,
  SubmittedTime: String,
  PickupLocation: String,
  DropLocation: String
}, { collection: 'Rides' });

// Create model
const Ride_Rides = mongoose.model('Rides', rideSchema);



//////////////////////////////////////////////////////////////////////////////////////////////
// Define schema for DReq
const rideSchema_DReq = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  RideID: String,
  DepartureTime: String,
  From: String,
  Via: String,
  To: String,
  Cost: String,
  NumberOfSeat: String,
  SubmittedTime: String,
  PickupLocation: String,
  DropLocation: String
}, { collection: 'DReq' });

// Create model for DReq
const Ride_DReq = mongoose.model('Ride_DReq', rideSchema_DReq);

/////////////////////////////////////////////////////////////////////////////////////////////
// Define schema for CReq
const rideSchema_CReq = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CustomerID: String,
  RideID: String,
  DepartureTime: String,
  From: String,
  To: String,
  Cost: String,
  NumberOfSeat: String,
  SubmittedTime: String,
  PickupLocation: String,
  DropLocation: String
}, { collection: 'CReq' });

// Create model for CReq
const Ride_CReq = mongoose.model('Ride_CReq', rideSchema_CReq);

/////////////////////////////////////////////////////////////////////////////////////////////
// Define schema for started_rides
const rideSchema_started_rides = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  CustomerID: String,
  RideID: String,
  DriverConfirmation: String,
  CustomerConfirmation: String,
  SubmittedTime: String
}, { collection: 'started_rides' });

// Create model for started_rides
const Ride_started_rides = mongoose.model('Ride_started_rides', rideSchema_started_rides);


/////////////////////////////////////////////////////////////////////////////////////////////
// Define schema for notyetstarted_rides
const rideSchema_notyetstarted_rides = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  RideID: String,
  DriverConfirmation: String,
  CustomerConfirmation: String,
  SubmittedTime: String
}, { collection: 'notyetstarted_rides' });

// Create model for notyetstarted_rides
const Ride_notyetstarted_rides = mongoose.model('Ride_notyetstarted_rides', rideSchema_notyetstarted_rides);

////////////////////////////////////////////////////////////////////////////////////////////

// Define schema for accepted_rides
const rideSchema_accepted_rides = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  CustomerID: String,
  RideID: String,
  DepartureTime: String,
  From: String,
  Via: String,
  To: String,
  ApproxCost: String,
  NumberOfSeat: String,
  SubmittedTime: String,
  PickupLocation: String,
  DropLocation: String
}, { collection: 'accepted_rides' });

// Create model for accepted_rides
const Ride_accepted_rides = mongoose.model('Ride_accepted_rides', rideSchema_accepted_rides);

////////////////////////////////////////////////////////////////////////////////////////////

// Define schema for declined_rides
const rideSchema_declined_rides = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  CustomerID: String,
  RideID: String,
  DriverReason: String,
  CustomerReason: String,
  SubmittedTime: String
}, { collection: 'declined_rides' });

// Create model for accepted_rides
const Ride_declined_rides = mongoose.model('Ride_declined_rides', rideSchema_declined_rides);

////////////////////////////////////////////////////////////////////////////////////////////

// Define schema for completed_rides
const rideSchema_completed_rides = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  DriverID: String,
  CustomerID: String,
  RideID: String,
  DriverConfirmation: String,
  CustomerConfirmation: String,
  DriverCompleted: String,
  CustomerCompleted: String,
  PaymentStatus: String,
  PaymentAddress: String,
  SubmittedTime: String
}, { collection: 'completed_rides' });

// Create model for completed_rides
const Ride_completed_rides = mongoose.model('Ride_completed_rides', rideSchema_completed_rides);

/////////////////////////////////////////////////////////////////////////////////////////////
// Define schema for passengerverified
const rideSchema_passengerverified = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  hashValue: String,
  walletAddress: String,
  __v: String,
  userId1: String
}, { collection: 'passengerverified' });

// Create model for passengerverified
const PassengerDetails = mongoose.model('PassengerDetails', rideSchema_passengerverified);

/////////////////////////////////////////////////////////////////////////////////////////////
// Define schema for driververified
const rideSchema_driververified = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  hashValue: String,
  walletAddress: String,
  __v: String,
  userId1: String
}, { collection: 'driververified' });

// Create model for driververified
const DriverDetails = mongoose.model('DriverDetails', rideSchema_driververified);

////////////////////////////////////////////////////////////////////////////////////////////
    // Endpoint to handle Dlogin
    app.post('/Dlogin', async (req, res) => {
    const { userId, walletAddress } = req.body;
    
    req.session.DID = userId;
    req.session.WAD = walletAddress;

      
      try {
          const driverUser = await DriverDetails.findOne({userId1: userId});
          console.log(driverUser);
          if(driverUser){
            console.log("is a driver");
          if (driverUser.walletAddress === walletAddress) {
              // Successful login
              console.log("login is must");
              
              return res.status(200).json({ message: 'Login successful', walletAddress  });
          }
        }
          // Invalid credentials
        else{  res.status(401).json({ message: 'Invalid user ID or wallet address' });
      }
      } catch (error) {
          console.error('Error in login:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  });
    // Endpoint to handle Dlogin
    app.post('/Clogin', async (req, res) => {
      const { userId, walletAddress } = req.body;
    
      req.session.CID = userId;
      req.session.WAC = walletAddress;
  
      
        try {
          // Check if the user exists in the passengerverified collection
          const passengerUser = await PassengerDetails.findOne({ userId });
          console.log(passengerUser);
          if (passengerUser) {
              // If user ID is found, check for wallet address
              if (passengerUser.walletAddress === walletAddress) {
                  console.log("login must successful");
                  // Successful login
                  return res.status(200).json({ message: 'Login successful', walletAddress  });
              }
          }
      
        else{  res.status(401).json({ message: 'Invalid user ID or wallet address' });
      }
      } catch (error) {
          console.error('Error in login:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
          
  });
    // Sending Driver login details to front page
    app.get('/DFetchlogin', async (req, res) => {
      const DID= req.session.DID;
      const WAD= req.session.WAD;

      try {
                 
          console.log('User ID:', DID);
          console.log('Address:', WAD);
          return res.status(200).json({ DID, WAD  });

      } catch (err) {
          console.error('Error reading data from file:', err);
          return res.status(500).send('Error retrieving data');
      }

  });
    // Sending Driver login details to front page
    app.get('/CFetchlogin', async (req, res) => {
      const CID= req.session.CID;
      const WAC= req.session.WAC;

      try {
          console.log('User ID:', CID);
          console.log('Address:', WAC);
          return res.status(200).json({ CID, WAC });
      } catch (err) {
          console.error('Error reading data from file:', err);
          return res.status(500).send('Error retrieving data');
      }
  });


////////////////////////////////////////////////////////////////////////////////////////////

//DRIVER // Serve the HTML file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/Dindex.html');
// });


///////////////////////////////////////////////////////////////////////////////////////////
//DRIVER //logout option 
//DRIVER   // Define a route for the logout page
  app.post('/Drilogout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Failed to destroy session');
      }});
    // Perform logout operations here (e.g., clear session, cookies, etc.)
    // For demonstration purposes, we'll redirect the user to another HTML file
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.redirect('/Dlogged_out.html');
    
  });


  
///////////////////////////////////////////////////////////////////////////////////////////
//DRIVER // Define route to fetch data for Dreq given driverID
app.get('/Dlaunched', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;

  try {
    const rides = await Ride_DReq.find({DriverID:DID}).sort({ _id: -1 });
    
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Define route to fetch all data for CReq
app.get('/Drequests', async (req, res) => {
  try {
    const rides = await Ride_CReq.find().sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Define route to fetch data for Accepted_rides given driverID
app.get('/Daccepted', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  try {
    const rides = await Ride_accepted_rides.find({DriverID:DID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Define route to fetch data for notyetstarted_rides given driverID
app.get('/Dnotyetstarted', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  try {
    const rides = await Ride_notyetstarted_rides.find({DriverID: DID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Define route to fetch data for notyetstarted_rides given driverID
app.get('/Dstarted', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  try {
    const rides = await Ride_started_rides.find({DriverID: DID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Define route to fetch data for declined_rides given driverID
app.get('/Ddeclined', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  try {
    const rides = await Ride_declined_rides.find({DriverID:DID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


//DRIVER // Define route to fetch data for completed_rides given driverID
app.get('/Dcompleted', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  try {
    const rides = await Ride_completed_rides.find({DriverID: DID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


//////////////////////////////////////////////////////////////////////////////////////
//DRIVER // Accept the ride
app.get('/DAccept', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  var rid = req.query.rideId;

  try {
    const rides = await Ride_CReq.findOne({ RideID: rid });
    console.log(rides);
    console.log(typeof rides);
    console.log("Data Fetch sucessful");
    //res.json(rides);
    
    function insertKeyValuePair(obj, key, value, index) {
      let newObj = {};
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (i === index) {
          newObj[key] = value;
        }
        newObj[keys[i]] = obj[keys[i]];
      }
      if (index === keys.length) {
        newObj[key] = value;
      }
      return newObj;
    }
 
    // Insert a new key-value pair at index 1
    let updatedRides = insertKeyValuePair(rides._doc, 'DriverID', DID, 1);
    
    console.log(updatedRides);
    
    
    db.collection('accepted_rides').insertOne(updatedRides, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Record Inserted Successfully');
    } );

    db.collection('Rides').insertOne(updatedRides, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Record Inserted Successfully');
    });


    console.log('Ride Accepted successfully');
    
    await Ride_CReq.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from pending requests');
    res.redirect('/Dhistory.html');


  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Start the ride
app.get('/DStart', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  var rid = req.query.rideId;
  console.log(typeof rid);
  const fullDateTimeStart = new Date().toISOString();
  var custid;
  try {
    const rides = await Ride_accepted_rides.find({ RideID: rid }).sort({ _id: -1 });
    custid = rides[0].CustomerID;

  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
  
  const data = {
    'DriverID': DID, // Assuming this is fixed for now
    'CustomerID': custid,
    'RideID': rid,
    'DriverConfirmation': 'Started',
    'CustomerConfirmation': 'Pending',
    'SubmittedTime': fullDateTimeStart
  };
  

  try {
    db.collection('notyetstarted_rides').insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Ride Start comfirmed by driver');
      console.log('Record created successfully');
    });
    await Ride_accepted_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from notyetstarted_rides');
    res.redirect('/Dhistory.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Decline the ride
app.get('/DDecline', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  var rid = req.query.rideId;
  var Reason = req.query.reason;
  console.log(typeof rid);
  const fullDateTimeStartD = new Date().toISOString();
  var custid;
  try {
    const rides = await Ride_accepted_rides.find({ RideID: rid }).sort({ _id: -1 });
    custid = rides[0].CustomerID;
    console.log("CustomerID from accepted Rides");
    console.log(custid);
  } catch (err) {
          try { 
            const rides = await Ride_started_rides.find({ RideID: rid }).sort({ _id: -1 });
            custid = rides[0].CustomerID;
            console.log("CustomerID from started Rides");
            console.log(custid);
          
          } catch (err) {
            const rides = await Ride_notyetstarted_rides.find({ RideID: rid }).sort({ _id: -1 });
            custid = rides[0].CustomerID;
            console.log("CustomerID from notyetstarted Rides");
            console.log(custid);
          }
  }
  
  const data = {
    'DriverID': DID, // Assuming this is fixed for now
    'CustomerID': custid,
    'RideID': rid,
    'DriverReason': Reason,
    'CustomerReason': "Driver declined the ride." ,
    'SubmittedTime': fullDateTimeStartD

  };


  try {
    db.collection('declined_rides').insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Ride Decline comfirmed by driver');
      console.log('Record created successfully');
      
    });
    
    await Ride_accepted_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from accepted rides');
    
    await Ride_notyetstarted_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from notyetstarted_rides');

    await Ride_started_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from started_rides');
    
    res.redirect('/Dhistory.html');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Complete the ride
app.get('/DComplete', async (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;

  var rid = req.query.rideId;
  
  try {
    const rides = await Ride_started_rides.findOne({ RideID: rid });
    console.log(rides);
    console.log(typeof rides);
    console.log("Data Fetch sucessful");
    
    console.log(rides.CustomerConfirmation);
    //res.json(rides);
    
    function insertKeyValuePair(obj, key, value, index) {
      let newObj = {};
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (i === index) {
          newObj[key] = value;
        }
        newObj[keys[i]] = obj[keys[i]];
      }
      if (index === keys.length) {
        newObj[key] = value;
      }
      return newObj;
    }
    if(rides.CustomerConfirmation != 'Pending'){
      console.log("Customer Confirmed Ride Started");
      // Insert a new key-value pair at index 6
      let updatedRides = insertKeyValuePair(rides._doc, 'DriverCompleted', 'Ride Completed', 6);//._doc
      console.log(updatedRides)
      // Insert a new key-value pair at index 7
      updatedRides = insertKeyValuePair(updatedRides, 'CustomerCompleted', 'Pending', 7);
      
      // Insert a new key-value pair at index 8
      updatedRides = insertKeyValuePair(updatedRides, 'PaymentStatus', 'Pending', 8);

      // Insert a new key-value pair at index 8
      updatedRides = insertKeyValuePair(updatedRides, 'PaymentAddress', WAD, 9);
      
      console.log(updatedRides);
      
      
      db.collection('completed_rides').insertOne(updatedRides, (err, collection) => {
        if (err) {
          throw err;
        }
        console.log('Record Inserted Successfully');
      });
      console.log('Ride Accepted successfully');
      
      await Ride_started_rides.deleteMany({ RideID: rid });
      console.log('Ride Deleted successfully from pending requests');


    }
    
    res.redirect('/Dhistory.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Fetch the ride from customer using ride id
app.get('/DFetchC', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_CReq.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Fetch the ride from Accepted using ride id
app.get('/DFetchA', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_accepted_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Fetch the ride from Not yet Started using ride id
app.get('/DFetchN', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_notyetstarted_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Fetch the ride from Started using ride id
app.get('/DFetchS', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_started_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

//DRIVER // Fetch the ride from Completed using ride id
app.get('/DFetchE', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_completed_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

/////////////////////////////////////////////////////////////////////////////////////////
//DRIVER // Define route to create a new ride
app.post('/Dlaunch_ride', (req, res) => {
  const DID= req.session.DID;
  const WAD= req.session.WAD;
  
  const { from, via, to, time, cost, seat, pinnedLocation_p, pinnedLocation_d } = req.body;
  const ride_q = { from, via, to, time, cost, seat, pinnedLocation_p, pinnedLocation_d};
  const fullDateTime = new Date().toISOString();

  const data = {
    'DriverID': DID, // Assuming this is fixed for now
    'RideID': DcreateUniqueVariable(DID),
    'DepartureTime': time,
    'From': from,
    'Via': via,
    'To': to,
    'Cost': cost,
    'NumberOfSeat': seat,
    'SubmittedTime': fullDateTime,
    'PickupLocation': pinnedLocation_p,
    'DropLocation': pinnedLocation_d
  };

  db.collection('DReq').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log('Record Inserted Successfully');
  });
  console.log('Ride created successfully');
  return res.redirect('Dindex.html');
});


function DcreateUniqueVariable(baseName = 'RideID') {
  const timestamp = Date.now().toString(36);
  return `${baseName}_${timestamp}`;
}
















//////////////////////////////////////////////////////////////////////////////////////////////
// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

//logout option 
  // Define a route for the logout page
  app.post('/Cunlogout', (req, res) => {

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Failed to destroy session');
      }});
    // Perform logout operations here (e.g., clear session, cookies, etc.)
    // For demonstration purposes, we'll redirect the user to another HTML file
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.redirect('/logged_out.html');
  });


  /////////////////////////////////////////////////////////////////////////////////////////

// Define route to fetch all data for CReq given CustomerID
app.get('/my_requests', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;


  try {
    const rides = await Ride_CReq.find({CustomerID:CID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Define route to fetch all data for Dreq
app.get('/available', async (req, res) => {

  try {
    
    const rides = await Ride_DReq.find().sort({ _id: -1 });
    
    console.log(typeof rides[0].DriverID);
    console.log(rides[0].DriverID);
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Define route to fetch data for Accepted_rides given CustomerID 
app.get('/accepted', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;
  try {
    const rides = await Ride_accepted_rides.find({CustomerID : CID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Define route to fetch data for notyetstarted_rides given CustomerID
app.get('/notyetstarted', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;
  try {
    const rides = await Ride_notyetstarted_rides.find({CustomerID: CID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


// Define route to fetch data for started_rides given CustomerID
app.get('/started', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;
  try {
    const rides = await Ride_started_rides.find({CustomerID: CID}).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


// Define route to fetch data for declined_rides given CustomerID
app.get('/declined', async (req, res) => {
  try {
    const rides = await Ride_declined_rides.find().sort({ _id: -1 });//{CustomerID: CustID}
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Define route to fetch data for completed_rides
app.get('/completed', async (req, res) => {
  try {
    const rides = await Ride_completed_rides.find().sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});
///////////////////////////////////////////////////////////////////////////////////
//chnge ride requests

// Accept the ride
app.get('/Join', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;
  
  var rid = req.query.rideId;
  console.log(rid);

  try {
    const rides = await Ride_DReq.findOne({ RideID: rid });
    console.log(rides);
    console.log(typeof rides);
    console.log("Data Fetch sucessful");
    //res.json(rides);
    function deleteKeyValuePair(obj, index) {
      let newObj = {};
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (i !== index) {
          newObj[keys[i]] = obj[keys[i]];
        }
      }
      return newObj;
    }
    function insertKeyValuePair(obj, key, value, index) {
      let newObj = {};
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (i === index) {
          newObj[key] = value;
        }
        newObj[keys[i]] = obj[keys[i]];
      }
      if (index === keys.length) {
        newObj[key] = value;
      }
      return newObj;
    }
    
    // delete a key-value pair at index 1
    let updatedRides = deleteKeyValuePair(rides._doc, 5);
    
    console.log(updatedRides);

    // Insert a new key-value pair at index 1
    updatedRides = insertKeyValuePair(updatedRides, 'CustomerID', CID, 2);
    
    console.log(updatedRides);
    
    
    db.collection('accepted_rides').insertOne(updatedRides, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Record Inserted Successfully');
    });
    console.log('Ride Accepted successfully');

    db.collection('Rides').insertOne(updatedRides, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Record Inserted Successfully');
    });
    
    await Ride_DReq.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from pending requests');
    
    res.redirect('/history.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Start the ride
app.get('/Start', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;

  var rid = req.query.rideId;
  console.log(typeof rid);
  const fullDateTimeStart = new Date().toISOString();
  var drivid;
  try {
    const rides = await Ride_notyetstarted_rides.find({ RideID: rid }).sort({ _id: -1 });
    drivid = rides[0].DriverID;
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }

  const data = {
    'DriverID': drivid, // Assuming this is fixed for now
    'CustomerID': CID,
    'RideID': rid,
    'DriverConfirmation': 'Started',
    'CustomerConfirmation': 'Started',
    'SubmittedTime': fullDateTimeStart
  };
  //code to insert data to started ride
  
  try {
    db.collection('started_rides').insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Ride Start comfirmed by customer');
      console.log('Record created successfully');
      
    });
    
    await Ride_notyetstarted_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from Not Yet Started');
    
    res.redirect('/history.html');

  } catch (err) {
      console.error(err);
      res.status(500).send('Error updating data');
    }

  // try {
  //   db.collection('notyetstarted_rides').updateOne(
  //     { 'RideID': rid }, // Filter criteria to find the document to update
  //     { $set: data },    // New data to set in the document
  //     (err, result) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log('Ride Start confirmed by driver');
  //       console.log('Record updated successfully');
  //       return res.redirect('ch_ride_st.html');
  //     }
  //   );
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send('Error updating data');
  // }
  
});

// Decline the ride
app.get('/Decline', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;

  var rid = req.query.rideId;
  var Reason = req.query.reason;
  console.log(typeof rid);
  const fullDateTimeStartD = new Date().toISOString();
  var drivid;
  try {
    const rides = await Ride_accepted_rides.find({ RideID: rid }).sort({ _id: -1 });
    drivid = rides[0].DriverID;
    console.log("DriverID from accepted Rides");
    console.log(drivid);
  } catch (err) {
          try { 
            const rides = await Ride_started_rides.find({ RideID: rid }).sort({ _id: -1 });
            drivid = rides[0].DriverID;
            console.log("DriverID from started Rides");
            console.log(drivid);
          
          } catch (err) {
            const rides = await Ride_notyetstarted_rides.find({ RideID: rid }).sort({ _id: -1 });
            drivid = rides[0].DriverID;
            console.log("DriverID from notyetstarted Rides");
            console.log(drivid);
          }
  }
  
  const data = {
    'DriverID': drivid, // Assuming this is fixed for now
    'CustomerID': CID,
    'RideID': rid,
    'DriverReason': "Customer declined the ride.",
    'CustomerReason':  Reason ,
    'SubmittedTime': fullDateTimeStartD

  };


  try {
    db.collection('declined_rides').insertOne(data, (err, collection) => {
      if (err) {
        throw err;
      }
      console.log('Ride Decline comfirmed by driver');
      console.log('Record created successfully');
      
    });
    
    await Ride_accepted_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from accepted rides');
    
    await Ride_notyetstarted_rides.deleteMany({ RideID: rid });
    console.log('Ride Deleted successfully from notyetstarted_rides');

    
    //await Ride_started_rides.deleteMany({ RideID: rid });
    //console.log('Ride Deleted successfully from notyetstarted_rides');

    res.redirect('/history.html');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Complete the ride
app.get('/Complete', async (req, res) => {
  var rid = req.query.rideId;
  try {
    db.collection('completed_rides').updateOne(
      { RideID: rid },
      { $set: { CustomerCompleted: 'Ride Completed' } },
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log('document(s) updated');
      }
    );
    
    res.redirect('/history.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Payment the ride
app.get('/Payment', async (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;
  
  
  var rid = req.query.rideId;
  var payaccount;
  console.log(rid);
  try {
    const rideCom = await Ride_completed_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rideCom);
    payaccount= rideCom[0].PaymentAddress;
    console.log("Driver account fetch successful");
    console.log(payaccount);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }


  console.log("IPFS CONNECTING");
  
  // // Connect to a local IPFS node
  // const ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' });
  // console.log("IPFS CONNECTED");
  // // Add the JSON data to IPFS
  // async function addToIPFS(data) {
  //   const files = await ipfs.files.add(Buffer.from(JSON.stringify(data)));
  //   return files[0].hash;
  // }

            // // Add the JSON data to IPFS
            // const ipfsHash = await addToIPFS(rides);
    let ipfsHash;
    try {
        const rides = await Ride_Rides.findOne({ RideID: rid });
        console.log(rides);
        var amount = rides.Cost;
        
        console.log(amount);

        const pinataApiKey = 'dea972923f40121768b9';
        const pinataApiSecret = '7998c77e0ade875031751a891ff2def1aa5add6d245398dd443e34975a34aaaf';
        const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

        const jsonData = JSON.stringify(rides);
        console.log(jsonData);

        const formData = new FormData();
        formData.append('file', Buffer.from(jsonData), { filename: 'data.json', contentType: 'application/json' });

        const response = await axios.post(pinataEndpoint, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataApiSecret,
            },
        });

        ipfsHash = response.data.IpfsHash;
        console.log('IPFS Hash:', ipfsHash);

        const data = {
            'RideID': rid,
            'IPFS': ipfsHash, // Assuming this is fixed for now
            'walletC': WAC,
            'walletD': payaccount,
            'cost': amount
        };

        // Build the query string from the data object
        const queryString = Object.keys(data)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
            .join('&');

        //Payment page only opens when payment is not completed
        const temp1 = await Ride_completed_rides.findOne({ RideID: rid });
        console.log(temp1);
        if (temp1.PaymentStatus == 'Pending' && temp1.CustomerCompleted == 'Ride Completed') {
            // Redirect to the Pay.html page with the data
            res.redirect(`/Pay.html?${queryString}`);
        } else {
            console.log('Payment already completed or Ride completion is not confirmed by customer');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }

});

// UpdatePayment the ride
app.get('/UpdatePayment', async (req, res) => {
  var rid = req.query.rideId;
  try {
    db.collection('completed_rides').updateOne(
      { RideID: rid },
      { $set: { PaymentStatus: 'Payment Successful' } },
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log('document(s) updated');
      }
    );
    
    res.redirect('/history.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Fetch the ride from Driver using ride id
app.get('/FetchDr', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_DReq.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Fetch the ride from Not yet Started using ride id
app.get('/FetchN', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_notyetstarted_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Fetch the ride from Completed using ride id
app.get('/FetchE', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_completed_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Fetch the Declined from Driver using ride id
app.get('/FetchD', async (req, res) => {
  var rid = req.query.rideId;
  console.log(typeof rid);

  try {
    const rides = await Ride_declined_rides.find({ RideID: rid }).sort({ _id: -1 });
    console.log(rides);
    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});
////////////////////////////////////////////////////////////////////////////////////
// Define route to create a new ride
app.post('/Request_ride', (req, res) => {
  const CID= req.session.CID;
  const WAC= req.session.WAC;

  const { from, to, time, cost, seat, pinnedLocation_p, pinnedLocation_d } = req.body;
  const ride_q = { from, to, time, cost, seat, pinnedLocation_p, pinnedLocation_d};
  const fullDateTime = new Date().toISOString();

  const data = {
    'CustomerID': CID, // Assuming this is fixed for now
    'RideID': createUniqueVariable(CID),
    'DepartureTime': time,
    'From': from,
    'To': to,
    'Cost': cost,
    'NumberOfSeat': seat,
    'SubmittedTime': fullDateTime,
    'PickupLocation': pinnedLocation_p,
    'DropLocation': pinnedLocation_d
  };

  db.collection('CReq').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log('Record Inserted Successfully');
  });
  console.log('Ride created successfully');
  return res.redirect('Cindex.html');
});

function createUniqueVariable(baseName = 'CID') {
  const timestamp = Date.now().toString(36);
  return `${baseName}_${timestamp}`;
}

// Start server
app.listen(3003, () => {
  console.log('Server running on http://localhost:3003');
});
